/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { DrugDetailModal } from './components/DrugDetailModal';
import { PrescriptionUploadModal } from './components/PrescriptionUploadModal';
import { GenericFinderModal } from './components/GenericFinderModal';
import { SymptomGuideModal } from './components/SymptomGuideModal';
import { RefillTrackerModal } from './components/RefillTrackerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { StoreInfoSection } from './components/StoreInfoSection';
import { PharmacistConsultModal } from './components/PharmacistConsultModal';
import { Footer } from './components/Footer';

import { MEDICINES_DATA } from './data/medicinesData';
import { Medicine, MedicineCategory, CartItem, Prescription, Order } from './types/pharmacy';
import { CheckCircle2, AlertCircle, ShoppingCart } from 'lucide-react';

export default function App() {
  // Inventory state
  const [medicines] = useState<Medicine[]>(MEDICINES_DATA);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      medicine: MEDICINES_DATA.find((m) => m.id === 'med-7') || MEDICINES_DATA[0], // Dolo 650
      quantity: 1,
    }
  ]);
  const [attachedPrescription, setAttachedPrescription] = useState<Prescription | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string>('HEALTH20');

  // Navigation & Filtering state
  const [selectedCategory, setSelectedCategory] = useState<MedicineCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isGenericFinderOpen, setIsGenericFinderOpen] = useState(false);
  const [genericInitialDrug, setGenericInitialDrug] = useState('');
  const [isSymptomGuideOpen, setIsSymptomGuideOpen] = useState(false);
  const [isRefillTrackerOpen, setIsRefillTrackerOpen] = useState(false);
  const [isPharmacistChatOpen, setIsPharmacistChatOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [activeDetailMedicine, setActiveDetailMedicine] = useState<Medicine | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Quick toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart Handlers
  const handleAddToCart = (medicine: Medicine) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.medicine.id === medicine.id);
      if (existing) {
        return prev.map((item) =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { medicine, quantity: 1 }];
    });
    showToast(`Added ${medicine.name} to cart`);
  };

  const handleUpdateQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(medicineId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.medicine.id === medicineId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (medicineId: string) => {
    setCart((prev) => prev.filter((item) => item.medicine.id !== medicineId));
    showToast('Removed item from cart');
  };

  const handlePrescriptionAttached = (prescription: Prescription) => {
    setAttachedPrescription(prescription);
    showToast(`Prescription by ${prescription.doctorName} verified`);
  };

  const handleAddPrescribedMedicinesToCart = (medicinesToAdd: Medicine[]) => {
    setCart((prev) => {
      let newCart = [...prev];
      medicinesToAdd.forEach((med) => {
        const idx = newCart.findIndex((i) => i.medicine.id === med.id);
        if (idx >= 0) {
          newCart[idx] = { ...newCart[idx], quantity: newCart[idx].quantity + 1 };
        } else {
          newCart.push({ medicine: med, quantity: 1 });
        }
      });
      return newCart;
    });
    setIsCartOpen(true);
    showToast(`${medicinesToAdd.length} prescribed items added to cart`);
  };

  const handleOpenGenericFinderWithDrug = (drugName: string) => {
    setGenericInitialDrug(drugName);
    setIsGenericFinderOpen(true);
  };

  const handleOrderCompleted = (order: Order) => {
    setConfirmedOrder(order);
    setIsCheckoutModalOpen(false);
    setIsCartOpen(false);
    setCart([]); // Clear cart after successful placement
    showToast(`Order #${order.id} confirmed and dispatched!`);
  };

  const scrollToStoreInfo = () => {
    const el = document.getElementById('store-info-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPrescription={() => setIsPrescriptionModalOpen(true)}
        onOpenGenericFinder={() => {
          setGenericInitialDrug('');
          setIsGenericFinderOpen(true);
        }}
        onOpenSymptomGuide={() => setIsSymptomGuideOpen(true)}
        onOpenRefillTracker={() => setIsRefillTrackerOpen(true)}
        onOpenStoreInfo={scrollToStoreInfo}
        onOpenPharmacistChat={() => setIsPharmacistChatOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Hero Banner with Emergency Indicators & Quick Actions */}
      <HeroBanner
        onOpenPrescription={() => setIsPrescriptionModalOpen(true)}
        onOpenGenericFinder={() => {
          setGenericInitialDrug('');
          setIsGenericFinderOpen(true);
        }}
        onOpenPharmacistChat={() => setIsPharmacistChatOpen(true)}
        onOpenSymptomGuide={() => setIsSymptomGuideOpen(true)}
      />

      {/* Product Catalog & Medical Inventory */}
      <main className="flex-1">
        <ProductCatalog
          medicines={medicines}
          cart={cart}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onOpenDrugDetail={(med) => setActiveDetailMedicine(med)}
          onOpenGenericFinderWithDrug={handleOpenGenericFinderWithDrug}
        />

        {/* Physical Store Location & Cold-Chain Credentials */}
        <div id="store-info-section">
          <StoreInfoSection
            onOpenPrescription={() => setIsPrescriptionModalOpen(true)}
            onOpenPharmacistChat={() => setIsPharmacistChatOpen(true)}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenPrescription={() => setIsPrescriptionModalOpen(true)}
        onOpenGenericFinder={() => {
          setGenericInitialDrug('');
          setIsGenericFinderOpen(true);
        }}
        onOpenSymptomGuide={() => setIsSymptomGuideOpen(true)}
        onOpenRefillTracker={() => setIsRefillTrackerOpen(true)}
        onOpenStoreInfo={scrollToStoreInfo}
        onOpenPharmacistChat={() => setIsPharmacistChatOpen(true)}
      />

      {/* Modals & Slide-overs */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        attachedPrescription={attachedPrescription}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutModalOpen(true);
        }}
        appliedPromo={appliedPromo}
        onApplyPromo={(code) => {
          setAppliedPromo(code);
          showToast(`Coupon ${code} applied`);
        }}
      />

      <DrugDetailModal
        medicine={activeDetailMedicine}
        onClose={() => setActiveDetailMedicine(null)}
        onAddToCart={handleAddToCart}
        onOpenGenericFinderWithDrug={handleOpenGenericFinderWithDrug}
      />

      <PrescriptionUploadModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        onPrescriptionAttached={handlePrescriptionAttached}
        onAddPrescribedMedicinesToCart={handleAddPrescribedMedicinesToCart}
      />

      <GenericFinderModal
        isOpen={isGenericFinderOpen}
        onClose={() => setIsGenericFinderOpen(false)}
        initialSearchDrug={genericInitialDrug}
        onAddToCart={handleAddToCart}
      />

      <SymptomGuideModal
        isOpen={isSymptomGuideOpen}
        onClose={() => setIsSymptomGuideOpen(false)}
        onAddToCart={handleAddToCart}
        onOpenPharmacistChat={() => setIsPharmacistChatOpen(true)}
      />

      <RefillTrackerModal
        isOpen={isRefillTrackerOpen}
        onClose={() => setIsRefillTrackerOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <PharmacistConsultModal
        isOpen={isPharmacistChatOpen}
        onClose={() => setIsPharmacistChatOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cart={cart}
        attachedPrescription={attachedPrescription}
        appliedPromo={appliedPromo}
        onOrderCompleted={handleOrderCompleted}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />
    </div>
  );
}
