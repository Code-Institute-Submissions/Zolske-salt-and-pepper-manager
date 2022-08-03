from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.template import loader
from .models import Comments  


def comments(request):
    user_now = request.user
    user_comments = Comments.objects.filter(author=user_now).order_by("-date").values()
    template = loader.get_template('comment.html')
    
    context = {
        'user_comments': user_comments,
    }  
    
    return HttpResponse(template.render(context, request))


def add_comments(request):
    comment_name = request.user
    name_of_author = request.user
    comment_picture = request.user.profile_picture
    comment_date = request.POST['date']
    comment_rating = request.POST['rating']
    comment_review = request.POST['review']

    new_record = Comments(author=comment_name, name=name_of_author, picture=comment_picture, date=comment_date,
                          rating=comment_rating, review=comment_review)
    new_record.save()
    
    return HttpResponseRedirect(reverse('comment'))
