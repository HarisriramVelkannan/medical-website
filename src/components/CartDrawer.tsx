import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  ThermometerSnowflake, 
  ArrowRight, 
  Tag, 
  Truck
} from 'lucide-react';
import { CartItem, Prescription } from '../types/pharmacy';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  attachedPrescription: Prescription | null;
  onUpdateQuantity: (medicineId: string, quantity: number) => void;
  onRemoveItem: (medicineId: string) => void;
  onOpenPrescriptionModal: () => void;
  onProceedToCheckout: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  attachedPrescription,
  onUpdateQuantity,
  onRemoveItem,
  onOpenPrescriptionModal,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0);
  const mrpTotal = cart.reduce((sum, item) => sum + item.medicine.mrp * item.quantity, 0);
  const totalSavings = mrpTotal - subtotal;

  // Check if prescription required
  const hasRxItem = cart.some((item) => item.medicine.requiresPrescription);
  const hasColdChain = cart.some((item) => item.medicine.coldStorageRequired);

  // Promo discount calculation
  let promoDiscount = 0;
  if (appliedPromo === 'HEALTH20') {
    promoDiscount = subtotal * 0.20;
  } else if (appliedPromo === 'FIRSTMED') {
    promoDiscount = Math.min(subtotal, 5.00);
  }

  const freeDeliveryThreshold = 25.00;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const deliveryFee = isFreeDelivery ? 0 : 2.50;
  const finalTotal = Math.max(0, subtotal - promoDiscount + deliveryFee);

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'HEALTH20' || code === 'FIRSTMED') {
      onApplyPromo(code);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "HEALTH20" or "FIRSTMED"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-teal-700" />
            <h2 className="text-base font-bold text-slate-900">Your Medicine Cart</h2>
            <span className="text-xs font-semibold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
              {totalItemsCount} items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-teal-50/80 px-5 py-2.5 border-b border-teal-100 text-xs">
          <div className="flex items-center justify-between text-teal-900 font-semibold mb-1">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-teal-700" />
              {isFreeDelivery ? 'Free Delivery Unlocked!' : `Add $${(freeDeliveryThreshold - subtotal).toFixed(2)} more for FREE Delivery`}
            </span>
            <span>${subtotal.toFixed(2)} / ${freeDeliveryThreshold.toFixed(2)}</span>
          </div>
          <div className="w-full bg-teal-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-teal-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Prescription Verification Status Banner */}
        {hasRxItem && (
          <div className={`px-5 py-3 border-b text-xs flex items-center justify-between gap-3 ${
            attachedPrescription 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-start gap-2">
              {attachedPrescription ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-bold">
                  {attachedPrescription ? 'Doctor’s Rx Attached' : 'Prescription Required (Schedule H)'}
                </span>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {attachedPrescription 
                    ? `Verified for ${attachedPrescription.patientName.split(' ')[0]}`
                    : '1+ items require prescription validation'}
                </p>
              </div>
            </div>

            {!attachedPrescription && (
              <button
                onClick={onOpenPrescriptionModal}
                className="px-2.5 py-1 text-[11px] font-bold text-amber-900 bg-amber-200 hover:bg-amber-300 rounded shadow-2xs whitespace-nowrap cursor-pointer transition-colors"
              >
                Upload Rx
              </button>
            )}
          </div>
        )}

        {/* Cold chain packaging alert */}
        {hasColdChain && (
          <div className="px-5 py-2 bg-cyan-50 border-b border-cyan-200 text-[11px] text-cyan-900 flex items-center gap-2">
            <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
            <span>Includes Cold-Chain item (Insulin/Biological). Packaged in insulated thermal flask with ice packs.</span>
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <ShoppingCart className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Your cart is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Search or browse through medicines, chronic care supplies, and diagnostic essentials.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.medicine.id}
                className="bg-white border border-slate-200 rounded-xl p-3.5 flex gap-3 shadow-2xs"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center p-1 shrink-0">
                  <img
                    src={item.medicine.image}
                    alt={item.medicine.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.medicine.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.medicine.id)}
                        className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[10px] text-teal-800 font-mono line-clamp-1">
                      {item.medicine.genericName}
                    </div>

                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {item.medicine.strength} · {item.medicine.packSize}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-bold font-mono text-slate-900">
                        ${(item.medicine.price * item.quantity).toFixed(2)}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 line-through">
                        ${(item.medicine.mrp * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center border border-slate-200 rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(item.medicine.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-l cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-mono font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.medicine.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-r cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="border-t border-slate-200 bg-slate-50 p-5 space-y-3">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromoCode} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError('');
                    }}
                    placeholder="Promo: HEALTH20 or FIRSTMED"
                    className="w-full text-xs pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-900 cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {appliedPromo && (
                <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Promo "{appliedPromo}" applied successfully!
                </div>
              )}
              {promoError && (
                <div className="text-[11px] text-rose-600 font-medium">
                  {promoError}
                </div>
              )}
            </form>

            {/* Bill Summary */}
            <div className="space-y-1 text-xs text-slate-600 border-t border-slate-200/80 pt-2 font-mono">
              <div className="flex justify-between">
                <span>Total MRP</span>
                <span>${mrpTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Pharmacy MRP Discount</span>
                <span>-${totalSavings.toFixed(2)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({appliedPromo})</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>{isFreeDelivery ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200 font-sans">
                <span>To Pay</span>
                <span className="font-mono text-base text-teal-800">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>Proceed to Pharmacy Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
