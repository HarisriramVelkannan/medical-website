import { SymptomTopic } from '../types/pharmacy';

export const SYMPTOM_GUIDE_DATA: SymptomTopic[] = [
  {
    id: 'fever-bodyache',
    symptom: 'Fever & General Body Aches',
    description: 'Elevated body temperature above 100.4°F (38°C) accompanied by shivering, headache, or malaise.',
    recommendedOtcs: [
      {
        name: 'Paracetamol (Dolo 650mg)',
        purpose: 'Safe first-line antipyretic to lower fever and ease body ache.',
        dosageAdvice: '1 tablet every 6–8 hours with plenty of fluids. Max 3 tablets/day.'
      },
      {
        name: 'Oral Rehydration Salts (ORS) / Electrolytes',
        purpose: 'Prevents dehydration caused by perspiration and fever.',
        dosageAdvice: 'Sip 200–500ml throughout the day.'
      }
    ],
    redFlagWarnings: [
      'Fever exceeding 103°F (39.4°C) or not reducing with medication',
      'Fever lasting longer than 3 consecutive days',
      'Accompanied by stiff neck, confusion, shortness of breath, or petechial rash',
      'Infant under 3 months old with any fever'
    ],
    lifestyleAdvice: [
      'Maintain lukewarm sponge bath (never use ice-cold water)',
      'Wear lightweight, breathable cotton clothing',
      'Adequate sleep and uninterrupted rest'
    ]
  },
  {
    id: 'acidity-gerd',
    symptom: 'Acid Reflux, Heartburn & Indigestion',
    description: 'Burning sensation in the chest or throat, sour regurgitation, and bloating after meals.',
    recommendedOtcs: [
      {
        name: 'Antacid Gel / Chewable Tablets (Magaldrate + Simethicone)',
        purpose: 'Immediate neutralization of gastric acid and bubble reduction.',
        dosageAdvice: 'Take 10ml or 1–2 chewable tabs 30 mins after meals.'
      },
      {
        name: 'Pantoprazole + Domperidone (Pan-D)',
        purpose: 'Suppresses stomach acid production and accelerates gastric emptying.',
        dosageAdvice: 'Take 1 capsule 30 minutes before first morning meal.'
      }
    ],
    redFlagWarnings: [
      'Chest pain radiating to left arm, jaw, or shoulder (seek emergency care)',
      'Difficulty or pain swallowing solid food or liquids',
      'Black, tarry stools or vomiting coffee-ground like material',
      'Unexplained significant weight loss'
    ],
    lifestyleAdvice: [
      'Avoid lying down within 2–3 hours of eating dinner',
      'Elevate the head of your bed by 6 inches',
      'Limit spicy, citrus, deep-fried food, caffeine, and alcohol'
    ]
  },
  {
    id: 'seasonal-allergies',
    symptom: 'Sneezing, Runny Nose & Itchy Eyes',
    description: 'Histamine response triggered by pollen, dust mites, or pet dander causing nasal congestion.',
    recommendedOtcs: [
      {
        name: 'Fexofenadine 120mg (Allegra)',
        purpose: 'Non-drowsy second-generation antihistamine.',
        dosageAdvice: '1 tablet daily before meals with plain water.'
      },
      {
        name: 'Saline Isotonic Nasal Spray',
        purpose: 'Flushes out allergens and keeps nasal mucosa moist naturally.',
        dosageAdvice: '2 sprays in each nostril 3–4 times daily as needed.'
      }
    ],
    redFlagWarnings: [
      'Severe wheezing, tight chest, or gasping for breath',
      'Swelling of lips, tongue, or throat (Anaphylaxis - call 911 / 108 immediately)',
      'Thick green or yellow sinus discharge with high fever'
    ],
    lifestyleAdvice: [
      'Keep windows closed on high-pollen windy days',
      'Wash face and hair after returning from outdoors',
      'Use HEPA filters in bedroom'
    ]
  },
  {
    id: 'minor-burns-wounds',
    symptom: 'Minor Cuts, Scrapes & First-Degree Burns',
    description: 'Superficial skin breaches, red stinging skin without open blisters.',
    recommendedOtcs: [
      {
        name: 'Betadine 10% Ointment (Povidone-Iodine)',
        purpose: 'Kills pathogens on superficial cuts and scrapes.',
        dosageAdvice: 'Apply clean layer and cover with sterile breathable bandage.'
      },
      {
        name: 'Silverex Ionic Burn Gel',
        purpose: 'Cools thermal burns and speeds epidermal re-epithelialization.',
        dosageAdvice: 'Rinse with cool tap water for 10 mins first, then apply gel gently.'
      }
    ],
    redFlagWarnings: [
      'Deep wounds exposing fat, tendon, or bone needing stitches',
      'Burns on face, hands, groin, or larger than 3 inches in diameter',
      'Spreading redness, heat, red streaks, or foul-smelling pus',
      'Dirty animal bites or rusty metal puncture without tetanus booster within 5 years'
    ],
    lifestyleAdvice: [
      'Never put butter, toothpaste, or ice directly on burns',
      'Do not pop intact fluid blisters',
      'Change dressings daily or whenever wet/soiled'
    ]
  }
];
