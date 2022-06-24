from django.template import loader
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .models import MenuStarter, MenuMain, MenuDessert, MenuDrinks

# Create your views here.
def menu(request):
           
    starters = MenuStarter.objects.all().values()
    template = loader.get_template('menu.html')
    
    context = {
        'starters': starters,
    }
        
    return HttpResponse(template.render(context, request))