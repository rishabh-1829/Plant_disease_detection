import io
import random
from pathlib import Path

import torch
import torch.nn as nn
from PIL import Image, UnidentifiedImageError
from torch.utils.data import Dataset
from torchvision import datasets, models, transforms


BASE_DIR = Path(__file__).resolve().parent
MODELS_DIR = BASE_DIR / "models"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
IMAGE_SIZE = 224

# The project now supports a combined dataset with three plants.
# Tomato and potato can come from PlantVillage, while rose can come from
# any external dataset as long as the folder names below are used.
CLASS_METADATA = {
    "Potato___Early_blight": {
        "plant": "Potato",
        "disease": "Early Blight",
        "status": "warning",
        "symptoms": [
            "Dark brown circular spots appear on older leaves.",
            "Yellowing starts around the affected region.",
            "Leaf tissue slowly dries and weakens plant growth.",
        ],
        "cure": [
            "Remove heavily infected leaves from the plant.",
            "Avoid overhead watering and improve air circulation.",
            "Apply a recommended fungicide for early blight if infection spreads.",
        ],
    },
    "Potato___Healthy": {
        "plant": "Potato",
        "disease": "Healthy",
        "status": "healthy",
        "symptoms": [
            "Leaf color looks even and naturally green.",
            "No major dark lesions or fungal coating are visible.",
            "Leaf surface appears stable and undamaged.",
        ],
        "cure": [
            "Continue regular watering and balanced fertilization.",
            "Monitor leaves weekly for new spots or yellowing.",
            "Keep field hygiene strong to prevent infection.",
        ],
    },
    "Potato___Late_blight": {
        "plant": "Potato",
        "disease": "Late Blight",
        "status": "critical",
        "symptoms": [
            "Large dark water-soaked patches spread quickly on leaves.",
            "Leaf edges may turn brown and collapse rapidly.",
            "In humid conditions, infection can worsen within a short time.",
        ],
        "cure": [
            "Isolate infected plants quickly to reduce spread.",
            "Remove severely infected leaves or plants immediately.",
            "Use a suitable fungicide and reduce excess moisture in the field.",
        ],
    },
    "Rose___Black_spot": {
        "plant": "Rose",
        "disease": "Black Spot",
        "status": "warning",
        "symptoms": [
            "Black circular spots form on the upper leaf surface.",
            "Yellow halos may develop around the spots.",
            "Leaves may drop early when infection becomes stronger.",
        ],
        "cure": [
            "Prune and discard infected leaves from the plant base.",
            "Water the soil, not the leaves, to keep foliage dry.",
            "Apply rose-safe fungicide if symptoms continue to spread.",
        ],
    },
    "Rose___Healthy": {
        "plant": "Rose",
        "disease": "Healthy",
        "status": "healthy",
        "symptoms": [
            "Leaf surface is clean with no visible fungal or black lesions.",
            "Color remains bright green and balanced.",
            "No curling, powdery patches, or unusual yellowing are present.",
        ],
        "cure": [
            "Maintain regular pruning and sunlight exposure.",
            "Keep leaves dry when watering the plant.",
            "Inspect new growth often for early disease signs.",
        ],
    },
    "Rose___Powdery_mildew": {
        "plant": "Rose",
        "disease": "Powdery Mildew",
        "status": "critical",
        "symptoms": [
            "White powder-like fungal growth appears on the leaf surface.",
            "Young leaves may curl or become distorted.",
            "Plant growth slows when the coating becomes severe.",
        ],
        "cure": [
            "Remove infected leaves and improve air movement around the plant.",
            "Avoid excess shade and overcrowding in rose beds.",
            "Spray a mildew-control treatment recommended for roses.",
        ],
    },
    "Tomato___Early_blight": {
        "plant": "Tomato",
        "disease": "Early Blight",
        "status": "warning",
        "symptoms": [
            "Dark target-like spots usually begin on older leaves.",
            "Yellowing can appear around the infected tissue.",
            "Leaf damage increases gradually if ignored.",
        ],
        "cure": [
            "Remove infected lower leaves and keep the area clean.",
            "Reduce splash watering and improve ventilation.",
            "Use a suitable fungicide if the disease starts spreading widely.",
        ],
    },
    "Tomato___Healthy": {
        "plant": "Tomato",
        "disease": "Healthy",
        "status": "healthy",
        "symptoms": [
            "Leaves appear fresh, green, and evenly textured.",
            "No major lesions, mildew, or dark wet areas are visible.",
            "The plant shows stable leaf structure and color.",
        ],
        "cure": [
            "Maintain regular nutrient support and watering schedule.",
            "Keep checking lower leaves for early disease signs.",
            "Use clean tools and field hygiene to prevent infections.",
        ],
    },
    "Tomato___Late_blight": {
        "plant": "Tomato",
        "disease": "Late Blight",
        "status": "critical",
        "symptoms": [
            "Dark irregular lesions expand rapidly across the leaf.",
            "Leaves may appear wet, collapsed, or heavily damaged.",
            "The disease can spread fast in cool and humid weather.",
        ],
        "cure": [
            "Remove infected leaves immediately and separate affected plants.",
            "Lower humidity around the crop and avoid wet foliage.",
            "Apply an appropriate late blight control treatment as advised.",
        ],
    },
}
CLASS_NAMES = sorted(CLASS_METADATA.keys())
SUPPORTED_PLANTS = ["Potato", "Rose", "Tomato"]
MODEL_PATHS = {
    "cnn": MODELS_DIR / "cnn_model.pth",
    "resnet18": MODELS_DIR / "resnet18_model.pth",
}
AVAILABLE_MODELS = {
    "cnn": "Custom CNN",
    "resnet18": "ResNet18 Transfer Learning",
}


