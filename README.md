# Plant Disease Detection Using Leaf Images

This project is a college-level deep learning system that detects **potato, rose, and tomato leaf diseases** from uploaded images. It includes:

- A modern frontend using HTML, CSS, and JavaScript
- A Flask backend API for image prediction
- Two PyTorch models:
  - Custom CNN
  - ResNet18 with transfer learning

## Supported Plants and Classes

The app now supports a combined multi-plant classifier with these folders/classes:

- `Potato___Healthy`
- `Potato___Early_blight`
- `Potato___Late_blight`
- `Tomato___Healthy`
- `Tomato___Early_blight`
- `Tomato___Late_blight`
- `Rose___Healthy`
- `Rose___Black_spot`
- `Rose___Powdery_mildew`

## Why the Previous Tomato-Only Model Failed

A tomato-only model can only choose from tomato labels. If you upload potato or rose leaves, it still forces the image into the closest tomato class. The new version fixes that by training on a **combined label space** across all three plants.

## Project Structure

```text
plant-disease-project/
├── app.py
├── train.py
├── utils.py
├── requirements.txt
├── README.md
├── dataset/
│   ├── Potato___Early_blight/
│   ├── Potato___Healthy/
│   ├── Potato___Late_blight/
│   ├── Rose___Black_spot/
│   ├── Rose___Healthy/
│   ├── Rose___Powdery_mildew/
│   ├── Tomato___Early_blight/
│   ├── Tomato___Healthy/
│   └── Tomato___Late_blight/
├── models/
│   ├── cnn_model.pth
│   └── resnet18_model.pth
├── static/
│   ├── script.js
│   └── style.css
└── templates/
    └── index.html
```

## Dataset Notes

- Tomato and potato classes can come from PlantVillage.
- Rose classes should come from a rose leaf disease dataset, but the folder names above must match exactly.
- Every class folder must contain images before training.

## Setup Instructions

```bash
python -m venv venv
```

Windows PowerShell:

```bash
venv\Scripts\Activate.ps1
```

Windows CMD:

```bash
venv\Scripts\activate.bat
```

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

## Train the Models

Train the custom CNN:

```bash
python train.py --model-name cnn --epochs 10
```

Train ResNet18:

```bash
python train.py --model-name resnet18 --epochs 5
```

## Run the Flask App

```bash
python app.py
```

Open the app in your browser:

[http://127.0.0.1:5000](http://127.0.0.1:5000)

## API Response Example

```json
{
  "model_name": "ResNet18 Transfer Learning",
  "plant_name": "Rose",
  "predicted_class": "Black Spot",
  "status": "warning",
  "raw_class": "Rose___Black_spot",
  "confidence": 96.21
}
```

## Important Retraining Note

The old `.pth` files were trained only on tomato classes. To use potato, rose, and tomato together, you **must retrain both models** on the new 9-class dataset.
