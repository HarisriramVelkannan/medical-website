import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Award, 
  ThermometerSnowflake, 
  CheckCircle2,
  Building2,
  Stethoscope
} from 'lucide-react';

interface StoreInfoSectionProps {
  onOpenPrescription: () => void;
  onOpenPharmacistChat: () => void;
}

export const StoreInfoSection: React.FC<StoreInfoSectionProps> = ({
  onOpenPrescription,
  onOpenPharmacistChat,
}) => {
  return (
    <section className="bg-slate-100/80 border-t border-slate-200 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            <Building2 className="w-3.5 h-3.5" />
            <span>Licensed Physical Dispensary</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            AuraCare Central Pharmacy &amp; Cold-Chain Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Serving the community for over 14 years with strict pharmacopoeia protocols, tamper-proof packaging, and zero compromise on active medicine efficacy.
          </p>
        </div>

        {/* 3 Pillars / Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Physical Location & Drive-thru */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Walk-In &amp; Express Drive-Thru</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                450 Healthcare Boulevard, Suite 100-A, Medical District, Springfield, IL 62704
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">Open 24 Hours / 365 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Local Counter: +1 (555) 019-4820</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>dispensary@auracare-pharma.com</span>
              </div>
            </div>
          </div>

          {/* Card 2: Cold-Chain Storage & Quality Audits */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <ThermometerSnowflake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Cold-Chain Storage Assurance</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Hospital-grade pharmaceutical chillers continuously monitored with digital temperature loggers (2°C to 8°C) to preserve insulin, biologics, and peptides.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>IoT 24/7 Temperature Telemetry</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Phase-change gel pack thermal shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tamper-evident security seals</span>
              </div>
            </div>
          </div>

          {/* Card 3: Regulatory Compliance & Pharmacist Credentials */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Accreditations &amp; Registrations</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Fully licensed retail pharmacy and medical store adhering strictly to drug and cosmetic standards and FDA distribution guidelines.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Drug License: <strong>#DL-2026-MED-8492</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Chief Pharmacist: Dr. Nathan Reed, Pharm.D</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Genuine Direct-from-Mfr Sourcing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Dispatch Banner */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Express Medical Response Team Standing By</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Require Emergency Medicine in the next 30-45 Minutes?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              For sudden asthma flare-ups, cardiac medications, post-op antibiotics, or acute pediatric fevers, call our hotline or upload your emergency prescription right away.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenPharmacistChat}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call Hotline: 1800-419-MEDS</span>
            </button>

            <button
              onClick={onOpenPrescription}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors cursor-pointer"
            >
              Upload Emergency Rx
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
