from sklearn.neighbors import KNeighborsClassifier
import cv2
import pickle
import numpy as np
import os
import csv
import time
from datetime import datetime
from win32com.client import Dispatch


def speak(str1):
    speak = Dispatch("SAPI.SpVoice")
    speak.Speak(str1)


# Initialize video capture
video = cv2.VideoCapture(0)
facedetect = cv2.CascadeClassifier("data/haarcascade_frontalface_default.xml")

# Load trained data
with open("data/names.pkl", "rb") as w:
    LABELS = pickle.load(w)
with open("data/faces.pkl", "rb") as f:
    FACES = pickle.load(f)

print("Shape of Faces matrix --> ", FACES.shape)

# KNN classifier setup
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(FACES, LABELS)

COL_NAMES = ["NAME", "TIME"]

while True:
    ret, frame = video.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = facedetect.detectMultiScale(gray, 1.3, 5)

    for x, y, w, h in faces:
        crop_img = frame[y : y + h, x : x + w]
        resized_img = cv2.resize(crop_img, (50, 50)).flatten().reshape(1, -1)
        output = knn.predict(resized_img)

        # Attendance timestamp
        ts = time.time()
        date = datetime.fromtimestamp(ts).strftime("%d-%m-%Y")
        timestamp = datetime.fromtimestamp(ts).strftime("%H:%M:%S")
        exist = os.path.isfile("Attendance/Attendance_" + date + ".csv")

        # Draw rectangle and label on the face
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
        cv2.putText(
            frame,
            str(output[0]),
            (x, y - 10),
            cv2.FONT_HERSHEY_COMPLEX,
            0.8,
            (255, 255, 255),
            2,
        )

        attendance = [str(output[0]), str(timestamp)]

        # Save attendance on pressing 'o'
        if cv2.waitKey(1) & 0xFF == ord("o"):
            speak("Attendance Taken.")
            time.sleep(2)
            with open(f"Attendance/Attendance_{date}.csv", "a") as csvfile:
                writer = csv.writer(csvfile)
                if not exist:
                    writer.writerow(COL_NAMES)
                writer.writerow(attendance)

    # Display the frame directly
    cv2.imshow("Attendance Frame", frame)

    # Break loop on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

video.release()
cv2.destroyAllWindows()
