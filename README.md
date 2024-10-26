# FaceCheck - Facial Recognition Attendance System

## Table of Contents
1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Features](#features)
4. [Technical Stack](#technical-stack)
5. [Requirements](#requirements)
6. [Installation and Setup](#installation-and-setup)
7. [Acknowledgements](#acknowledgements)


## Introduction
FaceCheck is an advanced attendance tracking system that uses facial recognition technology to automatically record attendance. This project is designed to offer a quick, reliable, and error-free method of tracking attendance, eliminating the need for manual processes. Developed in collaboration with teammates Thakur Meghana and Satvika Devara, FaceCheck is ideal for use in educational institutions, workplaces, and other settings where attendance tracking is essential.

## Project Overview
FaceCheck captures images of users' faces via a camera and matches them against a pre-existing database of faces to verify identity. When a match is found, the system automatically logs the attendance, ensuring a seamless and efficient process. This innovative system significantly improves upon traditional attendance methods by providing faster and more accurate results.

## Features
- **Automated Attendance Recording:** Utilizes facial recognition to automatically record attendance without the need for manual input.
- **High Precision and Speed:** Delivers rapid and accurate attendance logging, enhancing overall productivity.
- **Real-Time Data Tracking:** Enables administrators to monitor attendance data in real time.
- **Wide Range of Applications:** Suitable for use in schools, universities, offices, hospitals, and other institutions.

## Technical Stack
- **Front-End:** HTML5, CSS3, JavaScript, React.js
- **Back-End:** Node.js, Express.js
- **Database:** MongoDB
- **Facial Recognition:** OpenCV, dlib, face_recognition library
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Version Control:** Git, GitHub

## Requirements
- Python 3.x
- Node.js
- MongoDB
- OpenCV
- NumPy
- pandas
- dlib
- face_recognition

## Installation and Setup
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/facecheck.git
    cd facecheck
    ```
2. Install dependencies:
    ```sh
    npm install
    cd client
    npm install
    cd ..
    ```
3. Set up environment variables: Create a `.env` file in the root directory and add the following variables:
    ```sh
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
4. Run the application:
    ```sh
    npm run dev
    ```
    This command will start both the server and the client concurrently.

```

### User Registration
Register users by capturing their facial images and storing them in the database using the `add_faces.py` script:
```sh
python add_faces.py
```

### Attendance Marking
Users simply stand in front of the camera, and the system automatically records their attendance if a match is found using the `app.py` script:
```sh
python app.py
```

## Acknowledgements
Special thanks to my teammates Thakur Meghana and Satvika Devara for their essential contributions to this project. We also extend our gratitude to our mentors and supporters for their guidance and encouragement.

FaceCheck is a major leap forward in attendance tracking technology. This project has provided us with practical experience and a deeper understanding of facial recognition applications. We are excited to continue improving the system and exploring new features to enhance its efficiency and reliability.

