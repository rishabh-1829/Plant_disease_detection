const translations = {
    en: {
        brand_subtitle: "Plant disease detection system",
        detect_brand_subtitle: "Detection workspace",
        lang_toggle: "हिंदी",
        nav_disease_library: "Disease Library",
        nav_open_detection: "Open Detection",
        landing_eyebrow: "Smart Leaf Screening",
        landing_title: "An AI powered platform for plant disease detection.",
        landing_intro: "This system helps users understand supported plants, review disease classes, and move into a dedicated prediction workspace for live leaf-image analysis.",
        start_detection: "Start Detection",
        view_disease_list: "View Disease List",
        supported_plants_label: "Supported Plants",
        landing_showcase_copy: "One detection flow for multiple leaf types with separate disease classes underneath each plant.",
        stat_plants: "Plants",
        stat_disease_labels: "Disease Labels",
        stat_workspace: "Workspace",
        stat_workspace_value: "Separate Detector",
        disease_library_title: "All supported diseases with short descriptions",
        disease_library_copy: "These are the classes the system is trained to recognize across potato, rose, and tomato leaves, along with a quick explanation of what each disease usually looks like.",
        leaf_classes_suffix: "Leaf Classes",
        platform_highlights_title: "Platform Highlights",
        platform_highlights_copy: "The goal of this first page is to introduce the supported scope of the project before the user enters the upload and prediction workflow.",
        feature_1_title: "Multi-plant support",
        feature_1_copy: "The project distinguishes among potato, rose, and tomato leaves instead of forcing every image into a single plant category.",
        feature_2_title: "Disease-aware prediction",
        feature_2_copy: "Each plant has disease classes trained separately so the output includes both the plant type and the disease label.",
        feature_3_title: "Dedicated detector page",
        feature_3_copy: "The upload workflow is separated from the landing page, making the project cleaner, easier to present, and simpler to navigate.",
        how_it_works_label: "How It Works",
        how_it_works_title: "How the platform works",
        how_it_works_copy: "The system follows a clear sequence from image upload to prediction output, which makes it easier to explain in a presentation.",
        step_1_label: "Step 1",
        step_1_title: "Upload the image",
        step_1_copy: "The user uploads a leaf image from one of the supported plants on the detection page.",
        step_2_label: "Step 2",
        step_2_title: "Preprocess and classify",
        step_2_copy: "The backend resizes and normalizes the image before sending it to the selected deep learning model.",
        step_3_label: "Step 3",
        step_3_title: "Show diagnosis",
        step_3_copy: "The frontend displays the plant name, disease name, model used, and confidence score in a structured result panel.",
        next_step_label: "Next Step",
        next_step_title: "Ready to test a leaf image?",
        next_step_copy: "Open the dedicated detection page to upload a leaf, switch between CNN and ResNet18, and view the prediction with plant name and confidence.",
        go_to_detection_page: "Go To Detection Page",
        landing_page: "Landing Page",
        upload_now: "Upload Now",
        detect_workspace_label: "Detection Workspace",
        detect_title: "Upload a potato, rose, or tomato leaf image",
        detect_intro: "Pick a model, upload the image, and read the predicted plant type, disease class, confidence score, and diagnosis status.",
        model_selection: "Model Selection",
        choose_prediction_model: "Choose the prediction model",
        detection_mode: "Detection Mode",
        drop_leaf_image_here: "Drop leaf image here",
        drop_leaf_image_copy: "Use a JPG or PNG image from the supported plant list.",
        preview_placeholder: "Leaf preview appears here",
        no_file_selected: "No file selected",
        file_hint: "Supported: JPG, JPEG, PNG",
        predict_disease: "Predict Disease",
        analyzing_state_button: "Analyzing...",
        analyzing_leaf_image: "Analyzing leaf image",
        analyzing_copy: "Running plant recognition, feature extraction, and disease prediction on the uploaded image.",
        prediction_result: "Prediction Result",
        confidence_label: "confidence",
        plant_type: "Plant Type",
        disease_confidence: "Disease Confidence",
        selected_model: "Selected Model",
        raw_class_label: "Raw Class Label",
        scan_insight: "Scan Insight",
        scan_insight_copy: "The platform highlights the most likely disease class and then suggests the next practical care steps.",
        symptoms_label: "Symptoms",
        symptoms_title: "Visible Signs",
        cure_label: "Cure",
        cure_title: "Recommended Action",
        print_report: "Print Report",
        prediction_could_not_be_completed: "Prediction could not be completed",
        waiting_for_analysis: "Waiting for analysis",
        waiting_for_analysis_copy: "The diagnosis card will appear here with plant name, disease class, confidence score, and model details.",
        error_choose_leaf: "Please choose a leaf image before predicting.",
        error_invalid_format: "Invalid file format. Please upload a JPG or PNG image.",
        error_default: "Prediction failed.",
        result_badge_healthy: "Healthy",
        result_badge_warning: "Attention Needed",
        result_badge_critical: "High Risk",
        plant_leaf_suffix: "Leaf",
        summary_healthy: "The uploaded {plant} leaf appears healthy with a confidence of {confidence}%.",
        summary_disease: "The model identified this as a {plant} leaf and detected {disease} with {confidence}% confidence."
    },
    hi: {
        brand_subtitle: "पौधों की बीमारी पहचान प्रणाली",
        detect_brand_subtitle: "डिटेक्शन वर्कस्पेस",
        lang_toggle: "English",
        nav_disease_library: "रोग सूची",
        nav_open_detection: "डिटेक्शन खोलें",
        landing_eyebrow: "स्मार्ट लीफ स्क्रीनिंग",
        landing_title: "पौधों की बीमारी पहचान के लिए एक AI powered platform.",
        landing_intro: "यह प्रणाली उपयोगकर्ताओं को समर्थित पौधों को समझने, रोग वर्गों की समीक्षा करने और लाइव पत्ती-छवि विश्लेषण के लिए समर्पित प्रेडिक्शन वर्कस्पेस तक पहुंचने में मदद करती है।",
        start_detection: "डिटेक्शन शुरू करें",
        view_disease_list: "रोग सूची देखें",
        supported_plants_label: "समर्थित पौधे",
        landing_showcase_copy: "कई प्रकार की पत्तियों के लिए एक ही डिटेक्शन फ्लो, जिसमें प्रत्येक पौधे के लिए अलग-अलग रोग वर्ग शामिल हैं।",
        stat_plants: "पौधे",
        stat_disease_labels: "रोग वर्ग",
        stat_workspace: "वर्कस्पेस",
        stat_workspace_value: "अलग डिटेक्टर",
        disease_library_title: "सभी समर्थित रोगों के साथ संक्षिप्त विवरण",
        disease_library_copy: "ये वे वर्ग हैं जिन्हें प्रणाली आलू, गुलाब और टमाटर की पत्तियों में पहचानने के लिए प्रशिक्षित की गई है, साथ ही प्रत्येक रोग कैसा दिखता है उसका एक छोटा विवरण भी दिया गया है।",
        leaf_classes_suffix: "पत्ती वर्ग",
        platform_highlights_title: "प्लेटफॉर्म विशेषताएँ",
        platform_highlights_copy: "इस पहले पृष्ठ का उद्देश्य परियोजना के समर्थित दायरे को बताना है, ताकि उपयोगकर्ता अपलोड और प्रेडिक्शन वर्कफ़्लो में जाने से पहले समझ सके।",
        feature_1_title: "मल्टी-प्लांट सपोर्ट",
        feature_1_copy: "यह परियोजना आलू, गुलाब और टमाटर की पत्तियों में अंतर करती है, बजाय हर छवि को एक ही पौधे की श्रेणी में डालने के।",
        feature_2_title: "रोग-केंद्रित प्रेडिक्शन",
        feature_2_copy: "प्रत्येक पौधे के लिए रोग वर्ग अलग से प्रशिक्षित किए गए हैं, इसलिए आउटपुट में पौधे का प्रकार और रोग दोनों शामिल होते हैं।",
        feature_3_title: "अलग डिटेक्टर पेज",
        feature_3_copy: "अपलोड वर्कफ़्लो को लैंडिंग पेज से अलग रखा गया है, जिससे परियोजना अधिक साफ, प्रस्तुत करने में आसान और नेविगेट करने में सरल बनती है।",
        how_it_works_label: "यह कैसे काम करता है",
        how_it_works_title: "प्लेटफॉर्म कैसे काम करता है",
        how_it_works_copy: "यह प्रणाली छवि अपलोड से लेकर प्रेडिक्शन आउटपुट तक एक स्पष्ट क्रम का पालन करती है, जिससे प्रस्तुति में समझाना आसान हो जाता है।",
        step_1_label: "चरण 1",
        step_1_title: "छवि अपलोड करें",
        step_1_copy: "उपयोगकर्ता डिटेक्शन पेज पर समर्थित पौधों में से किसी एक की पत्ती की छवि अपलोड करता है।",
        step_2_label: "चरण 2",
        step_2_title: "प्रीप्रोसेस और वर्गीकरण",
        step_2_copy: "बैकएंड छवि को चयनित डीप लर्निंग मॉडल तक भेजने से पहले उसका आकार बदलता है और सामान्यीकृत करता है।",
        step_3_label: "चरण 3",
        step_3_title: "निदान दिखाएँ",
        step_3_copy: "फ्रंटएंड एक संरचित परिणाम पैनल में पौधे का नाम, रोग का नाम, उपयोग किया गया मॉडल और विश्वास स्कोर दिखाता है।",
        next_step_label: "अगला चरण",
        next_step_title: "क्या आप पत्ती की छवि जाँचना चाहते हैं?",
        next_step_copy: "समर्पित डिटेक्शन पेज खोलें, पत्ती अपलोड करें, CNN और ResNet18 के बीच बदलें, और पौधे के नाम व कॉन्फिडेंस के साथ प्रेडिक्शन देखें।",
        go_to_detection_page: "डिटेक्शन पेज पर जाएँ",
        landing_page: "लैंडिंग पेज",
        upload_now: "अभी अपलोड करें",
        detect_workspace_label: "डिटेक्शन वर्कस्पेस",
        detect_title: "आलू, गुलाब या टमाटर की पत्ती की छवि अपलोड करें",
        detect_intro: "एक मॉडल चुनें, छवि अपलोड करें, और अनुमानित पौधा प्रकार, रोग वर्ग, कॉन्फिडेंस स्कोर और निदान स्थिति देखें।",
        model_selection: "मॉडल चयन",
        choose_prediction_model: "प्रेडिक्शन मॉडल चुनें",
        detection_mode: "डिटेक्शन मोड",
        drop_leaf_image_here: "यहाँ पत्ती की छवि छोड़ें",
        drop_leaf_image_copy: "समर्थित पौधों की सूची से JPG या PNG छवि का उपयोग करें।",
        preview_placeholder: "पत्ती का प्रीव्यू यहाँ दिखाई देगा",
        no_file_selected: "कोई फ़ाइल चयनित नहीं है",
        file_hint: "समर्थित: JPG, JPEG, PNG",
        predict_disease: "रोग का अनुमान लगाएँ",
        analyzing_state_button: "विश्लेषण हो रहा है...",
        analyzing_leaf_image: "पत्ती की छवि का विश्लेषण हो रहा है",
        analyzing_copy: "अपलोड की गई छवि पर पौधा पहचान, फीचर एक्सट्रैक्शन और रोग प्रेडिक्शन चल रहा है।",
        prediction_result: "प्रेडिक्शन परिणाम",
        confidence_label: "विश्वास",
        plant_type: "पौधे का प्रकार",
        disease_confidence: "रोग कॉन्फिडेंस",
        selected_model: "चयनित मॉडल",
        raw_class_label: "रॉ क्लास लेबल",
        scan_insight: "स्कैन इनसाइट",
        scan_insight_copy: "यह प्लेटफॉर्म सबसे संभावित रोग वर्ग दिखाता है और फिर आगे की देखभाल के लिए व्यावहारिक सुझाव देता है।",
        symptoms_label: "लक्षण",
        symptoms_title: "दिखने वाले संकेत",
        cure_label: "उपचार",
        cure_title: "सुझाए गए कदम",
        print_report: "रिपोर्ट प्रिंट करें",
        prediction_could_not_be_completed: "प्रेडिक्शन पूरा नहीं हो सका",
        waiting_for_analysis: "विश्लेषण की प्रतीक्षा में",
        waiting_for_analysis_copy: "निदान कार्ड यहाँ पौधे का नाम, रोग वर्ग, कॉन्फिडेंस स्कोर और मॉडल विवरण के साथ दिखाई देगा।",
        error_choose_leaf: "प्रेडिक्शन से पहले कृपया पत्ती की छवि चुनें।",
        error_invalid_format: "अमान्य फ़ाइल प्रारूप। कृपया JPG या PNG छवि अपलोड करें।",
        error_default: "प्रेडिक्शन विफल रहा।",
        result_badge_healthy: "स्वस्थ",
        result_badge_warning: "ध्यान आवश्यक",
        result_badge_critical: "उच्च जोखिम",
        plant_leaf_suffix: "पत्ती",
        summary_healthy: "अपलोड की गई {plant} पत्ती {confidence}% विश्वास के साथ स्वस्थ दिखाई देती है।",
        summary_disease: "मॉडल ने इसे {plant} पत्ती के रूप में पहचाना और {confidence}% विश्वास के साथ {disease} पाया।"
    }
};

