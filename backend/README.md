# WebFolio

WebFolio is an application to assist educator to create and manage children's portfolio at institution.


## Installation

To install all development dependencies:

```
yarn
```

## Usage example

To start the application use the command:

```
yarn dev:server
```

### Routes

#### Users
POST: /user :
Create User by send the fields name, email, institution and password

POST: /sessions :
Authenticate User by send the fields email and password

#### Portfolios
POST: /portfolio :
Create Portfolio by send the fields nameChildren, age and ClassRoom

GET: /portfolio :
Recover all created portfolios

GET: /portfolio/:id_portfolio :
Get one specific Portfolio by send the field id of portfolio

PUT: /portfolio/:id_portfolio
Update Portfolio by send the fields nameChildren, age and ClassRoom

DELETE: /portfolio/:id_portfolio :
Get one specific Portfolio by send the field id of portfolio

#### Profile
GET: /profile :
Get User logged

PUT: /portfolio/:id_portfolio
Update Profile by send the fields name, email and institution or password (optional)

PATCH: /users/avatar :
Update user avatar by send the image on field avatar

#### Observation
POST: /portfolio/:id_portfolio/observation :
Create Observation by send the fields title, description, notes, dateDay and files (all optional)

POST: /observation :
Create Observation for class by send the fields title, description, dateDay and files (all optional)

PUT: /observation/:id_portfolio/:id_observation :
Create Observation for class by send the fields title, description, notes, dateDay and files (all optional)

DELETE: /portfolio/:id_portfolio/observation/:id_observation :
Delete Observation by send the field id of portfolio and id of observation

GET: /observation/:id_observation :
Get one specific Observation by send the field id of Observation

#### Password
POST: /password/forgot :
Recover Password by send the field email

POST: /password/reset :
Reset Password by send the fields password, password confimation and token

#### Files
DELETE: /files :
Delete one File of Observation by send the id of Observation and id of file

#### Classrooms
GET: /classroom :
Recover all classrooms

GET: /classrooms/searchportfolios/:id_portfolios
Recover Portfolios by id of classroom


### Tools

Tools used in the application:

- Express;
- Celebrate (to validate request body);
- Mongoose;
- Jsonwebtoken;
- Nodemailer;
- Redis (to Rate Limiter);

