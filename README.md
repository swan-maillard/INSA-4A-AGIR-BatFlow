# BatFlow — AGIR Project

## Image Processing Model

**Download the `model_fold_2.pth` and put it in the `ImageProcessingAPI/` folder.**

https://huggingface.co/Khai2002/menstrual_image_model/tree/main

This is a pre-trained VGG16 model for used sanitory prodcucts image classification.

## Image Processing API

This API provides endpoints for image classification. 
It accepts images in PNG or JPG formats either through direct file upload or base64 encoding.

### Setup

1. Install the required dependencies by running `pip install -r requirements.txt`.
2. Run the Flask application by executing `python app.py` - it should run on localhost:5000
3. Put the API online, for example using ngrok by running `ngrok http 5000`

### Endpoints

#### 1. Upload Image (PNG/JPG)
- **Endpoint:** `/upload_PNG_JPG`
- **Method:** POST
- **Response:** Returns the predicted class label for the uploaded image.
- **Status Codes:**
  - 201: Successfully processed and classified the image.
  - 400: Bad request, missing file, or unsupported file type.

#### 2. Upload Base64 Encoded Image
- **Endpoint:** `/upload`
- **Method:** POST
- **Request Body:** JSON with the base64 encoded image data as 'image'.
- **Response:** Returns the predicted class label for the uploaded image.
- **Status Codes:**
  - 201: Successfully processed and classified the image.
  - 400: Bad request or missing image data.

### Important Notes

- This API utilizes a pre-trained VGG16 model for image classification.
- The model is configured to classify images into one of three categories: `low`, `medium`, or `high`.
- Ensure the model file `model_fold_2.pth` is present in the same directory as the application.
- This API is for demonstration purposes and may require modifications for production use, such as authentication, error handling, and scalability improvements.

## Figma
Mobile app mockups and poster.

https://www.figma.com/file/ibNtUjrkFaB8Mssf9i7Tvs/Dracula?type=design&node-id=0%3A1&mode=dev&t=WJbBb79MwybzeAcQ-1
