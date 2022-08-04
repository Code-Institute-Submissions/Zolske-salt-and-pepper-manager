from itertools import accumulate
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
import datetime
from .models import AvailableTable, User_Bookings
from local_module.local_functions import weekday_num_to_django, delete_passed_days, add_missing_records,\
    booking_context_object
   

def available_tables(request):
    delete_passed_days(AvailableTable)
    add_missing_records(AvailableTable)
    this_week_dic, this_week_meta, after_weeks = booking_context_object(AvailableTable)
    user_now = request.user
    # has_bookings, user_booking_list = check_user_bookings(user_now, User_Bookings)
    
    user_booking_list = User_Bookings.objects.filter(booked_name=user_now).values()
    has_bookings = len(user_booking_list)
            
    template = loader.get_template('booking/bookings.html')
    context = {
        'user_logged_in': False,
        'this_week_dic': this_week_dic,
        'this_week_meta': this_week_meta,
        'after_weeks': after_weeks,
        'current_user': user_now,
        'has_bookings': has_bookings,
        'user_booking_list': user_booking_list,
    }
    # is set to true only if the user  is logged in
    if request.user.is_authenticated:
        context['user_logged_in'] = True
        
    return HttpResponse(template.render(context, request))


def add_record(request):
    new_booking_date = request.POST['new_booking_date']
    new_time_slot = request.POST['time_slot']
    new_num_tables = request.POST['num_tables']
    booking_record = list(AvailableTable.objects.filter(booking_date=new_booking_date).values())

    for record in booking_record[0]:
        if new_time_slot == record:
            booking_record[0][record] = int(booking_record[0][record]) - int(new_num_tables)
            for key, value in booking_record[0].items():
                if key == 'booking_date':
                    value_booking = value
                if key == 'time_slot_12':
                    value_12 = value
                if key == 'time_slot_14':
                    value_14 = value
                if key == 'time_slot_16':
                    value_16 = value
                if key == 'time_slot_18':
                    value_18 = value
                if key == 'time_slot_20':
                    value_20 = value
                if key == 'time_slot_22':
                    value_22 = value
                   
            new_record = AvailableTable(booking_date=value_booking, time_slot_12=value_12, time_slot_14=value_14,
                                        time_slot_16=value_16, time_slot_18=value_18, time_slot_20=value_20,
                                        time_slot_22=value_22)
            new_record.save()
    
    user_now = request.user
    booking_time = new_time_slot[-2:]
    booking_time += ':00'       
    table_num = int(new_num_tables)
    new_booking_record = User_Bookings(booked_name=user_now, booked_date=value_booking, booked_time=booking_time,
                                       booked_tables=table_num)
    new_booking_record.save()
    
    return HttpResponseRedirect(reverse('bookings'))


def cancel_booking(request):
    cancel_booking_date = request.POST['booking_date']
    cancel_time_slot = request.POST['time_slot']
    cancel_num_tables = request.POST['num_tables']
    user_now = request.user
    
    # find the booking according to the user, booked date, booked time and booked time
    find_booking_record = User_Bookings.objects.filter(booked_name=user_now, booked_date=cancel_booking_date,
                                                       booked_time=cancel_time_slot, booked_tables=cancel_num_tables)
    #  only delete the first entry if there are more then one!!
    find_booking_record[0].delete()
    
    # updates the tables in the available table model
    available_table_db = AvailableTable.objects.filter(booking_date=cancel_booking_date)
    time_slot = 'time_slot_' + cancel_time_slot[:2]
    add_table = int(available_table_db.values()[0][time_slot]) + int(cancel_num_tables)
    if time_slot == 'time_slot_12':
        available_table_db.update(time_slot_12=add_table)
    elif time_slot == 'time_slot_14':
        available_table_db.update(time_slot_14=add_table)
    elif time_slot == 'time_slot_16':
        available_table_db.update(time_slot_16=add_table)
    elif time_slot == 'time_slot_18':
        available_table_db.update(time_slot_18=add_table)
    elif time_slot == 'time_slot_20':
        available_table_db.update(time_slot_20=add_table)
    elif time_slot == 'time_slot_22':
        available_table_db.update(time_slot_22=add_table)
       
    return HttpResponseRedirect(reverse('bookings'))
    

def amend_booking(request):
    original_date = request.POST['original-date']
    original_time = request.POST['original-time']
    # format string to e.g. time_slot_12
    or_available_db_time_slot = 'time_slot_' + original_time[:2]
    original_table = int(request.POST['original-table'])
    amend_booking_date = request.POST['booking_date']
    amend_time_slot_unformatted = request.POST['time_slot']
    # format string to e.g. 12:00
    amend_time_slot = amend_time_slot_unformatted[:2] + ":00"
    # format string to e.g. time_slot_12
    available_db_time_slot = 'time_slot_' + amend_time_slot_unformatted[:2]
    amend_num_tables = int(request.POST['num_tables'])
    user_now = request.user
        
    # find the id according to the user, booked date, booked time and booked table
    # (is necessarily, in case there are more then one booking with the same date, time, table)
    id_user_booking = User_Bookings.objects.filter(
        booked_name=user_now, booked_date=original_date, booked_time=original_time,
        booked_tables=original_table).values_list('id', flat=True)[0]
    
    # gets the booking according to the id found before
    find_booking_record = User_Bookings.objects.filter(id=id_user_booking)
    # update time and table number
    find_booking_record.update(booked_time=amend_time_slot)
    find_booking_record.update(booked_tables=amend_num_tables)
    
    # 1. revert original booking
    # updates the tables in the available table model
    available_table_db = AvailableTable.objects.filter(booking_date=original_date)
    time_slot = or_available_db_time_slot
    add_table = int(available_table_db.values()[0][time_slot]) + int(original_table)
    if time_slot == 'time_slot_12':
        available_table_db.update(time_slot_12=add_table)
    elif time_slot == 'time_slot_14':
        available_table_db.update(time_slot_14=add_table)
    elif time_slot == 'time_slot_16':
        available_table_db.update(time_slot_16=add_table)
    elif time_slot == 'time_slot_18':
        available_table_db.update(time_slot_18=add_table)
    elif time_slot == 'time_slot_20':
        available_table_db.update(time_slot_20=add_table)
    elif time_slot == 'time_slot_22':
        available_table_db.update(time_slot_22=add_table)
    
    # 2. subtract amended booking
    # updates the tables in the available table model
    available_table_db = AvailableTable.objects.filter(booking_date=amend_booking_date)
    time_slot = available_db_time_slot
    add_table = int(available_table_db.values()[0][time_slot]) - int(amend_num_tables)
    if time_slot == 'time_slot_12':
        available_table_db.update(time_slot_12=add_table)
    elif time_slot == 'time_slot_14':
        available_table_db.update(time_slot_14=add_table)
    elif time_slot == 'time_slot_16':
        available_table_db.update(time_slot_16=add_table)
    elif time_slot == 'time_slot_18':
        available_table_db.update(time_slot_18=add_table)
    elif time_slot == 'time_slot_20':
        available_table_db.update(time_slot_20=add_table)
    elif time_slot == 'time_slot_22':
        available_table_db.update(time_slot_22=add_table)
    
    return HttpResponseRedirect(reverse('bookings'))
    

def delete_old_bookings():
    # find all bookings
    booking_list = User_Bookings.objects.all()
    for entry in booking_list:
        # if booking is older than today, delete it
        if entry.booked_date.strftime("%Y-%m-%d") < datetime.datetime.now().strftime("%Y-%m-%d"):
            entry.delete()

    
delete_old_bookings()
