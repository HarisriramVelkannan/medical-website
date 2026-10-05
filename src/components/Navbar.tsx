import React, { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  FileText, 
  Repeat, 
  Activity, 
  ShoppingCart, 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Sparkles,
  X
} from 'lucide-react';
import { CartItem } from '../types/pharmacy';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenPrescription: () => void;
  onOpenGenericFinder: () => void;
  onOpenSymptomGuide: () => void;
  onOpenRefillTracker: () => void;
  onOpenStoreInfo: () => void;
  onOpenPharmacistChat: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenPrescription,
  onOpenGenericFinder,
  onOpenSymptomGuide,
  onOpenRefillTracker,
  onOpenStoreInfo,
  onOpenPharmacistChat,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}) => {
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      {/* Top clinical compliance & emergency bar */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Store Open 24/7
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              State License: #DL-2026-MED-8492 · Pharmacist In-Charge: Dr. Nathan Reed, Pharm.D
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <button 
              onClick={onOpenPharmacistChat}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium text-emerald-300">24/7 SOS Helpline: 1800-419-MEDS</span>
            </button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={onOpenStoreInfo}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Store Location & Hours</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shadow-teal-600/20">
              <div className="relative">
                <PlusCircle className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">AuraCare</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-teal-700 bg-teal-50 border border-teal-200/60 px-1.5 py-0.5 rounded">Pharmacy</span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Genuine Medicines · Rx Verification · 30m SOS Delivery</p>
            </div>
          </div>

          {/* Instant Search Bar */}
          <div className="flex-1 max-w-xl mx-2 relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by brand (Lipitor, Augmentin), salt composition (Metformin, Paracetamol), or symptom..."
                className="w-full pl-9 pr-9 py-2 text-sm bg-slate-50 border border-slate-300/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 p-0.5"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prescription Upload Button */}
            <button
              onClick={onOpenPrescription}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-300 rounded-lg transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-teal-700" />
              <span className="hidden md:inline">Upload Rx</span>
            </button>

            {/* Generic Salt Finder */}
            <button
              onClick={onOpenGenericFinder}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <Repeat className="w-3.5 h-3.5 text-teal-600" />
              <span>Generic Alternatives</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs transition-all cursor-pointer"
              aria-label="View shopping cart"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-amber-400 text-slate-900 font-bold px-1.5 py-0.2 rounded-full text-[11px] min-w-[18px] text-center">
                  {totalCartCount}
                </span>
              )}
              {totalCartCount > 0 && (
                <span className="hidden xl:inline border-l border-teal-600 pl-1.5 font-mono text-[11px]">
                  ${cartSubtotal.toFixed(2)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Secondary quick navigation & tools bar */}
        <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => onSelectCategory('all')}
              className={`whitespace-nowrap transition-colors ${
                selectedCategory === 'all' 
                  ? 'text-teal-700 font-semibold border-b-2 border-teal-600 pb-0.5' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Pharmacy Store
            </button>
            <button
              onClick={() => onSelectCategory('prescription')}
              className={`whitespace-nowrap transition-colors ${
                selectedCategory === 'prescription' 
                  ? 'text-teal-700 font-semibold border-b-2 border-teal-600 pb-0.5' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Prescription (Rx)
            </button>
            <button
              onClick={() => onSelectCategory('chronic-care')}
              className={`whitespace-nowrap transition-colors ${
                selectedCategory === 'chronic-care' 
                  ? 'text-teal-700 font-semibold border-b-2 border-teal-600 pb-0.5' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Diabetes &amp; Cardiac Care
            </button>
            <button
              onClick={() => onSelectCategory('otc-pain')}
              className={`whitespace-nowrap transition-colors ${
                selectedCategory === 'otc-pain' 
                  ? 'text-teal-700 font-semibold border-b-2 border-teal-600 pb-0.5' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pain, Acidity &amp; Cold (OTC)
            </button>
            <button
              onClick={() => onSelectCategory('devices')}
              className={`whitespace-nowrap transition-colors ${
                selectedCategory === 'devices' 
                  ? 'text-teal-700 font-semibold border-b-2 border-teal-600 pb-0.5' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Diagnostic Devices
            </button>
            <button
              onClick={() => onSelectCategory('first-aid')}
              className={`whitespace-nowrap transition-colors ${
                selectedCategory === 'first-aid' 
                  ? 'text-teal-700 font-semibold border-b-2 border-teal-600 pb-0.5' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              First Aid &amp; Surgical
            </button>
            <button
              onClick={() => onSelectCategory('vitamins')}
              className={`whitespace-nowrap transition-colors ${
                selectedCategory === 'vitamins' 
                  ? 'text-teal-700 font-semibold border-b-2 border-teal-600 pb-0.5' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vitamins &amp; Immunity
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3 text-slate-500 pl-4 border-l border-slate-200">
            <button
              onClick={onOpenSymptomGuide}
              className="flex items-center gap-1 text-slate-700 hover:text-teal-700 font-medium transition-colors cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              <span>Symptom Guide</span>
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={onOpenRefillTracker}
              className="flex items-center gap-1 text-slate-700 hover:text-teal-700 font-medium transition-colors cursor-pointer"
            >
              <Repeat className="w-3.5 h-3.5 text-emerald-600" />
              <span>Refill Tracker</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
