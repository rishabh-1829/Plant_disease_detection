import argparse
from pathlib import Path

import torch
import torch.nn as nn
from torch.utils.data import DataLoader

from utils import (
    AVAILABLE_MODELS,
    CLASS_METADATA,
    CLASS_NAMES,
    MODEL_PATHS,
    SUPPORTED_PLANTS,
    count_correct_predictions,
    create_data_transforms,
    create_model,
    get_device,
    get_image_datasets,
)


BASE_DIR = Path(__file__).resolve().parent
DEFAULT_DATA_DIR = BASE_DIR / "dataset"


def train_one_epoch(model, loader, criterion, optimizer, device):
    model.train()
    running_loss = 0.0
    running_correct = 0
    total_samples = 0

    for images, labels in loader:
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item() * images.size(0)
        running_correct += count_correct_predictions(outputs, labels)
        total_samples += labels.size(0)

    return running_loss / total_samples, running_correct / total_samples


@torch.no_grad()
def evaluate(model, loader, criterion, device):
    model.eval()
    running_loss = 0.0
    running_correct = 0
    total_samples = 0

    for images, labels in loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        loss = criterion(outputs, labels)

        running_loss += loss.item() * images.size(0)
        running_correct += count_correct_predictions(outputs, labels)
        total_samples += labels.size(0)

    return running_loss / total_samples, running_correct / total_samples


def run_training(args):
    device = get_device()
    print(f"Using device: {device}")
    print(f"Supported plants: {', '.join(SUPPORTED_PLANTS)}")
    print(f"Training on classes: {', '.join(CLASS_NAMES)}")

    train_transform, val_transform = create_data_transforms()
    train_dataset, val_dataset = get_image_datasets(
        dataset_dir=args.data_dir,
        train_transform=train_transform,
        val_transform=val_transform,
        train_split=args.train_split,
        seed=args.seed,
    )

    train_loader = DataLoader(
        train_dataset, batch_size=args.batch_size, shuffle=True, num_workers=0
    )
    val_loader = DataLoader(
        val_dataset, batch_size=args.batch_size, shuffle=False, num_workers=0
    )

    model = create_model(model_name=args.model_name, num_classes=len(CLASS_NAMES))
    model = model.to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(
        filter(lambda parameter: parameter.requires_grad, model.parameters()),
        lr=args.learning_rate,
    )

    best_accuracy = 0.0
    save_path = MODEL_PATHS[args.model_name]
    save_path.parent.mkdir(parents=True, exist_ok=True)

    for epoch in range(args.epochs):
        train_loss, train_acc = train_one_epoch(
            model, train_loader, criterion, optimizer, device
        )
        val_loss, val_acc = evaluate(model, val_loader, criterion, device)

        print(
            f"Epoch [{epoch + 1}/{args.epochs}] "
            f"Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.4f} | "
            f"Val Loss: {val_loss:.4f} | Val Acc: {val_acc:.4f}"
        )

        if val_acc > best_accuracy:
            best_accuracy = val_acc
            torch.save(
                {
                    "model_name": args.model_name,
                    "class_names": CLASS_NAMES,
                    "class_metadata": CLASS_METADATA,
                    "model_state_dict": model.state_dict(),
                    "val_accuracy": val_acc,
                },
                save_path,
            )
            print(f"Saved best model to {save_path}")

    print(f"Training complete. Best validation accuracy: {best_accuracy:.4f}")


def parse_args():
    parser = argparse.ArgumentParser(
        description="Train CNN or ResNet18 on potato, rose, and tomato leaf disease images."
    )
    parser.add_argument(
        "--model-name",
        choices=AVAILABLE_MODELS.keys(),
        default="cnn",
        help="Choose which model architecture to train.",
    )
    parser.add_argument(
        "--data-dir",
        type=Path,
        default=DEFAULT_DATA_DIR,
        help="Dataset root directory with one folder per class.",
    )
    parser.add_argument("--epochs", type=int, default=10)
    parser.add_argument("--batch-size", type=int, default=16)
    parser.add_argument("--learning-rate", type=float, default=0.001)
    parser.add_argument(
        "--train-split",
        type=float,
        default=0.8,
        help="Proportion of images used for training.",
    )
    parser.add_argument("--seed", type=int, default=42)
    return parser.parse_args()


if __name__ == "__main__":
    run_training(parse_args())
