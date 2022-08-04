from django.template import loader
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .models import MenuStarter, MenuMain, MenuDessert, MenuDrinks, MenuAlcohol


def menu(request):
    template = loader.get_template('menu/menu.html')
    starter = MenuStarter.objects.all().order_by("price").values()
    main = MenuMain.objects.all().order_by("price").values()
    dessert = MenuDessert.objects.all().order_by("price").values()
    drink = MenuDrinks.objects.all().order_by("price").values()
    alcohol = MenuAlcohol.objects.all().order_by("price").values()
    
    context = {
        'starter': starter,
        'main': main,
        'dessert': dessert,
        'drink': drink,
        'alcohol': alcohol,
    }
        
    return HttpResponse(template.render(context, request))