const plantNames = {
    Potato: { en: "Potato", hi: "आलू" },
    Rose: { en: "Rose", hi: "गुलाब" },
    Tomato: { en: "Tomato", hi: "टमाटर" }
};

const diseaseNames = {
    Healthy: { en: "Healthy", hi: "स्वस्थ" },
    "Early Blight": { en: "Early Blight", hi: "अर्ली ब्लाइट" },
    "Late Blight": { en: "Late Blight", hi: "लेट ब्लाइट" },
    "Black Spot": { en: "Black Spot", hi: "ब्लैक स्पॉट" },
    "Powdery Mildew": { en: "Powdery Mildew", hi: "पाउडरी मिल्ड्यू" }
};

const langButtons = document.querySelectorAll("[data-lang-toggle]");
const translatableElements = document.querySelectorAll("[data-i18n]");
const bilingualElements = document.querySelectorAll("[data-i18n-attr='text']");

const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const previewImage = document.getElementById("previewImage");
const previewPlaceholder = document.getElementById("previewPlaceholder");
const fileName = document.getElementById("fileName");
const predictBtn = document.getElementById("predictBtn");
const modelSelect = document.getElementById("modelSelect");
const loadingState = document.getElementById("loadingState");
const resultCard = document.getElementById("resultCard");
const errorCard = document.getElementById("errorCard");
const errorMessage = document.getElementById("errorMessage");
const resultClass = document.getElementById("resultClass");
const resultConfidence = document.getElementById("resultConfidence");
const resultModel = document.getElementById("resultModel");
const resultPlaceholder = document.getElementById("resultPlaceholder");
const resultBadge = document.getElementById("resultBadge");
const resultSummary = document.getElementById("resultSummary");
const confidenceValue = document.getElementById("confidenceValue");
const confidenceOrb = document.getElementById("confidenceOrb");
const resultPlant = document.getElementById("resultPlant");
const resultRawClass = document.getElementById("resultRawClass");
const plantName = document.getElementById("plantName");
const symptomsList = document.getElementById("symptomsList");
const cureList = document.getElementById("cureList");
const printReportBtn = document.getElementById("printReportBtn");

