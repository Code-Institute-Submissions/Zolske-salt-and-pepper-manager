from django.views.generic import TemplateView
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.template import loader
from appcomments.models import Comments
    

def HomePageView(request):
    user_comments = Comments.objects.filter(approved=True).order_by("-date").values()
    template = loader.get_template('home.html')
    counter = []
    
    for entry in range(len(user_comments)):
        counter.append(entry)
    
    context = {
    'user_comments' : user_comments,
    'counter' : counter,
    
    }  
    
    return HttpResponse(template.render(context, request))