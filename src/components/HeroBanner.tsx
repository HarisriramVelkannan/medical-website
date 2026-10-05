import React from 'react';
import { 
  FileUp, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ThermometerSnowflake, 
  Repeat, 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight,
  Stethoscope,
  HeartPulse
} from 'lucide-react';

interface HeroBannerProps {
  onOpenPrescription: () => void;
  onOpenGenericFinder: () => void;
  onOpenPharmacistChat: () => void;
  onOpenSymptomGuide: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenPrescription,
  onOpenGenericFinder,
  onOpenPharmacistChat,
  onOpenSymptomGuide,
}) => {
  return (
    <div className="bg-gradient-to-b from-teal-900 via-teal-950 to-slate-900 text-white relative overflow-hidden">
      {/* Subtle decorative background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Value Proposition */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/60 border border-teal-500/30 text-teal-200 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Licensed Government Pharmacy Reg. #DL-2026-MED-8492</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Certified Medicines, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-200">
                Delivered in 30-45 Mins.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Order authentic prescription drugs, chronic care medications, and healthcare supplies. Verified by licensed pharmacists with strict cold-chain compliance.
            </p>

            {/* Trust guarantees list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Genuine Salts</span>
              </div>
              <div className="flex items-center gap-2">
                <ThermometerSnowflake className="w-4 h-4 text-cyan-300 shrink-0" />
                <span>Cold-Chain 2°C–8°C</span>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Pharmacist Verified</span>
              </div>
            </div>

            {/* Main Action Triggers */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onOpenPrescription}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-md hover:shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <FileUp className="w-4 h-4" />
                <span>Upload Doctor's Prescription</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onOpenPharmacistChat}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Emergency 24/7 SOS Delivery</span>
              </button>
            </div>
          </div>

          {/* Interactive Fast Action Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Card 1: Prescription Upload */}
            <div 
              onClick={onOpenPrescription}
              className="p-4 rounded-xl bg-slate-800/60 border border-teal-500/20 hover:border-teal-400/50 hover:bg-slate-800 transition-all cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-300 mb-3 group-hover:scale-105 transition-transform">
                <FileUp className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                Order via Prescription
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-normal">
                Upload your Rx image. Pharmacist extracts medicines &amp; prepares your package in 10 mins.
              </p>
              <div className="flex items-center gap-1 text-[11px] text-teal-400 font-semibold mt-3">
                <span>Upload &amp; Scan</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Generic Alternatives */}
            <div 
              onClick={onOpenGenericFinder}
              className="p-4 rounded-xl bg-slate-800/60 border border-teal-500/20 hover:border-teal-400/50 hover:bg-slate-800 transition-all cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 mb-3 group-hover:scale-105 transition-transform">
                <Repeat className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                Generic Salt Finder
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-normal">
                Find bio-equivalent generic medicines with identical active ingredients and save up to 70%.
              </p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold mt-3">
                <span>Compare &amp; Save</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Cold Chain Assurance */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-teal-500/20">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300 mb-3">
                <ThermometerSnowflake className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-white">
                Insulin &amp; Cold Chain
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-normal">
                Insulins, vaccines, and biologics dispatched in calibrated temperature-controlled ice flasks.
              </p>
              <span className="inline-block mt-3 text-[11px] text-cyan-400 font-medium">
                2°C to 8°C Monitored
              </span>
            </div>

            {/* Card 4: Symptom to OTC Guide */}
            <div 
              onClick={onOpenSymptomGuide}
              className="p-4 rounded-xl bg-slate-800/60 border border-teal-500/20 hover:border-teal-400/50 hover:bg-slate-800 transition-all cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300 mb-3 group-hover:scale-105 transition-transform">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                OTC Symptom Guide
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-normal">
                Evidence-based OTC guidance for fever, acidity, allergies, and when to consult a doctor.
              </p>
              <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold mt-3">
                <span>Explore Guide</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