let selectedFile = null;
let currentLanguage = localStorage.getItem("leaflens_language") || "en";
let latestPrediction = null;

function t(key) {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
}

function localizePlant(plant) {
    return plantNames[plant]?.[currentLanguage] || plant;
}

function localizeDisease(disease) {
    return diseaseNames[disease]?.[currentLanguage] || disease;
}

function updateStaticTranslations() {
    document.documentElement.lang = currentLanguage === "hi" ? "hi" : "en";

    translatableElements.forEach((element) => {
        const key = element.dataset.i18n;
        element.textContent = t(key);
    });

    bilingualElements.forEach((element) => {
        element.textContent = currentLanguage === "hi" ? element.dataset.hi : element.dataset.en;
    });

    if (fileName && !selectedFile) {
        fileName.textContent = t("no_file_selected");
    }

    if (predictBtn && !predictBtn.disabled) {
        predictBtn.textContent = t("predict_disease");
    }

    if (latestPrediction) {
        renderPrediction(latestPrediction);
    }
}

function setLanguage(language) {
    currentLanguage = language;
    localStorage.setItem("leaflens_language", language);
    updateStaticTranslations();
}

langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setLanguage(currentLanguage === "en" ? "hi" : "en");
    });
});

function buildSummary(plant, disease, confidence) {
    if (disease.toLowerCase().includes("healthy")) {
        return t("summary_healthy")
            .replace("{plant}", localizePlant(plant).toLowerCase())
            .replace("{confidence}", confidence);
    }

    return t("summary_disease")
        .replace("{plant}", localizePlant(plant).toLowerCase())
        .replace("{disease}", localizeDisease(disease))
        .replace("{confidence}", confidence);
}

