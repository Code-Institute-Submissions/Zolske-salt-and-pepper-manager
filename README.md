![The Salt and Pepper Restaurant Logo](assets/doc/images/logo-doc.webp)![The Salt and Pepper Restaurant ](assets/doc/images/salt_and_pepper_title.png)

The "Salt and Pepper" website is a great tool to manage the restaurant easily through its database. Guests who log in, can reserve a table and manage their bookings or even write a review, which after it has been approved by the owner, will be shown on the landing page. The owner can easily see and manage all reservations. He also can quickly update or expand the menu (*pictures, prices, allergies, and descriptions*).

*Click on the link to the* [Salt and Pepper](https://salt-and-pepper-manager.herokuapp.com/) *live website*.

![reserving a table](assets/doc/images/screenshot_home_2.jpg)  

*mockup was generated with [techsini.com](https://techsini.com/multi-mockup/index.php)*

---

## Overview

1. [features](#1-features)
2. [technologies](#2-technologies)
3. [development](#3-development)
4. [testing](#4-testing)
5. [setup and deployment](#5-setup-and-deployment)
7. [credits](#6-credits)

---

[back to overview](#overview)

## 1. Features

### Main Features

#### 1. table reservation :

- the user can from within the app ...
  - **C**reate a table reservation
  - **R**ead his/her table reservation and see all available tables
  - **U**pdate his/her table reservation
  - **D**elete his/her table reservation  
  
  *Click on the link to see a demonstration of the feature:* [reserving a table](assets/doc/images/booking_table_600.gif)

#### 2. menu creation :

- the owner can as administrator ...
  - **C**reate a new menu item (_Name, description, allergies, price, image*_)  
  
    (* *pictures can only be uploaded as cloudinary link*)
  
  - **R**ead the menu
  - **U**pdate the menu
  - **D**elete menu items  
  
  *Click on the link to see a demonstration of the feature:* [create a menu](assets/doc/images/create_menu_600.gif)  

#### 3. user feedback :

[see demonstration: write a review](https://github.com/Zolske/salt-and-pepper-manager/blob/main/assets/doc/images/create_review_600.gif)

- guests can write a review from within the app
  - after the administrator has approved it, it is shown on the home page
  - entry is limited to 340 characters to protect the layout from "overflow"
  - reviews on the home page change automatically to the next by themself
  - user can see his own reviews but not delete them (only the admin can)
  - reviews are not deleted when the guests are deleted (_reviews are needed even after guests have left_)
  - guests can not amend comments (_otherwise they could change its content and the administrator would need to approve it again_)

### Minor Features

- guest can **upload/change their profile picture** [see demonstration: profile picture](https://github.com/Zolske/salt-and-pepper-manager/blob/main/assets/doc/images/profile_picture_600.gif)
- guests can use the side from their **mobile phone**
- the **password can be reset** through a link received by email
- only the admin has an additional **link** in his menu that takes him to **the admin panel**

---

[back to overview](#overview)

## 2. Technologies

#### The following technologies have been used for the project:

- ![html](assets/doc/images/logos/html64x64.png) **HTML** *to give structure to the page and "mark" the content*
- ![CSS](assets/doc/images/logos/css64x64.png)![Bootstrap](assets/doc/images/logos/bootstrap64x64.png) **CSS** & **Bootstrap** *to style the content and the page*  
- ![JavaScript](assets/doc/images/logos/js64x64.png) **JavaScript** *to implement logic*  
- ![python](assets/doc/images/logos/python64x64.png) ![Django](assets/doc/images/logos/django64x64.png) **Python** & **Django** *for the "backend"*  
- ![Git](assets/doc/images/logos/git64x64.png) **Git** *for version control*  
- ![GitHub](assets/doc/images/logos/github64x64.png) **GitHub** *to store the project*  
- ![Cloudinary](assets/doc/images/logos/cloudinary64x64.png) **Cloudinary** *to store images online*  
- ![Gunicorn](assets/doc/images/logos/gunicorn64x64.png) **Gunicorn** *as Python Web Server Gateway Interface*
- ![Heroku](assets/doc/images/logos/heroku64x64.png) **Heroku** *to serve the project online*  
- ![Postgres](assets/doc/images/logos/postgresql64x64.png) **PostgreSQL** *as database engine*

---

[back to overview](#overview)

## 3. Development

- [see UX documentation](assets/doc/doc_ux.md)

---

[back to overview](#overview)

## 4. Testing

- [see test documentation](assets/doc/doc_testing.md)

### Known Bugs

- the user can book a table for a time slot that has already passed  
- the site is not refreshed, if two users try to book the last table for the same time on the same day, then the last guest gets an error but the database does not go into minus  
- when amending a reservation, the guest can only change to the number of tables which is available but not including the tables which are included in the reservation which he wants to amend, he would need to cancel his reservation and then rebook

---

[back to overview](#overview)

## 5. Setup and Deployment  

The project was developed by making sure that it would work from the beginning, that is why the setup process is also the deployment process. 

[see set_up documentation](assets/doc/setup)  

- !! make sure that debug is set to false !!

  *... django_project/settings.py*
  `DEBUG = False`

---

[back to overview](#overview)

## 6. Credits

- **unsplash** :
  - pictures are taken from [unsplash.com/](https://unsplash.com/)  
- **favicon** :  
  - was used to generate the favicon [favicon.io](https://favicon.io/)  
- **randomuser** :  
  - was used for the profile picture [randomuser.me](https://randomuser.me/photos)
- **w3schools** :
  - was used for research [w3schools](https://www.w3schools.com/django/index.php)  
- **The Django Book** : (*by Big Nige*)  
  - was used for research [djangobook.com](https://djangobook.com/django-tutorials/mastering-django-structure/)
- **Django for Beginners** : (*by William S. Vincent*)  
  - was used for research and to set up the "password reset functionality" [Django for Beginners](https://www.amazon.co.uk/dp/B079ZZLRRL/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1)  
- 
