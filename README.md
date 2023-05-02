# Image Upload Project
This project allows users to upload images and retrieve a list of uploaded images. The frontend is built using React and the backend is built using Flask.

## Installation
### Backend
Change into the backend directory: cd backend
Install the dependencies: pip install -r requirements.txt

### Frontend
Install the dependencies: npm install

## Usage
### Backend
The backend provides two endpoints:

POST /upload: Upload a new image. The image should be sent in the request body as multipart/form-data.
GET /images: Retrieve a list of uploaded image filenames.

### Frontend
The frontend provides a form for uploading new images and a list of uploaded images. To upload a new image, click the "Choose File" button and select an image file. Then click the "Upload" button to upload the image. The uploaded image will appear in the list of images.


## Set port
.env
```
PORT=8081
```
## Test Cases
To run the test cases
```
npm run test
```

## Compiles and hot-reloads for development

```
npm run dev

Open [http://localhost:8081](http://localhost:8081) to view it in the browser.
Python backend runs on port 5000
