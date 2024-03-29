#import streamlit as st
import pandas as pd
from flask import Flask, request, jsonify
import seaborn as sns
from PIL import Image
from torchvision import transforms, models
import torch
import os
import pandas as pd
import torch.nn as nn
import matplotlib.pyplot as plt
import numpy as np
import base64
from PIL import Image
from io import BytesIO

from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = os.getcwd()
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def load_model(model_path):
        model = models.vgg16(pretrained=True)
        num_classes = 3
        model.classifier[6] = nn.Linear(4096, num_classes)
        model.load_state_dict(torch.load(model_path, map_location='cpu'))
        model.to("cpu")
        model.eval()
        return model

def make_prediction(model, processed_img):
    probs = model(processed_img)
    probs = probs.softmax(1)
    probs, idxs = torch.sort(probs, descending=True)
    return probs, idxs


def display_predictions(probs, idxs):

    class_labels = ["low", "medium", "high"]
    labels = []

    for i in range(len(probs)):
        class_label = class_labels[idxs[i]]
        labels.append(class_label)

    return labels[0]



def convert_base64_to_rgb(image_base64):
    image_data = base64.b64decode(image_base64)
    image = Image.open(BytesIO(image_data))
    # Convertir l'image en RGB si ce n'est pas déjà le cas
    if image.mode != 'RGB':
        image = image.convert('RGB')
    image.save('output_image.jpg')

    return image

def convert_to_rgb(file_path):
    with Image.open(file_path) as image:
        rgb_image = image.convert('RGB')
        rgb_file_path = os.path.splitext(file_path)[0] + '_rgb.jpg'
        rgb_image.save(rgb_file_path)
        return rgb_file_path




def make_prediction(model, processed_img):
    probs = model(processed_img)
    probs = probs.softmax(1)
    probs, idxs = torch.sort(probs, descending=True)
    return probs, idxs

#this is the endpoint for entering a file (with drag and drop from a local computer)
@app.route("/upload_PNG_JPG" , methods=['POST'])
def returnPrediction():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if file and (file.filename.lower().endswith('.png') or file.filename.lower().endswith(
            '.jpg') or file.filename.lower().endswith('.jpeg')):

        image = Image.open(file)
        RGB_Image = image.convert("RGB")

        preprocess = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
        ])

        model_path = os.path.join(os.getcwd(), "model_fold_2.pth")
        print(model_path)
        model = load_model(model_path)
        processed_img = preprocess(RGB_Image).unsqueeze(0)  # Add batch dimension
        # Classification
        probs, idxs = make_prediction(model, processed_img)

        prediction = display_predictions(probs[0].detach().numpy(), idxs[0].detach().numpy())
        return jsonify({'prediction': prediction}), 201

    else :
        return jsonify({'message': 'Unsupported file type'}), 400




@app.route("/")
def home():
    return "Home"


#this is the endpoint for sending a prediction but with a base 64 image
@app.route('/upload', methods=['POST'])
def upload_image():
    data = request.get_json()

    if not data or 'image' not in data:
        return jsonify({'message': 'No image provided'}), 400

    image_data = data['image']
    #print(image_data)
    RGB_Image = convert_base64_to_rgb(image_data)
    preprocess = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])

    model_path = os.path.join(os.getcwd(), "model_fold_2.pth")
    print(model_path)
    model = load_model(model_path)
    processed_img = preprocess(RGB_Image).unsqueeze(0)  # Add batch dimension

    # Classification
    probs, idxs = make_prediction(model, processed_img)
    prediction = display_predictions(probs[0].detach().numpy() , idxs[0].detach().numpy() )
    return jsonify({'prediction': prediction}), 201



@app.route("/create-user",methods=["POST"])
def create_user():
    if request.method == "POST":
        data = request.get_json()
        return jsonify(data),201



if __name__ == "__main__":
    app.run(debug=True)