function applyResultTheme(status) {
    if (!confidenceOrb || !resultBadge) {
        return;
    }

    confidenceOrb.classList.remove("theme-healthy", "theme-warning", "theme-critical");
    resultBadge.classList.remove("theme-healthy", "theme-warning", "theme-critical");

    if (status === "healthy") {
        confidenceOrb.classList.add("theme-healthy");
        resultBadge.classList.add("theme-healthy");
        resultBadge.textContent = t("result_badge_healthy");
        return;
    }

    if (status === "warning") {
        confidenceOrb.classList.add("theme-warning");
        resultBadge.classList.add("theme-warning");
        resultBadge.textContent = t("result_badge_warning");
        return;
    }

    confidenceOrb.classList.add("theme-critical");
    resultBadge.classList.add("theme-critical");
    resultBadge.textContent = t("result_badge_critical");
}

function renderPrediction(data) {
    if (!resultClass) {
        return;
    }

    const confidence = Number(data.confidence).toFixed(2);
    resultClass.textContent = localizeDisease(data.predicted_class);
    resultConfidence.textContent = `${confidence}%`;
    confidenceValue.textContent = `${Math.round(Number(confidence))}%`;
    resultModel.textContent = data.model_name;
    resultPlant.textContent = localizePlant(data.plant_name);
    resultRawClass.textContent = data.raw_class;
    plantName.textContent = `${localizePlant(data.plant_name)} ${t("plant_leaf_suffix")}`;
    resultSummary.textContent = buildSummary(data.plant_name, data.predicted_class, confidence);
    applyResultTheme(data.status || "warning");

    if (symptomsList) {
        symptomsList.innerHTML = "";
        (data.symptoms || []).forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            symptomsList.appendChild(li);
        });
    }

    if (cureList) {
        cureList.innerHTML = "";
        (data.cure || []).forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            cureList.appendChild(li);
        });
    }
}

