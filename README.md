# Projects Manager App Using MERN Stack

### Video Demo: 
[YouTube](<URL HERE>)

### Description: 
MERN Stack App to Track Projects State, Due date, when it started and completed, With Signup and Login.
* Create project with validation name and due date are required and name must be at least 3 characters and unique, by default it will be on backlog state.
* In the dashboard the user can start the project by clicking start project and it will has the started at date of the time the user started that project and state it as completed.
* The Due date will change to orange to indecat that it reach the due date.
* SignUp has Validation to make sure username is at least 3 characters, email to has valid format and unique, and password to be at least 8 characters and match confirm password.

### Technologies:
- Client
  - ReactJs
  - Bootstrap
  - Axios
  - MomentJs
  - @reach/router
  - [Bootswatch](https://bootswatch.com/)
  - [Free Favicon Maker](https://formito.com/tools/favicon)

- Server 
  - NodeJs
  - ExpressJs
  - Bcrypt
  - Cors
  - Dotenv
  - Mongoose

- Database
  - MongoDB

### Files Tree:
```
📦project-manager-mern
 ┣ 📂client
 ┃ ┣ 📂public
 ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┣ 📜manifest.json
 ┃ ┃ ┗ 📜robots.txt
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜AddProject.js
 ┃ ┃ ┃ ┣ 📜ListProjects.js
 ┃ ┃ ┃ ┣ 📜Login.js
 ┃ ┃ ┃ ┗ 📜SignUp.js
 ┃ ┃ ┣ 📜App.js
 ┃ ┃ ┣ 📜bootstrap.min.css
 ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┗ 📜index.js
 ┃ ┗ 📜package.json
 ┣ 📂server
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜mongoose.config.js
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜project.controller.js
 ┃ ┃ ┗ 📜users.controller.js
 ┃ ┣ 📂middleware
 ┃ ┃ ┗ 📜auth.middleware.js
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜project.model.js
 ┃ ┃ ┗ 📜user.model.js
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜project.routes.js
 ┃ ┃ ┗ 📜user.routes.js
 ┃ ┗ 📂utils
 ┃   ┗ 📜generateToken.js
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜package.json
 ┗ 📜server.js
 ```

### How to Run the Project:
`cd /project-manager-mern` Then `npm i && npm run start` to install server packages and start the server

In another terminal `cd /project-manager-mern/client` Then `npm i && npm run start` to install client packages and start the app in will run on http://localhost:3000/

### Developer

Wijdan Kuddah