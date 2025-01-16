# Faculty Feedback System

The **Faculty Feedback System** is a web application that allows students to provide feedback on faculty members based on their experiences in various subjects. The app allows filtering faculties by subject, rating them with a star system, and providing a simple interface for logging in and giving feedback.

### **Workflow:**
1. **Register**: Users must first register to create an account.
2. **Login**: After registration, users log in with their credentials (ID and password).
3. **Provide Feedback**: Once logged in, users can rate faculty members and submit feedback.

## Features

- **Faculty List**: Displays faculty members with their names, subjects, experience, and qualifications.
- **Subject Filter**: Students can filter faculty members based on the subject they teach.
- **Star Rating**: Students can rate faculty members using a star-based rating system (1-5 stars).
- **Login Button**: A login option to allow students to log in and submit feedback.
- **Registration**: Users must register before they can log in and provide feedback.
- **JWT Authentication**: JSON Web Tokens (JWT) are used for secure authentication.
- **Responsive Design**: The app is designed to work on both desktop and mobile devices.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **React Router**: Used for routing and navigation within the app.
- **JWT (JSON Web Tokens)**: For secure authentication (login/registration).
- **CSS**: For styling the components and pages.
- **JavaScript**: Used for frontend logic and managing state.
- **Backend**: Node.js and Express (assumed backend for API) for faculty data and authentication.

## Screenshots

Here are some screenshots of the application:

### Registration Page:
![Registration Page](frontend/src/images/assets/images/registration-page.png)

### Login Page:
![Login Page](frontend/src/images/assets/images/login-page.png)

### Home Page:
![Home Page](frontend/src/images/assets/images/home-page.png)

### Installation

  - Clone the repository.
  - Navigate into the project directory.
  - Install dependencies using `npm install`.
  - Run the development server using `npm run dev`.
  - The website will be accessible at `http://localhost:5000`.
