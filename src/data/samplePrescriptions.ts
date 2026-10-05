import { Prescription } from '../types/pharmacy';

export const SAMPLE_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-cardio-01',
    patientName: 'Eleanor Vance (Age: 56, Female)',
    doctorName: 'Dr. Arthur Sterling, MD, DM (Cardiology)',
    doctorRegNo: 'MCI-REG-847291-C',
    hospitalClinic: 'St. Jude Heart & Vascular Institute',
    date: '2026-09-28',
    diagnosis: 'Essential Hypertension & Hyperlipidemia',
    extractedItems: [
      {
        medicineName: 'Lipitor 20mg',
        dosage: '1 tab OD at night (bedtime)',
        duration: '30 Days',
        matchedMedicineId: 'med-2'
      },
      {
        medicineName: 'Telma 40mg',
        dosage: '1 tab OD in the morning after breakfast',
        duration: '30 Days',
        matchedMedicineId: 'med-4'
      }
    ],
    verifiedStatus: 'Verified'
  },
  {
    id: 'rx-diabetes-02',
    patientName: 'Robert Langdon (Age: 48, Male)',
    doctorName: 'Dr. Rebecca Vance, MD (Endocrinology)',
    doctorRegNo: 'END-NY-90248-B',
    hospitalClinic: 'Metropolitan Diabetes & Endocrine Care',
    date: '2026-10-02',
    diagnosis: 'Type 2 Diabetes Mellitus with elevated HbA1c (7.8%)',
    extractedItems: [
      {
        medicineName: 'Glucophage XR 500mg',
        dosage: '1 tab BD with meals (Morning & Evening)',
        duration: '30 Days',
        matchedMedicineId: 'med-1'
      },
      {
        medicineName: 'Becozym C Forte Multivitamin with Zinc',
        dosage: '1 tab OD after lunch',
        duration: '30 Days',
        matchedMedicineId: 'med-16'
      }
    ],
    verifiedStatus: 'Verified'
  },
  {
    id: 'rx-resp-03',
    patientName: 'Liam Miller (Age: 32, Male)',
    doctorName: 'Dr. Sophia Ramos, MD (Pulmonology)',
    doctorRegNo: 'PUL-MED-43109',
    hospitalClinic: 'Apex Pulmonary & Allergy Clinic',
    date: '2026-10-04',
    diagnosis: 'Acute Bronchitis & Allergic Rhinitis',
    extractedItems: [
      {
        medicineName: 'Augmentin 625 Duo',
        dosage: '1 tab BD for 5 days after food',
        duration: '5 Days',
        matchedMedicineId: 'med-5'
      },
      {
        medicineName: 'Allegra 120mg Non-Drowsy',
        dosage: '1 tab OD at night for 7 days',
        duration: '7 Days',
        matchedMedicineId: 'med-9'
      },
      {
        medicineName: 'Ventolin Evohaler 100mcg',
        dosage: '2 puffs SOS (when wheezing)',
        duration: 'As needed',
        matchedMedicineId: 'med-6'
      }
    ],
    verifiedStatus: 'Verified'
  }
];
