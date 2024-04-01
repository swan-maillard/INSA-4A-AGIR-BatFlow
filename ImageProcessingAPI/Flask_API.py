from flask import Flask, request, jsonify, render_template
from PIL import Image
from torchvision import transforms, models
import torch
import os
import torch.nn as nn
import base64
from PIL import Image
from io import BytesIO

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
    probabilities = {}

    for i in range(len(probs)):
        class_label = class_labels[idxs[i]]
        labels.append(class_label)
        probabilities[class_label] = float(probs[i])

    return labels[0], probabilities

def convert_base64_to_rgb(image_base64):
    image_data = base64.b64decode(image_base64)
    image = Image.open(BytesIO(image_data))
    # Convertir l'image en RGB si ce n'est pas déjà le cas
    if image.mode != 'RGB':
        image = image.convert('RGB')
    image.save('output_image.jpg')

    return image


@app.route("/")
def home():
    return render_template("./index.html")

@app.route("/predict", methods=['POST'])
def predict():
    if 'file' in request.files: # Check if file is uploaded
        file = request.files['file']
        if file.filename == '':
            return jsonify({'message': 'No selected file'}), 400

        if file and (file.filename.lower().endswith('.png') or file.filename.lower().endswith('.jpg') or file.filename.lower().endswith('.jpeg')):
            image = Image.open(file)
            RGB_Image = image.convert("RGB")
        else:
            return jsonify({'message': 'Unsupported file type'}), 400
    elif 'image' in request.json: # Check if base64 encoded image is provided
        image_data = request.json['image']
        RGB_Image = convert_base64_to_rgb(image_data)
    else:
        return jsonify({'message': 'No image provided'}), 400
    
    preprocess = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])

    model_path = os.path.join(os.getcwd(), "model_fold_2.pth")
    model = load_model(model_path)
    processed_img = preprocess(RGB_Image).unsqueeze(0)  # Add batch dimension
    # Classification
    probs, idxs = make_prediction(model, processed_img)

    prediction, probabilities = display_predictions(probs[0].detach().numpy(), idxs[0].detach().numpy())
    return jsonify({'prediction': prediction, 'probabilities': probabilities}), 201

if __name__ == "__main__":
    app.run(debug=True)