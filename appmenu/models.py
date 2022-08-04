from django.db import models


class MenuStarter(models.Model):
    dish = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()
    allergies = models.TextField()
    image = models.URLField(max_length=250)
    alt = models.CharField(max_length=100, null=True)
    
    def __str__(self):
        return "%s (%s,%s,%s,%s,%s)" % (self.dish, self.price, self.description,
                                        self.allergies, self.image, self.alt)


class MenuMain(models.Model):
    dish = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()
    allergies = models.TextField()
    image = models.URLField(max_length=250)
    alt = models.CharField(max_length=100, null=True)
    
    def __str__(self):
        return "%s (%s,%s,%s,%s,%s)" % (self.dish, self.price, self.description,
                                        self.allergies, self.image, self.alt)
        

class MenuDessert(models.Model):
    dish = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()
    allergies = models.TextField()
    image = models.URLField(max_length=250)
    alt = models.CharField(max_length=100, null=True)
    
    def __str__(self):
        return "%s (%s,%s,%s,%s,%s)" % (self.dish, self.price, self.description,
                                        self.allergies, self.image, self.alt)
        

class MenuDrinks(models.Model):
    drink = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()
    allergies = models.TextField()
    image = models.URLField(max_length=250)
    alt = models.CharField(max_length=100, null=True)
    
    def __str__(self):
        return "%s (%s,%s,%s,%s,%s)" % (self.drink, self.price, self.description,
                                        self.allergies, self.image, self.alt)
    

class MenuAlcohol(models.Model):
    drink = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()
    allergies = models.TextField()
    image = models.URLField(max_length=250)
    alt = models.CharField(max_length=100, null=True)
    
    def __str__(self):
        return "%s (%s,%s,%s,%s,%s)" % (self.drink, self.price, self.description,
                                        self.allergies, self.image, self.alt)
