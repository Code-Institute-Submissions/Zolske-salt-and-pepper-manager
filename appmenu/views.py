from django.template import loader
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .models import MenuStarter, MenuMain, MenuDessert, MenuDrinks, MenuAlcohol

# Create your views here.
def menu(request):
    template = loader.get_template('menu/menu.html')
    starter = MenuStarter.objects.all().values()
    main = MenuMain.objects.all().values()
    dessert = MenuDessert.objects.all().values()
    drink = MenuDrinks.objects.all().values()
    alcohol = MenuAlcohol.objects.all().values()
    
    context = {
        'starter': starter,
        'main' : main,
        'dessert' : dessert,
        'drink' : drink,
        'alcohol' : alcohol,      
    }
        
    return HttpResponse(template.render(context, request))