// SymptomsData.js

const SymptomsData = {
    "fever": {
      description: "You may have an infection like the flu or COVID-19. Consider monitoring your temperature and staying hydrated.",
      possibleCauses: [
        "Infections (flu, COVID-19, etc.)",
        "Heat exhaustion",
        "Certain medications"
      ]
    },
    "cough": {
      description: "A persistent cough could indicate a cold, flu, or even allergies. If severe, consult a doctor.",
      possibleCauses: [
        "Cold or flu",
        "Allergies",
        "Asthma"
      ]
    },
    "chest pain": {
      description: "Chest pain could indicate a heart issue or other serious conditions. It's important to seek medical attention if the pain is severe or persistent.",
      possibleCauses: [
        "Heart attack",
        "Angina",
        "Gastroesophageal reflux disease (GERD)",
        "Muscle strain"
      ]
    },
    "headache": {
      description: "Headaches can be caused by stress, dehydration, or migraines. Rest and hydration might help.",
      possibleCauses: [
        "Dehydration",
        "Migraine",
        "Tension headache",
        "Cluster headaches"
      ]
    },
    "shortness of breath": {
      description: "Difficulty breathing could be a sign of a respiratory issue or anxiety. Seek immediate medical help if it's severe.",
      possibleCauses: [
        "Asthma",
        "Pneumonia",
        "Anxiety or panic attacks",
        "Heart problems"
      ]
    },
    "fatigue": {
      description: "Excessive tiredness can be a result of physical or mental strain, or underlying conditions. Rest, hydration, and proper nutrition can help.",
      possibleCauses: [
        "Sleep deprivation",
        "Anemia",
        "Chronic fatigue syndrome",
        "Hypothyroidism"
      ]
    },
    "nausea": {
      description: "Nausea can result from a variety of causes including infections, medications, or food-related issues. If persistent, see a doctor.",
      possibleCauses: [
        "Food poisoning",
        "Stomach flu",
        "Pregnancy",
        "Medication side effects"
      ]
    },
    "dizziness": {
      description: "Dizziness can occur due to dehydration, low blood pressure, or inner ear issues. If frequent or severe, consult a healthcare provider.",
      possibleCauses: [
        "Vertigo",
        "Low blood pressure",
        "Dehydration",
        "Anemia"
      ]
    },
    "stomach pain": {
      description: "Stomach pain can be due to indigestion, a virus, or other digestive issues. If it persists, it may be time to see a doctor.",
      possibleCauses: [
        "Indigestion",
        "Gastroenteritis",
        "Peptic ulcers",
        "Irritable bowel syndrome (IBS)"
      ]
    },
    "sore throat": {
      description: "A sore throat can be a sign of a cold, flu, or an infection. If it persists or is severe, consult a doctor.",
      possibleCauses: [
        "Viral infections (cold, flu)",
        "Bacterial infections (strep throat)",
        "Allergies",
        "Dry air"
      ]
    },
    "runny nose": {
      description: "A runny nose can be a symptom of the common cold, allergies, or a sinus infection.",
      possibleCauses: [
        "Cold or flu",
        "Allergies",
        "Sinusitis",
        "Viral infections"
      ]
    },
    "rash": {
      description: "A rash could be a sign of an allergic reaction, infection, or skin condition. If it's spreading or severe, seek medical advice.",
      possibleCauses: [
        "Allergic reaction",
        "Skin infection",
        "Eczema",
        "Chickenpox"
      ]
    },
    "joint pain": {
      description: "Joint pain can result from injuries, inflammation, or conditions like arthritis. If persistent, consult a doctor.",
      possibleCauses: [
        "Osteoarthritis",
        "Rheumatoid arthritis",
        "Injury or strain",
        "Gout"
      ]
    },
    "swelling": {
      description: "Swelling can be a sign of fluid retention or inflammation, often associated with injury or an underlying condition.",
      possibleCauses: [
        "Injury or trauma",
        "Infection",
        "Heart failure",
        "Kidney disease"
      ]
    },
    "weight loss": {
      description: "Unexplained weight loss can be a sign of a serious underlying condition. If persistent, seek medical attention.",
      possibleCauses: [
        "Hyperthyroidism",
        "Cancer",
        "Diabetes",
        "Malnutrition"
      ]
    },
    "confusion": {
      description: "Confusion could be a sign of a neurological condition, dehydration, or an infection. Seek immediate medical attention if it's sudden.",
      possibleCauses: [
        "Dementia",
        "Dehydration",
        "Stroke",
        "Infections (like UTI)"
      ]
    },
    "severe back pain": {
      description: "Severe back pain can result from an injury, strain, or underlying conditions like herniated discs. Seek professional care if pain persists.",
      possibleCauses: [
        "Herniated disc",
        "Muscle strain",
        "Arthritis",
        "Sciatica"
      ]
    },
    "cold": {
      description: "A common cold is often accompanied by a runny nose, sore throat, and mild fever. Rest and fluids are key to recovery.",
      possibleCauses: [
        "Rhinovirus",
        "Coronavirus (not COVID-19)",
        "Allergies"
      ]
    },
    "insomnia": {
      description: "Difficulty falling asleep or staying asleep can result from stress, anxiety, or sleep disorders. Try to maintain a regular sleep schedule.",
      possibleCauses: [
        "Stress",
        "Anxiety",
        "Depression",
        "Sleep apnea"
      ]
    },
    "bloody urine": {
      description: "Blood in urine can indicate a urinary tract infection (UTI), kidney stones, or other serious conditions. Seek medical help immediately.",
      possibleCauses: [
        "Urinary tract infection (UTI)",
        "Kidney stones",
        "Bladder infection",
        "Trauma or injury"
      ]
    },
    "vomiting": {
      description: "Vomiting can be caused by a variety of issues, such as infection, food poisoning, or other digestive conditions.",
      possibleCauses: [
        "Food poisoning",
        "Gastroenteritis",
        "Pregnancy (morning sickness)",
        "Migraine"
      ]
    },
    "night sweats": {
      description: "Night sweats can be a symptom of various underlying issues, from infections to hormonal imbalances.",
      possibleCauses: [
        "Infections (like tuberculosis)",
        "Menopause",
        "Cancer",
        "Hyperthyroidism"
      ]
    },
    "tingling sensation": {
      description: "A tingling feeling can indicate nerve issues, circulation problems, or vitamin deficiencies.",
      possibleCauses: [
        "Nerve compression",
        "Diabetes",
        "Vitamin B12 deficiency",
        "Multiple sclerosis"
      ]
    },
    "numbness": {
      description: "Numbness can indicate nerve damage, circulation problems, or even stroke. Seek medical advice if it's sudden or persistent.",
      possibleCauses: [
        "Stroke",
        "Nerve compression or damage",
        "Diabetes",
        "Multiple sclerosis"
      ]
    },
    "swollen lymph nodes": {
      description: "Swollen lymph nodes may suggest an infection or, in some cases, more serious conditions.",
      possibleCauses: [
        "Infections (viral, bacterial)",
        "Lymphoma",
        "Leukemia",
        "Autoimmune diseases"
      ]
    },
    "bleeding gums": {
      description: "Bleeding gums can be a sign of gum disease, vitamin deficiencies, or more serious conditions.",
      possibleCauses: [
        "Gum disease (gingivitis)",
        "Vitamin C deficiency",
        "Blood disorders",
        "Medication side effects"
      ]
    },
    "blurry vision": {
      description: "Blurry vision can occur due to various reasons, including eye strain, diabetes, or even neurological conditions.",
      possibleCauses: [
        "Diabetes",
        "Eye strain",
        "Cataracts",
        "Glaucoma"
      ]
    },
    "earache": {
      description: "Earaches may be due to infections, pressure changes, or earwax buildup. If persistent, consult a doctor.",
      possibleCauses: [
        "Ear infections",
        "Sinus infections",
        "Earwax buildup",
        "Barotrauma (pressure changes)"
      ]
    },
    "loss of appetite": {
      description: "A sudden loss of appetite can be due to digestive issues, psychological factors, or underlying medical conditions.",
      possibleCauses: [
        "Gastrointestinal disorders",
        "Depression",
        "Cancer",
        "Liver disease"
      ]
    },
    "frequent urination": {
      description: "Frequent urination can be a sign of various conditions, including diabetes or urinary tract infections.",
      possibleCauses: [
        "Diabetes",
        "Urinary tract infection (UTI)",
        "Prostate problems",
        "Bladder infection"
      ]
    },
    "hives": {
      description: "Hives are raised, itchy welts on the skin and are often caused by an allergic reaction.",
      possibleCauses: [
        "Allergic reactions",
        "Infections",
        "Stress",
        "Medications"
      ]
    },
    "hiccups": {
      description: "Hiccups are involuntary contractions of the diaphragm and can be caused by eating too quickly or other triggers.",
      possibleCauses: [
        "Eating too quickly",
        "Carbonated drinks",
        "Acid reflux",
        "Brain injury (rare)"
      ]
    }
  };
  
  
  export default SymptomsData;
