#MapViz
# Backend

# Database
## Run Locally
###Install DB adapter  
`pip install psycopg2`

###Installing Postgre SQL on Mac:
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
`python /path/to/manage.py <filename>`

Migrations  
`python /path/to/manage.py migrate`

## Set up Tweepy
1. Install tweepy and request
`
pip install tweepy
pip install requests
`

2. Create server/mysite/polls/twitter_secret.py with 
`
client_key = "insert_tweepy_client_key"
secret_key = "insert_secret_client_key"
access_token = "insert_access_token"
access_token_secret = "insert_access_token_secret"
`

## Load initial data
Ensure that you're in work directory
`
python manage.py load_zone_coordinate.py
python manage.py load_incident_model
python manage.py load_institution_model.py
python manage.py load_score_model.py
`

# Server
## Setup
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

Install dependencies  
`pip install -r requirements.txt`

To activate virtualenv next time   
`source $WORKON_HOME/venv/bin/activate`

## Running locally  
`python /path/to/manage.py runserver`

## Test
`python path/to/manage.py test polls.management.commands.GeoUtilsTest`

## You are ready to go!
