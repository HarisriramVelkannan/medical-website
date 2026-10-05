import React, { useState } from 'react';
import { 
  X, 
  Activity, 
  AlertOctagon, 
  CheckCircle2, 
  Sparkles, 
  HeartHandshake, 
  ShieldAlert, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { SYMPTOM_GUIDE_DATA } from '../data/symptomData';
import { MEDICINES_DATA } from '../data/medicinesData';
import { SymptomTopic, Medicine } from '../types/pharmacy';

interface SymptomGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (medicine: Medicine) => void;
  onOpenPharmacistChat: () => void;
}

export const SymptomGuideModal: React.FC<SymptomGuideModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onOpenPharmacistChat,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<SymptomTopic>(SYMPTOM_GUIDE_DATA[0]);

  if (!isOpen) return null;

  const handleAddOtcToCart = (otcName: string) => {
    // Find closest medicine in catalog
    const matched = MEDICINES_DATA.find((m) => 
      otcName.toLowerCase().includes(m.name.toLowerCase().split(' ')[0]) ||
      m.genericName.toLowerCase().includes(otcName.toLowerCase().split(' ')[0])
    );

    if (matched) {
      onAddToCart(matched);
    }
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
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">OTC Symptom Guide &amp; Clinical Red Flags</h2>
              <p className="text-xs text-slate-500">Pharmacist-curated advice for common minor conditions</p>
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
          {/* Symptom selector tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SYMPTOM_GUIDE_DATA.map((topic) => {
              const isSelected = selectedTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50 text-teal-900 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  {topic.symptom}
                </button>
              );
            })}
          </div>

          {/* Active Symptom Section */}
          <div className="space-y-5">
            {/* Overview */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h3 className="text-base font-bold text-slate-900">{selectedTopic.symptom}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {selectedTopic.description}
              </p>
            </div>

            {/* Red Flag Warnings - Clinical Emergency Indicators */}
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
                <span>When to Seek Emergency Doctor Care (Red Flags)</span>
              </div>
              <ul className="text-xs text-rose-900 space-y-1 list-disc pl-5">
                {selectedTopic.redFlagWarnings.map((flag, idx) => (
                  <li key={idx} className="leading-snug">{flag}</li>
                ))}
              </ul>
            </div>

            {/* Recommended OTC Medicines */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>First-Line Over-The-Counter Remedies</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedTopic.recommendedOtcs.map((otc, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{otc.name}</div>
                      <div className="text-[11px] text-teal-800 mt-0.5">{otc.purpose}</div>
                      <p className="text-[11px] text-slate-500 mt-1">{otc.dosageAdvice}</p>
                    </div>

                    <button
                      onClick={() => handleAddOtcToCart(otc.name)}
                      className="mt-2 text-xs font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 py-1.5 px-3 rounded-lg text-center transition-colors cursor-pointer"
                    >
                      Add Recommended OTC to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Lifestyle and Non-pharmacological Advice */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Self-Care &amp; Lifestyle Management:
              </h4>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-5">
                {selectedTopic.lifestyleAdvice.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              onOpenPharmacistChat();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:underline cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
            <span>Need personalized advice? Speak to on-duty Pharmacist</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
