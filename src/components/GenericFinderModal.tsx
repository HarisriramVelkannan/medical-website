import React, { useState } from 'react';
import { 
  X, 
  Repeat, 
  Search, 
  CheckCircle2, 
  TrendingDown, 
  ShieldCheck, 
  ShoppingCart, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { GENERIC_ALTERNATIVES_DATA } from '../data/genericData';
import { MEDICINES_DATA } from '../data/medicinesData';
import { GenericAlternative, Medicine } from '../types/pharmacy';

interface GenericFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearchDrug?: string;
  onAddToCart: (medicine: Medicine) => void;
}

export const GenericFinderModal: React.FC<GenericFinderModalProps> = ({
  isOpen,
  onClose,
  initialSearchDrug = '',
  onAddToCart,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchDrug);
  const [selectedGeneric, setSelectedGeneric] = useState<GenericAlternative>(
    GENERIC_ALTERNATIVES_DATA[0]
  );

  if (!isOpen) return null;

  const filteredAlternatives = GENERIC_ALTERNATIVES_DATA.filter((item) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      item.brandName.toLowerCase().includes(q) ||
      item.saltComposition.toLowerCase().includes(q) ||
      item.therapeuticUse.toLowerCase().includes(q) ||
      item.genericSubstitute.name.toLowerCase().includes(q)
    );
  });

  const handleAddGenericToCart = (item: GenericAlternative) => {
    // Check if we have this generic directly in inventory or create an ad-hoc medicine entry
    const existing = MEDICINES_DATA.find(
      (m) => m.name.toLowerCase().includes(item.genericSubstitute.name.toLowerCase()) ||
             m.genericName.toLowerCase().includes(item.saltComposition.toLowerCase())
    );

    const genericMedItem: Medicine = existing || {
      id: item.genericSubstitute.id,
      name: item.genericSubstitute.name,
      genericName: item.saltComposition,
      category: 'chronic-care',
      categoryLabel: 'Bio-Equivalent Generic',
      dosageForm: 'Tablet',
      strength: 'Standard Dosage',
      packSize: 'Standard 1-Month Pack',
      price: item.genericSubstitute.price,
      mrp: item.brandPrice,
      discountPercent: item.genericSubstitute.savingsPercent,
      requiresPrescription: true,
      manufacturer: item.genericSubstitute.company,
      inStock: true,
      stockCount: 80,
      rating: 4.9,
      reviewCount: 420,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
      description: `Bio-equivalent generic equivalent of ${item.brandName} with identical active salt: ${item.saltComposition}.`,
      uses: [item.therapeuticUse],
      dosageInstructions: 'Take as prescribed by your treating physician.',
      sideEffects: ['Similar to innovator brand formulation'],
      contraindications: ['Refer to primary brand factsheet'],
      storageConditions: 'Store below 25°C in a dry place.'
    };

    onAddToCart(genericMedItem);
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
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Repeat className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Generic Salt Substitute &amp; Price Comparison</h2>
              <p className="text-xs text-slate-500">Same active chemical molecular formulation · Save up to 70%</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by expensive brand name (Lipitor, Augmentin, Pan-D) or active salt..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Quick Select Pill List */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Popular Certified Generic Comparisons:
            </span>
            <div className="flex flex-wrap gap-2">
              {filteredAlternatives.map((alt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedGeneric(alt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedGeneric.brandName === alt.brandName
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {alt.brandName.split(' ')[0]} ➔ Save {alt.genericSubstitute.savingsPercent}%
                </button>
              ))}
            </div>
          </div>

          {/* Active Comparison Card */}
          {selectedGeneric && (
            <div className="space-y-4">
              {/* Active Salt Banner */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
                    Identical Active Chemical Formulation:
                  </span>
                  <div className="text-sm font-mono font-bold text-teal-950 mt-0.5">
                    {selectedGeneric.saltComposition}
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-teal-800 font-medium">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Bio-Equivalence Certified</span>
                </div>
              </div>

              {/* Side-by-side Brand vs Generic */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Expensive Innovator Brand */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Innovator / Brand Drug
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{selectedGeneric.brandName}</h3>
                  <div className="text-xs text-slate-500">Marketed by: {selectedGeneric.brandCompany}</div>
                  
                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-xs text-slate-500 block">Retail Price per Pack</span>
                    <span className="text-xl font-bold font-mono text-slate-800">
                      ${selectedGeneric.brandPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Certified Generic Alternative */}
                <div className="bg-emerald-50/70 border-2 border-emerald-500/50 rounded-xl p-5 space-y-3 relative overflow-hidden">
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs">
                    SAVE {selectedGeneric.genericSubstitute.savingsPercent}%
                  </div>

                  <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                    Recommended Bio-Equivalent Generic
                  </div>
                  <h3 className="text-base font-bold text-emerald-950">
                    {selectedGeneric.genericSubstitute.name}
                  </h3>
                  <div className="text-xs text-emerald-700">
                    Manufacturer: {selectedGeneric.genericSubstitute.company}
                  </div>

                  <div className="pt-3 border-t border-emerald-200/80 flex items-end justify-between">
                    <div>
                      <span className="text-xs text-emerald-800 block font-medium">Generic Price per Pack</span>
                      <span className="text-2xl font-extrabold font-mono text-emerald-900">
                        ${selectedGeneric.genericSubstitute.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="text-right text-xs text-emerald-800 font-semibold">
                      You save ${(selectedGeneric.brandPrice - selectedGeneric.genericSubstitute.price).toFixed(2)} / pack
                    </div>
                  </div>
                </div>
              </div>

              {/* Annual Savings Calculator for Chronic Patients */}
              <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4" />
                    Annual Long-Term Savings (12 Months):
                  </span>
                  <p className="text-xs text-slate-300">
                    For ongoing daily maintenance therapy, switching to this generic saves:
                  </p>
                </div>

                <div className="text-center sm:text-right">
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                    ${((selectedGeneric.brandPrice - selectedGeneric.genericSubstitute.price) * 12).toFixed(2)} / year
                  </div>
                  <div className="text-[10px] text-slate-400">100% Bio-Equivalent Absorption</div>
                </div>
              </div>

              {/* Clinical Note */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-start gap-2">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Pharmacist Verification Guarantee:</strong> Generic medicines contain the exact same active pharmaceutical ingredient (API), strength, safety profile, and route of administration as their brand-name counterparts.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => handleAddGenericToCart(selectedGeneric)}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add Generic Formulation to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