class CustomCNN(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.AdaptiveAvgPool2d((6, 6)),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 6 * 6, 256),
            nn.ReLU(inplace=True),
            nn.Dropout(0.4),
            nn.Linear(256, num_classes),
        )

    def forward(self, x):
        x = self.features(x)
        return self.classifier(x)


class TransformSubset(Dataset):
    def __init__(self, base_dataset, indices, transform):
        self.base_dataset = base_dataset
        self.indices = indices
        self.transform = transform

    def __len__(self):
        return len(self.indices)

    def __getitem__(self, idx):
        image, label = self.base_dataset[self.indices[idx]]
        if self.transform:
            image = self.transform(image)
        return image, label


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_device():
    return "cuda" if torch.cuda.is_available() else "cpu"


def create_model(model_name, num_classes):
    if model_name == "cnn":
        return CustomCNN(num_classes)

    if model_name == "resnet18":
        weights = models.ResNet18_Weights.DEFAULT
        model = models.resnet18(weights=weights)

        for parameter in model.parameters():
            parameter.requires_grad = False

        in_features = model.fc.in_features
        model.fc = nn.Linear(in_features, num_classes)
        return model

    raise ValueError(f"Unknown model: {model_name}")


def create_data_transforms():
    train_transform = transforms.Compose(
        [
            transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
            transforms.RandomHorizontalFlip(),
            transforms.RandomRotation(20),
            transforms.ColorJitter(brightness=0.12, contrast=0.12, saturation=0.1),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
        ]
    )

    val_transform = transforms.Compose(
        [
            transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
        ]
    )
    return train_transform, val_transform


def get_image_datasets(dataset_dir, train_transform, val_transform, train_split=0.8, seed=42):
    dataset_dir = Path(dataset_dir)
    if not dataset_dir.exists():
        raise FileNotFoundError(
            f"Dataset directory not found at {dataset_dir}. "
            "Create one folder per class for potato, rose, and tomato images."
        )

    base_dataset = datasets.ImageFolder(dataset_dir)
    discovered_classes = set(base_dataset.classes)

    missing_classes = [class_name for class_name in CLASS_NAMES if class_name not in discovered_classes]
    if missing_classes:
        raise ValueError(
            "Dataset is missing required class folders: " + ", ".join(missing_classes)
        )

    indices = list(range(len(base_dataset)))
    random.Random(seed).shuffle(indices)

    split_index = int(len(indices) * train_split)
    train_indices = indices[:split_index]
    val_indices = indices[split_index:]

    if not train_indices or not val_indices:
        raise ValueError("Dataset split produced an empty train or validation set.")

    train_dataset = TransformSubset(base_dataset, train_indices, train_transform)
    val_dataset = TransformSubset(base_dataset, val_indices, val_transform)
    return train_dataset, val_dataset


def preprocess_uploaded_image(file_storage):
    try:
        image_bytes = file_storage.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except UnidentifiedImageError as exc:
        raise ValueError("Uploaded file is not a valid image.") from exc

    _, inference_transform = create_data_transforms()
    tensor = inference_transform(image).unsqueeze(0)
    return tensor


def get_display_info(class_name):
    if class_name in CLASS_METADATA:
        return CLASS_METADATA[class_name]

    plant, _, disease = class_name.partition("___")
    disease_name = disease.replace("_", " ") if disease else "Unknown"
    status = "healthy" if disease_name.lower() == "healthy" else "warning"
    return {
        "plant": plant,
        "disease": disease_name.title(),
        "status": status,
        "symptoms": ["Visible symptoms are not available for this class."],
        "cure": ["Use expert inspection if the visual result looks uncertain."],
    }


def load_trained_model(model_name):
    checkpoint_path = MODEL_PATHS[model_name]
    if not checkpoint_path.exists():
        raise FileNotFoundError(f"Missing weights file: {checkpoint_path}")

    checkpoint = torch.load(checkpoint_path, map_location=get_device())
    class_names = checkpoint.get("class_names", CLASS_NAMES)
    expected_classes = set(CLASS_NAMES)
    checkpoint_classes = set(class_names)

    if checkpoint_classes != expected_classes:
        raise ValueError(
            "The selected model weights are outdated and were trained on a different "
            "class set. Retrain the model using the current multi-plant dataset "
            "for potato, rose, and tomato leaves."
        )

    model = create_model(model_name=model_name, num_classes=len(class_names))
    try:
        model.load_state_dict(checkpoint["model_state_dict"])
    except RuntimeError as exc:
        raise ValueError(
            "The selected model weights do not match the current project architecture. "
            "Please retrain this model using train.py before running predictions."
        ) from exc
    model.eval()
    return model, class_names


@torch.no_grad()
def predict_image(file_storage, model_name):
    tensor = preprocess_uploaded_image(file_storage)
    device = get_device()
    model, class_names = load_trained_model(model_name)
    model = model.to(device)
    tensor = tensor.to(device)

    outputs = model(tensor)
    probabilities = torch.softmax(outputs, dim=1)
    confidence, predicted_index = torch.max(probabilities, dim=1)

    class_name = class_names[predicted_index.item()]
    display_info = get_display_info(class_name)
    return {
        "model_name": AVAILABLE_MODELS[model_name],
        "plant_name": display_info["plant"],
        "predicted_class": display_info["disease"],
        "status": display_info["status"],
        "symptoms": display_info["symptoms"],
        "cure": display_info["cure"],
        "raw_class": class_name,
        "confidence": round(confidence.item() * 100, 2),
    }


def count_correct_predictions(outputs, labels):
    _, predictions = torch.max(outputs, 1)
    return (predictions == labels).sum().item()
