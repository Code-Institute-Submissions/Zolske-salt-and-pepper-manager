1. run the command before deploying to Heroku:

```
py manage.py collectstatic
```

2. command to create the relational database model png

```
py manage.py graph_models -a -g --arrow-shape normal -o assets/doc/images/relational_database_model.png
```
