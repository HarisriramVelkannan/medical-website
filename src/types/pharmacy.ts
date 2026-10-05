export type MedicineCategory = 
  | 'all'
  | 'prescription'
  | 'otc-pain'
  | 'chronic-care'
  | 'first-aid'
  | 'baby-mom'
  | 'devices'
  | 'vitamins';

export interface Medicine {
  id: string;
  name: string;
  genericName: string; // Active salt/composition
  category: MedicineCategory;
  categoryLabel: string;
  dosageForm: 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Ointment' | 'Inhaler' | 'Device' | 'Drops';
  strength: string; // e.g. "500 mg", "100 ml", "10 mcg"
  packSize: string; // e.g. "Strip of 10 tablets", "Bottle of 100ml"
  price: number;
  mrp: number; // Maximum retail price before discount
  discountPercent: number;
  requiresPrescription: boolean;
  manufacturer: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  coldStorageRequired?: boolean;
  image: string;
  description: string;
  uses: string[];
  dosageInstructions: string;
  sideEffects: string[];
  contraindications: string[];
  storageConditions: string;
  genericAlternativeId?: string; // Links to equivalent cheaper salt
  savingsVsBrand?: number;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface PrescriptionItem {
  medicineName: string;
  dosage: string;
  duration: string;
  matchedMedicineId?: string;
}

export interface Prescription {
  id: string;
  patientName: string;
  doctorName: string;
  doctorRegNo: string;
  hospitalClinic: string;
  date: string;
  diagnosis: string;
  extractedItems: PrescriptionItem[];
  verifiedStatus: 'Verified' | 'Pending Review' | 'Rejected';
  imageUri?: string;
}

export interface GenericAlternative {
  brandName: string;
  brandPrice: number;
  brandCompany: string;
  saltComposition: string;
  genericSubstitute: {
    id: string;
    name: string;
    price: number;
    company: string;
    savingsPercent: number;
  };
  therapeuticUse: string;
  bioEquivalentApproved: boolean;
}

export interface SymptomTopic {
  id: string;
  symptom: string;
  description: string;
  recommendedOtcs: {
    name: string;
    purpose: string;
    dosageAdvice: string;
  }[];
  redFlagWarnings: string[];
  lifestyleAdvice: string[];
}

export interface RefillReminder {
  id: string;
  medicineName: string;
  dailyDosageTimes: ('Morning' | 'Afternoon' | 'Evening' | 'Bedtime')[];
  pillsRemaining: number;
  pillsPerDay: number;
  refillThresholdDays: number;
  autoRefillEnabled: boolean;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  deliveryType: 'instant-sos' | 'standard' | 'pickup';
  address: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    pincode: string;
  };
  prescriptionAttached?: boolean;
  paymentMethod: 'cod' | 'card' | 'upi';
  status: 'Received' | 'Rx Verified by Pharmacist' | 'Packing in Cold-Chain' | 'Out for Delivery' | 'Delivered';
  estimatedDeliveryTime: string;
}
