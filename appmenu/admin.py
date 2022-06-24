from django.contrib import admin
from .models import MenuStarter, MenuMain, MenuDessert, MenuDrinks


class MenuStarterAdmin(admin.ModelAdmin):
    model = MenuStarter
    list_display = [
        "dish",
        "price"
    ]
    
class MenuMainAdmin(admin.ModelAdmin):
    model = MenuMain
    list_display = [
        "dish",
        "price"
    ]
    
class MenuDessertAdmin(admin.ModelAdmin):
    model = MenuDessert
    list_display = [
        "dish",
        "price"
    ]
    
class MenuDrinksAdmin(admin.ModelAdmin):
    model = MenuDrinks
    list_display = [
        "drink",
        "price"
    ]
    
    
admin.site.register(MenuStarter, MenuStarterAdmin)
admin.site.register(MenuMain, MenuMainAdmin)
admin.site.register(MenuDessert, MenuDessertAdmin)
admin.site.register(MenuDrinks, MenuDrinksAdmin)