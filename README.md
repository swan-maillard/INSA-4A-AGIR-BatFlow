# BatFlow — AGIR Project

## Project Overview

**BatFlow** is a multi-faceted project aimed at improving the management of menstrual health through a mobile app and the use of image classification technology. The project encompasses several key components:

1. **BatFlow Mobile Application**: A mobile app developed using React Native, designed to track and monitor menstrual health and bleeding intensity.
2. **Classification Model Training**: A deep learning model built on the VGG-16 architecture for classifying menstrual blood loss into three categories (`low`, `medium`, `high`).
3. **Image Processing API**: A Flask-based API to handle image uploads and classify the amount of blood loss using the pre-trained model.

## BatFlow Mobile Application (`/BatFlow/`)

![Screenshot_1711893277 (Personnalisé)](https://github.com/swan-maillard/AGIR/assets/58143015/98548fcd-253d-4c91-b59c-d11709dd73d4)

### Requirements

- **Node.js:** Make sure Node.js is installed on your system to run the application.
- **React Native Environment:** Ensure you have a React Native development environment set up on your machine.

### Installation
- Run `npm install` to install the project dependencies.
- Connect your Android device to your computer or set up an Android emulator.
- Run `npm start` to build the application.
- Run `npm run android` to deploy the application to your Android device or emulator.


## Classification Model Training (`/ModelTraining/`)

This script is used for training an image classification model using our custom dataset (used sanitory products – such as pads) and cross-validation with the VGG-16 pre-trained network since our dataset is small and artificial. 

VGG-16 is a convolutional neural network that is 101 layers deep and was pre-trained on more than a million images from the ImageNet database.

Our model is trained to classify the blood loss into one of three categories: `low`, `medium`, or `high`.

### Setup and Dependencies
- **Python Environment:** Ensure you have a Python environment set up with the required dependencies, including PIL, torchvision, torch, and other standard libraries.
- **Dependencies Installation:** Install the necessary dependencies by running `pip install -r requirements.txt`

### Data Preprocessing

- **Data Augmentation:** The original images are contained in the `data/` folder. Because our dataset is very small, we artificially apply random augmentation to increase it. The augmented dataset is sored in `data/augmented/`
- **Transformations:** Images are resized to 224x224 pixels and converted to tensors using PyTorch transformations.
- **Custom Dataset:** A custom dataset class (`MenstrualDataset`) is defined to load images and labels from the specified folder. The label is extracted from the image name.

### Training Process

- **Cross-Validation:** The dataset is split into a specified number of folds (5 in this case) using Stratified K-Fold to ensure balanced class distribution in each fold.
- **Model Architecture:** The pre-trained VGG-16 model is loaded, with the final fully connected layer replaced to accommodate the number of classes in the dataset.
- **Loss Function and Optimizer:** Cross-entropy loss and stochastic gradient descent (SGD) optimizer are utilized for training.
- **Model Saving:** The trained model is saved to `model_fold_2.pth`

### Important Notes

- The model was already trained, you can download `model_fold_2.pth` here : https://huggingface.co/Khai2002/menstrual_image_model/tree/main
- The model `model_fold_2.pth` has to be placed in the `ImageProcessingAPI/` folder for the API to work.
- Hyperparameters and model architecture can be tuned further for better performance.

## Image Processing API (`/ImageProcessingAPI/`)

This API provides endpoints for image classification. 
It accepts images in PNG or JPG formats either through direct file upload or base64 encoding.

![image](https://github.com/swan-maillard/AGIR/assets/58143015/b6522b3a-fca0-4962-9b14-a2db85a623bc)

### Setup

1. Install the required dependencies by running `pip install -r requirements.txt`.
2. Ensure the model file `model_fold_2.pth` is present in the same directory as the application. Otherwise, read the **Classification Model Training** part of this README.
2. Run the Flask application by executing `python app.py` - it should run on localhost:5000
3. Put the API online, for example using ngrok by running `ngrok http 5000`

### Endpoints

#### 1. Home - Upload Image File
- **Endpoint:** `/`
- **Description:** Renders the home page for the API, allows to manually upload an image file (png, jpg or jpeg)

#### 2. Predict blood loss
- **Endpoint:** `/predict`
- **Method:** POST
- **Request Body:** Accepts either form-data with the file as 'file' or JSON with the base64 encoded image data as 'image'.
- **Response:** Returns the predicted class label and probabilities for the uploaded image. The model is configured to classify images into one of three categories: `low`, `medium`, or `high`.
- **Status Codes:**
  - 201: Successfully processed and classified the image.
  - 400: Bad request or missing image data.

## Figma
Mobile app mockups and poster.

![A4 - 1](https://github.com/swan-maillard/AGIR/assets/58143015/baf5b157-af4c-4b33-9dfd-95857fc4e476)

https://www.figma.com/file/ibNtUjrkFaB8Mssf9i7Tvs/Dracula?type=design&node-id=0%3A1&mode=dev&t=WJbBb79MwybzeAcQ-1

## Authors

- Swan Maillard (maillard.swan@gmail.com)
- Sarah Malard (sarah.malard@insa-lyon.fr)
- Le Tuan Khai Nguyen (le.nguyen@insa-lyon.fr)
- Mathis Nguyen (mathis.nguyen@insa-lyon.fr)
- Mohamed-Ali Lajnef (mohamed-ali.lajnef@insa-lyon.fr)

## License

This project is licensed under the MIT License. Please consult the `LICENSE` file for more information.
