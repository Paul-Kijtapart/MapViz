#MapViz
Backend

## Database
### Run Locally
Install DB adapter  
`pip install psycopg2`

Installing Postgre SQL on Mac:
```
brew update
brew install postgres
postgres -D /usr/local/var/postgres
createdb `whoami`
psql
```

Create DB and user (file Service Ticket with DB Admin, Napon)  
`createdb mapviz`

To load initial data  
`python manage.py load`

Migrations  
```
cd server/mysite/  
python manage.py migrate
```

## Server
### Setup
Install python if haven't already.  
Install pip(https://pip.pypa.io/en/latest/installing/#installing-with-get-pip-py)  
Install virtualenv `pip install virtualenv` and virtualenvwrapper `pip install virtualenvwrapper`

Setup Environment  
```
mkdir -p $WORKON_HOME
export WORKON_HOME=~/Envs
```

Create Environment  
```
source /usr/local/bin/virtualenvwrapper.sh
mkvirtualenv venv
```

Install Django  
`pip install django`

Allow CORS for development  
`pip install django-cors-headers`

To activate virtualenv next time   
`source $WORKON_HOME/venv/bin/activate`

### Running locally  
```
cd server/mysite/
python manage.py runserver
```

### Test
`python manage.py test polls.management.commands.GeoUtilsTest`
