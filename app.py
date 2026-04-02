from pathlib import Path

from flask import Flask, jsonify, render_template, request

from utils import (
    AVAILABLE_MODELS,
    CLASS_METADATA,
    SUPPORTED_PLANTS,
    allowed_file,
    predict_image,
)


BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024  # 5 MB upload limit

PLANT_LABELS = {
    "Potato": {"en": "Potato", "hi": "आलू"},
    "Rose": {"en": "Rose", "hi": "गुलाब"},
    "Tomato": {"en": "Tomato", "hi": "टमाटर"},
}


@app.route("/")
def index():
    disease_descriptions = {
        "Healthy": {
            "en": "Leaves appear visually normal with stable color, texture, and no major disease symptoms.",
            "hi": "पत्तियां सामान्य दिखती हैं, उनका रंग और बनावट स्थिर होती है, और उन पर बीमारी के स्पष्ट लक्षण नहीं दिखते।",
        },
        "Early Blight": {
            "en": "Usually shows dark circular spots and yellowing that begin on older leaves and spread over time.",
            "hi": "यह आमतौर पर गहरे गोल धब्बों और पीलापन के रूप में दिखता है, जो पुरानी पत्तियों से शुरू होकर धीरे-धीरे फैलता है।",
        },
        "Late Blight": {
            "en": "Often appears as water-soaked or dark irregular lesions that can expand quickly across the leaf.",
            "hi": "यह अक्सर पानी जैसे भीगे या गहरे अनियमित धब्बों के रूप में दिखाई देता है, जो पत्ती पर तेजी से फैल सकते हैं।",
        },
        "Black Spot": {
            "en": "Common on rose leaves and often seen as dark round lesions surrounded by yellowing tissue.",
            "hi": "यह गुलाब की पत्तियों पर आम है और प्रायः पीले किनारों वाले गहरे गोल धब्बों के रूप में दिखाई देता है।",
        },
        "Powdery Mildew": {
            "en": "Looks like a white dusty coating on the leaf surface and can reduce healthy growth.",
            "hi": "यह पत्ती की सतह पर सफेद चूर्ण जैसी परत के रूप में दिखता है और पौधे की स्वस्थ वृद्धि को कम कर सकता है।",
        },
    }
    diseases_by_plant = {}
    for _, metadata in CLASS_METADATA.items():
        plant_name = metadata["plant"]
        disease_name = metadata["disease"]
        diseases_by_plant.setdefault(plant_name, [])
        if not any(item["name"] == disease_name for item in diseases_by_plant[plant_name]):
            diseases_by_plant[plant_name].append(
                {
                    "name": {
                        "en": disease_name,
                        "hi": {
                            "Healthy": "स्वस्थ",
                            "Early Blight": "अर्ली ब्लाइट",
                            "Late Blight": "लेट ब्लाइट",
                            "Black Spot": "ब्लैक स्पॉट",
                            "Powdery Mildew": "पाउडरी मिल्ड्यू",
                        }.get(disease_name, disease_name),
                    },
                    "description": disease_descriptions.get(
                        disease_name,
                        {
                            "en": "This class is part of the trained disease library for this plant.",
                            "hi": "यह वर्ग इस पौधे के लिए प्रशिक्षित रोग लाइब्रेरी का हिस्सा है।",
                        },
                    ),
                }
            )

    for plant_name in diseases_by_plant:
        diseases_by_plant[plant_name].sort(
            key=lambda disease: (disease["name"]["en"] == "Healthy", disease["name"]["en"])
        )

    return render_template(
        "index.html",
        supported_plants=SUPPORTED_PLANTS,
        diseases_by_plant=diseases_by_plant,
        plant_labels=PLANT_LABELS,
    )


@app.route("/detect")
def detect():
    return render_template(
        "detect.html",
        model_options=AVAILABLE_MODELS.items(),
        supported_plants=SUPPORTED_PLANTS,
        plant_labels=PLANT_LABELS,
    )


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "Please upload a leaf image."}), 400

    image_file = request.files["image"]
    model_name = request.form.get("model_name", "cnn").lower()

    if image_file.filename == "":
        return jsonify({"error": "No image file selected."}), 400

    if not allowed_file(image_file.filename):
        return jsonify({"error": "Invalid file type. Please upload JPG, JPEG, or PNG."}), 400

    if model_name not in AVAILABLE_MODELS:
        return jsonify({"error": f"Unsupported model '{model_name}'."}), 400

    try:
        result = predict_image(image_file, model_name=model_name)
    except FileNotFoundError:
        return (
            jsonify(
                {
                    "error": (
                        f"Model weights for '{model_name}' were not found. "
                        "Train the model first using train.py."
                    )
                }
            ),
            500,
        )
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:
        return jsonify({"error": f"Prediction failed: {exc}"}), 500

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
