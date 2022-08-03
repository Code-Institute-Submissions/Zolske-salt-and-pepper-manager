from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Comments(models.Model):
    RATING = (
        (1, 1,),
        (2, 2,),
        (3, 3,),
        (4, 4,),
        (5, 5,),
    )

    # author = models.ForeignKey(User,null=True, on_delete=models.SET_NULL)
    author = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=30, default="")
    picture = models.CharField(max_length=255, default="https://res.cloudinary.com/diwuglogr/image/upload/v1656221691/salt_and_pepper/default-user-icon-8_jddbuo.jpg")
    date = models.DateField()
    rating = models.PositiveSmallIntegerField(choices=RATING, default=1)
    review = models.TextField()
    approved = models.BooleanField(default=False)
    
    def __str__(self):
        return "%s (%s,%s,%s,%s,%s,%s)" % (self.author, self.name, self.picture,
                                           self.date, self.rating, self.review, self.approved)
