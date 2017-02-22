#MapViz
Backend

## Database
### Run Locally
Installing Postgre SQL on Mac:
```
brew update
brew install postgres
postgres -D /usr/local/var/postgres
createdb `whoami`
psql
```

## Server
### Setup
Install python if haven't already.  
Install pip(https://pip.pypa.io/en/latest/installing/#installing-with-get-pip-py)  
Install virtualenv `pip install virtualenv` and virtualenvwrapper `pip install virtualenvwrapper`

Setup Environment  
`export WORKON_HOME=~/Envs`  
`mkdir -p $WORKON_HOME`

Create Environment  
`source /usr/local/bin/virtualenvwrapper.sh`  
`mkvirtualenv venv`

Install Django  
`pip install django`

Install DB adapter
`pip install psycopg2`

Create DB and user (file Service Ticket with DB Admin, Napon) 
`createdb mapviz`

Migrations
`cd server/mysite/`
`python manage.py migrate`

To activate virtualenv next time   
`source $WORKONHOME/venv/bin/activate`


### Running locally  
`cd server/mysite/`
`python manage.py runserver`
