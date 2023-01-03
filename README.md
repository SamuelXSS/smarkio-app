# SMARKIO VOICE!

Smarkio Voice is an app to reproduce whatever you texts in a voice using IBM TextToSpeech, with a badword filter feature!

The project was made with **NodeJS** (Backend API REST) , **JQuery** (frontend) and **MySQL** (database).

# Getting Started

 1.  **`git clone https://github.com/SamuelXSS/smarkio-app.git`**
 2. Configure your **`.env.example`** file with your Database and IBM credentials, then rename it to **`.env`**
 3. Run your MySQL server, create a DataBase with the same name of your .env credential, then import tables by typing in terminal **`yarn sequelize db:migrate`**
 4. **`cd backend -> yarn or npm install`**
 5. **`yarn dev`**

If you're using VsCode, you can run the `index.html` file, located at frontend folder, using the Live Server Plugin. Otherwise, just open it with the browser.

## Project content

The project contains the best treats from the API, with their respective status.

Contains the entire **CRUD** of comments and a **bad word filter**, where, if found, the Robot reproduces a message saying it is an inappropriate word.