function showPreview(file) {
    selectedFile = file;
    fileName.textContent = file.name;

    const reader = new FileReader();
    reader.onload = (event) => {
        previewImage.src = event.target.result;
        previewImage.classList.remove("hidden");
        previewPlaceholder.classList.add("hidden");
    };
    reader.readAsDataURL(file);

    hideError();
}

function resetStates() {
    if (resultCard) {
        resultCard.classList.add("hidden");
    }
    if (errorCard) {
        errorCard.classList.add("hidden");
    }
}

function showLoading() {
    resetStates();
    if (resultPlaceholder) {
        resultPlaceholder.classList.add("hidden");
    }
    if (loadingState) {
        loadingState.classList.remove("hidden");
    }
    if (predictBtn) {
        predictBtn.disabled = true;
        predictBtn.textContent = t("analyzing_state_button");
    }
}

function hideLoading() {
    if (loadingState) {
        loadingState.classList.add("hidden");
    }
    if (predictBtn) {
        predictBtn.disabled = false;
        predictBtn.textContent = t("predict_disease");
    }
}

function showError(message) {
    hideLoading();
    if (resultCard) {
        resultCard.classList.add("hidden");
    }
    if (resultPlaceholder) {
        resultPlaceholder.classList.add("hidden");
    }
    if (errorMessage) {
        errorMessage.textContent = message;
    }
    if (errorCard) {
        errorCard.classList.remove("hidden");
    }
}

function hideError() {
    if (errorCard) {
        errorCard.classList.add("hidden");
    }
}

if (dropZone && fileInput) {
    dropZone.addEventListener("click", () => fileInput.click());

    dropZone.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropZone.classList.add("dragover");
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("dragover");
    });

    dropZone.addEventListener("drop", (event) => {
        event.preventDefault();
        dropZone.classList.remove("dragover");

        const file = event.dataTransfer.files[0];
        if (file) {
            showPreview(file);
        }
    });

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            showPreview(file);
        }
    });
}

if (predictBtn) {
    predictBtn.addEventListener("click", async () => {
        if (!selectedFile) {
            showError(t("error_choose_leaf"));
            return;
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(selectedFile.type)) {
            showError(t("error_invalid_format"));
            return;
        }

        showLoading();

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("model_name", modelSelect.value);

        try {
            const response = await fetch("/predict", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || t("error_default"));
            }

            latestPrediction = data;
            hideLoading();
            if (resultPlaceholder) {
                resultPlaceholder.classList.add("hidden");
            }
            renderPrediction(data);
            if (resultCard) {
                resultCard.classList.remove("hidden");
            }
        } catch (error) {
            showError(error.message);
        }
    });
}

if (printReportBtn) {
    printReportBtn.addEventListener("click", () => {
        window.print();
    });
}

updateStaticTranslations();
