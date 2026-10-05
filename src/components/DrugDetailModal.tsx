import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ThermometerSnowflake, 
  ShoppingCart, 
  Repeat, 
  FileText, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { Medicine } from '../types/pharmacy';

interface DrugDetailModalProps {
  medicine: Medicine | null;
  onClose: () => void;
  onAddToCart: (medicine: Medicine) => void;
  onOpenGenericFinderWithDrug?: (drugName: string) => void;
}

export const DrugDetailModal: React.FC<DrugDetailModalProps> = ({
  medicine,
  onClose,
  onAddToCart,
  onOpenGenericFinderWithDrug,
}) => {
  if (!medicine) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Clinical Drug Factsheet
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-mono">ID: {medicine.id}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Main Drug Overview Banner */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-full sm:w-40 h-36 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center p-3 shrink-0">
              <img
                src={medicine.image}
                alt={medicine.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-xs">
                {medicine.requiresPrescription ? (
                  <span className="text-rose-700 font-semibold bg-rose-50 border border-rose-200 px-2 py-0.5 rounded text-[11px]">
                    Prescription Required (Rx)
                  </span>
                ) : (
                  <span className="text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                    Over-The-Counter (OTC)
                  </span>
                )}
                <span className="text-slate-500 font-medium">{medicine.categoryLabel}</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 leading-tight">
                {medicine.name}
              </h2>

              <div className="bg-teal-50 border border-teal-200/80 rounded-lg p-2.5">
                <span className="text-[11px] uppercase tracking-wider font-bold text-teal-800 block">
                  Active Salt / Chemical Composition:
                </span>
                <span className="text-xs font-mono font-medium text-teal-950">
                  {medicine.genericName}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
                <span>Mfg: <strong>{medicine.manufacturer}</strong></span>
                <span className="text-slate-300">·</span>
                <span>Pack: {medicine.packSize}</span>
              </div>
            </div>
          </div>

          {/* Generic Substitute Savings Alert if available */}
          {medicine.savingsVsBrand && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Repeat className="w-4 h-4 text-emerald-600" />
                  <span>Licensed Generic Bio-Equivalent Available</span>
                </div>
                <p className="text-xs text-emerald-700 mt-1">
                  Save {medicine.savingsVsBrand}% on this exact chemical formulation with verified bio-equivalence.
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  if (onOpenGenericFinderWithDrug) {
                    onOpenGenericFinderWithDrug(medicine.name);
                  }
                }}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs whitespace-nowrap cursor-pointer transition-colors"
              >
                View Generic Equivalent
              </button>
            </div>
          )}

          {/* Prescribed Uses & Indications */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Therapeutic Indications &amp; Clinical Uses</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {medicine.uses.map((use, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-slate-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>{use}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dosage & Administration Instructions */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>Directions for Proper Administration</span>
            </h3>
            <p className="text-xs text-slate-700 bg-slate-50 border border-slate-200 p-3 rounded-lg leading-relaxed">
              {medicine.dosageInstructions}
            </p>
          </div>

          {/* Warnings & Contraindications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Possible Side Effects</span>
              </h3>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4 bg-amber-50/40 border border-amber-200/60 p-3 rounded-lg">
                {medicine.sideEffects.map((side, idx) => (
                  <li key={idx}>{side}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Safety Warnings &amp; Contraindications</span>
              </h3>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4 bg-rose-50/40 border border-rose-200/60 p-3 rounded-lg">
                {medicine.contraindications.map((contra, idx) => (
                  <li key={idx}>{contra}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Storage specifications */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
            {medicine.coldStorageRequired ? (
              <ThermometerSnowflake className="w-5 h-5 text-cyan-600 shrink-0" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-slate-400 shrink-0" />
            )}
            <div>
              <span className="font-semibold text-slate-800 block">Pharmacopoeia Storage Requirement:</span>
              <span>{medicine.storageConditions}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-slate-500">Retail Price (Inclusive of all taxes)</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono text-slate-900">${medicine.price.toFixed(2)}</span>
              <span className="text-xs font-mono text-slate-400 line-through">${medicine.mrp.toFixed(2)}</span>
              <span className="text-xs font-bold text-emerald-600">{medicine.discountPercent}% OFF</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onAddToCart(medicine);
                onClose();
              }}
              disabled={!medicine.inStock}
              className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Medicine Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
