import Fuse from 'fuse.js';

// Define the symptoms data
export const symptomsData = {
  "fever": "You may have an infection like the flu or COVID-19. Consider monitoring your temperature and staying hydrated.",
  "cough": "A persistent cough could indicate a cold, flu, or even allergies. If severe, consult a doctor.",
  "headache": "Headaches can be caused by stress, dehydration, or migraines. Rest and hydration might help.",
  "sore throat": "A sore throat could be due to a viral infection, allergies, or dry air. Drinking warm fluids may provide relief.",
  "fatigue": "Feeling excessively tired can result from stress, lack of sleep, or an underlying illness. Consider getting enough rest.",
  "runny nose": "A runny nose is often caused by a cold, flu, or allergies. Staying hydrated and using nasal sprays might help.",
  "shortness of breath": "This could indicate asthma, anxiety, or a respiratory infection. Seek medical attention if it worsens.",
  "nausea": "Nausea may be linked to food poisoning, pregnancy, or digestive issues. Try eating light and staying hydrated.",
  "body aches": "Body aches are common with viral infections like the flu or overexertion. Rest and mild pain relievers may help.",
  "dizziness": "Dizziness can result from dehydration, low blood pressure, or an inner ear issue. Sitting down and drinking fluids may help.",
  "chest pain": "Chest pain can be a sign of heart problems, acid reflux, or muscle strain. Seek medical attention if severe.",
  "joint pain": "Joint pain might be due to arthritis, overuse, or an injury. Rest and anti-inflammatory medication may help.",
  "stomach pain": "Stomach pain can result from indigestion, ulcers, or infections. Drinking water and avoiding heavy meals might help.",
  "diarrhea": "Diarrhea may be caused by food poisoning, infections, or digestive disorders. Staying hydrated is important.",
  "constipation": "Constipation can occur due to a lack of fiber, dehydration, or inactivity. Eating fiber-rich foods may help.",
  "back pain": "Back pain can be due to poor posture, muscle strain, or a herniated disc. Stretching and rest might provide relief.",
  "skin rash": "A rash may be caused by allergies, infections, or skin conditions like eczema. Consider using a gentle moisturizer."
};

// Convert symptomsData keys into an array for fuzzy searching
const symptomsList = Object.keys(symptomsData);

// Set up Fuse.js options for better symptom matching
export const fuse = new Fuse(symptomsList, {
  includeScore: true,
  threshold: 0.4, // Adjust threshold for more flexible matching
  ignoreLocation: true, // Allow matches anywhere in the string
  minMatchCharLength: 3, // Minimum number of characters to match
});
