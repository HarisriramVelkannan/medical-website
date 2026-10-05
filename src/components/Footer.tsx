import React from 'react';
import { 
  PlusCircle, 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  Heart, 
  Mail, 
  FileText, 
  Repeat, 
  Activity, 
  Pill
} from 'lucide-react';

interface FooterProps {
  onOpenPrescription: () => void;
  onOpenGenericFinder: () => void;
  onOpenSymptomGuide: () => void;
  onOpenRefillTracker: () => void;
  onOpenStoreInfo: () => void;
  onOpenPharmacistChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrescription,
  onOpenGenericFinder,
  onOpenSymptomGuide,
  onOpenRefillTracker,
  onOpenStoreInfo,
  onOpenPharmacistChat,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <PlusCircle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">AuraCare Pharmacy</span>
            </div>

            <p className="text-slate-400 leading-relaxed pr-6 text-xs">
              State-licensed 24/7 retail and digital dispensary. Dedicated to genuine medication supply, regulated cold-chain transportation, and professional clinical pharmacist consultations.
            </p>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div>Retail Drug License: <strong className="text-slate-200">#DL-2026-MED-8492</strong></div>
              <div>Registered Pharmacist In-Charge: <strong className="text-slate-200">Dr. Nathan Reed, Pharm.D</strong></div>
            </div>
          </div>

          {/* Clinical Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Pharmacy Services</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={onOpenPrescription} className="hover:text-teal-300 transition-colors cursor-pointer text-left">
                  Upload Doctor's Rx
                </button>
              </li>
              <li>
                <button onClick={onOpenGenericFinder} className="hover:text-teal-300 transition-colors cursor-pointer text-left">
                  Generic Salt Substitutes
                </button>
              </li>
              <li>
                <button onClick={onOpenRefillTracker} className="hover:text-teal-300 transition-colors cursor-pointer text-left">
                  Auto-Refill &amp; Pill Reminder
                </button>
              </li>
              <li>
                <button onClick={onOpenSymptomGuide} className="hover:text-teal-300 transition-colors cursor-pointer text-left">
                  OTC Symptom Navigator
                </button>
              </li>
              <li>
                <button onClick={onOpenStoreInfo} className="hover:text-teal-300 transition-colors cursor-pointer text-left">
                  Cold-Chain Protocol
                </button>
              </li>
            </ul>
          </div>

          {/* Medicine Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Top Formulations</h4>
            <ul className="space-y-2 text-slate-400">
              <li><span>Diabetes Care (Metformin, Glimepiride)</span></li>
              <li><span>Cardiac &amp; BP (Telmisartan, Atorvastatin)</span></li>
              <li><span>Antibiotics (Amoxicillin-Clavulanate)</span></li>
              <li><span>Respiratory (Salbutamol Inhalers)</span></li>
              <li><span>Vitamins &amp; Mineral Supplements</span></li>
              <li><span>Diagnostic Glucometers &amp; BP Cuffs</span></li>
            </ul>
          </div>

          {/* Emergency & Contacts */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">24/7 Helpline</h4>
            <div className="space-y-2 text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-white font-mono font-bold">1800-419-MEDS</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>support@auracare-pharma.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>450 Healthcare Blvd, Suite 100-A</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenPharmacistChat}
                  className="w-full py-2 bg-teal-800 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold text-center transition-colors cursor-pointer"
                >
                  Live Pharmacist Chat
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory & Clinical Disclaimer */}
        <div className="border-t border-slate-800/80 pt-6 text-[11px] text-slate-500 space-y-2 leading-relaxed">
          <p>
            <strong>Regulatory Dispensation Notice:</strong> In accordance with statutory pharmacy and pharmaceutical regulations, Schedule H and Schedule H1 prescription medications will only be dispensed upon validation of a valid medical prescription issued by a registered medical practitioner. The information provided on this application is for informational purposes only and does not substitute professional medical advice, clinical diagnosis, or hospital emergency treatment.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 text-slate-400 border-t border-slate-900">
            <div>
              &copy; {new Date().getFullYear()} AuraCare Pharmacy &amp; Medical Supplies Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Licensed Dispensary #DL-2026-MED-8492</span>
              <span>·</span>
              <span>WHO-GMP Sourced</span>
              <span>·</span>
              <span>ISO 9001:2015 Certified</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
