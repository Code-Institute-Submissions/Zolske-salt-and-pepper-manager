from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from .forms import CustomUserCreationForm
from .models import CustomUser
from django.urls import reverse


# use Django’s generic CreateView
class SignUpView(CreateView):
    # tell Django to use our CustomUserCreationForm
    form_class = CustomUserCreationForm
    # redirect to login once a user signs up successfully
    success_url = reverse_lazy('login')
    # template is named signup.html
    template_name = "registration/signup.html"

def user_settings(request):
    user_now = request.user
    template = loader.get_template('registration/user_settings.html')       
    user_settings = CustomUser.objects.filter(username=user_now).values()
    context = {
    'user_settings' :  user_settings,
    }
        
    return HttpResponse(template.render(context, request))

def user_settings_profile(request):
    new_profile_picture = request.POST['new_profile_picture']
    user_now = request.user
    user_settings = CustomUser.objects.filter(username=user_now).values()
    user_settings.update(profile_picture=new_profile_picture)
    
    return HttpResponseRedirect(reverse('user_settings'))
