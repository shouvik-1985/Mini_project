you need two bash terminals for backend and frontend:

##BACKEND
1. Make the virtual environment globally and pip install the requiirements also globally becase the main file "manage.py" is kept in root folder mini project.
2. after activating the venv and pip install requirements run this command for backend "python manage.py runserver".

for creating virtual environment - "python3 -m venv venv"

for activating virtual environment - " source venv/bin/activate"

for install the requirements- " pip install -r requirements.txt"

for running backend- "python manage.py runserver"
 
##FRONTEND
1. connect the frontend directory by "cd frontend"

2. then install the npm by "npm install"

3.then start the frontend by "npm start"




--ABOUT THE APP--

1. By default it will open the home page
2. On the Navbar there are three options Contact Manager , Home, Add contact
3. Click on the Add Contact to add any users
4. Click on the Contact manger to edit the users details or delete the user
5. I have added extra "Add new Contact" button which directly redirect you to the "Add contact" page.
