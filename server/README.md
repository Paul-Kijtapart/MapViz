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

To activate virtualenv next time   
`source $WORKONHOME/venv/bin/activate`


### Running locally  
`python manage.py runserver`
