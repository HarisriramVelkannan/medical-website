import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Stethoscope, 
  ShoppingCart, 
  AlertCircle,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { SAMPLE_PRESCRIPTIONS } from '../data/samplePrescriptions';
import { MEDICINES_DATA } from '../data/medicinesData';
import { Prescription, Medicine } from '../types/pharmacy';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrescriptionAttached: (prescription: Prescription) => void;
  onAddPrescribedMedicinesToCart: (medicines: Medicine[]) => void;
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  isOpen,
  onClose,
  onPrescriptionAttached,
  onAddPrescribedMedicinesToCart,
}) => {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription>(SAMPLE_PRESCRIPTIONS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(true);
  const [customFileName, setCustomFileName] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectSample = (sample: Prescription) => {
    setIsScanning(true);
    setScanComplete(false);
    setSelectedPrescription(sample);
    setCustomFileName(null);

    // Realistic OCR and Pharmacist parsing simulation
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomFileName(file.name);
      setIsScanning(true);
      setScanComplete(false);

      // Match with a standard prescription template for demonstration
      const simulatedPrescription: Prescription = {
        id: `rx-uploaded-${Date.now()}`,
        patientName: 'Verified Patient (You)',
        doctorName: 'Dr. Arthur Sterling, MD, DM',
        doctorRegNo: 'MCI-REG-847291-C',
        hospitalClinic: 'St. Jude Heart & Vascular Institute',
        date: new Date().toISOString().split('T')[0],
        diagnosis: 'Cardiometabolic Risk & Maintenance',
        extractedItems: [
          {
            medicineName: 'Lipitor 20mg',
            dosage: '1 tab OD at night',
            duration: '30 Days',
            matchedMedicineId: 'med-2'
          },
          {
            medicineName: 'Glucophage XR 500mg',
            dosage: '1 tab BD with meals',
            duration: '30 Days',
            matchedMedicineId: 'med-1'
          }
        ],
        verifiedStatus: 'Verified'
      };

      setTimeout(() => {
        setSelectedPrescription(simulatedPrescription);
        setIsScanning(false);
        setScanComplete(true);
      }, 900);
    }
  };

  const handleConfirmAndAddToCart = () => {
    onPrescriptionAttached(selectedPrescription);

    // Find medicines in catalog
    const medicinesToAdd: Medicine[] = [];
    selectedPrescription.extractedItems.forEach((item) => {
      const match = MEDICINES_DATA.find((m) => m.id === item.matchedMedicineId || m.name.toLowerCase().includes(item.medicineName.toLowerCase()));
      if (match) {
        medicinesToAdd.push(match);
      }
    });

    if (medicinesToAdd.length > 0) {
      onAddPrescribedMedicinesToCart(medicinesToAdd);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Upload Doctor's Prescription (Rx)</h2>
              <p className="text-xs text-slate-500">Government compliance verification &amp; 1-click cart fulfillment</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Method 1: Upload or drag drop */}
          <div className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-xl p-6 text-center bg-slate-50/60 hover:bg-teal-50/20 transition-all">
            <input
              type="file"
              id="prescription-file-input"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="prescription-file-input"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-800">
                {customFileName ? customFileName : 'Click to Upload Prescription Slip'}
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Supports JPG, PNG, PDF up to 15MB · Clearly showing Doctor's name, Reg No &amp; Date
              </span>
              <span className="mt-3 px-3 py-1 bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg shadow-2xs">
                Browse Local Files
              </span>
            </label>
          </div>

          {/* Quick Test Samples */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Or Select a Verified Doctor Sample Rx to test:
              </span>
              <span className="text-[11px] text-teal-700 font-medium">Instant Pharmacist OCR</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SAMPLE_PRESCRIPTIONS.map((sample) => {
                const isSelected = selectedPrescription.id === sample.id;
                return (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span className="truncate">{sample.doctorName.split(',')[0]}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{sample.diagnosis}</div>
                    <div className="text-[10px] text-teal-800 font-medium mt-2">
                      {sample.extractedItems.length} Prescribed Medicines
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scanning / Verification animation state */}
          {isScanning ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="text-sm font-bold text-slate-800">Scanning &amp; Verifying Prescription...</div>
              <p className="text-xs text-slate-500">Extracting doctor credentials, drug dosage, and batch matching</p>
            </div>
          ) : scanComplete && selectedPrescription && (
            <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-5 space-y-4">
              {/* Doctor and Clinic Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{selectedPrescription.doctorName}</span>
                    <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-1.5 py-0.2 rounded">
                      {selectedPrescription.doctorRegNo}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">{selectedPrescription.hospitalClinic}</div>
                </div>

                <div className="text-left sm:text-right text-xs">
                  <div className="font-semibold text-slate-800">Patient: {selectedPrescription.patientName}</div>
                  <div className="text-slate-500">Date: {selectedPrescription.date}</div>
                </div>
              </div>

              {/* Diagnosis note */}
              <div className="text-xs text-slate-700 flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                <Stethoscope className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Clinical Diagnosis: </span>
                  <span>{selectedPrescription.diagnosis}</span>
                </div>
              </div>

              {/* Prescribed Items Table */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span>Digitally Extracted Prescribed Medications:</span>
                  <span className="text-emerald-700 flex items-center gap-1 font-semibold text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified by Registered Pharmacist
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedPrescription.extractedItems.map((item, index) => {
                    const matchedMed = MEDICINES_DATA.find((m) => m.id === item.matchedMedicineId);

                    return (
                      <div
                        key={index}
                        className="bg-white border border-slate-200 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{item.medicineName}</span>
                            <span className="text-[10px] text-teal-700 font-mono bg-teal-50 px-1.5 py-0.5 rounded">
                              {item.duration}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>Dosage: {item.dosage}</span>
                          </div>
                        </div>

                        {matchedMed && (
                          <div className="flex items-center gap-3 sm:justify-end">
                            <div className="text-right">
                              <span className="text-xs font-bold font-mono text-slate-900">
                                ${matchedMed.price.toFixed(2)}
                              </span>
                              <span className="block text-[10px] text-emerald-600">In Stock</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Compliance notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-teal-50 border border-teal-200 text-xs text-teal-900">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Legal &amp; Pharmacy Dispensation Protocol: </span>
              In accordance with Drug and Cosmetics regulatory guidelines, Schedule H &amp; H1 medications will be double-checked by our licensed pharmacist prior to physical dispatch.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmAndAddToCart}
            disabled={isScanning || !scanComplete}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add Prescribed Medicines &amp; Attach Rx to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
