import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CreditCard, 
  Truck, 
  Building, 
  CheckCircle2, 
  ThermometerSnowflake, 
  FileText,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { CartItem, Prescription, Order } from '../types/pharmacy';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  attachedPrescription: Prescription | null;
  appliedPromo: string;
  onOrderCompleted: (order: Order) => void;
  onOpenPrescriptionModal: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  attachedPrescription,
  appliedPromo,
  onOrderCompleted,
  onOpenPrescriptionModal,
}) => {
  const [fullName, setFullName] = useState('Sarah Jenkins');
  const [phone, setPhone] = useState('+1 (555) 382-9471');
  const [street, setStreet] = useState('742 Evergreen Terrace, Apt 4B');
  const [city, setCity] = useState('Springfield, IL');
  const [pincode, setPincode] = useState('62704');
  const [deliveryType, setDeliveryType] = useState<'instant-sos' | 'standard' | 'pickup'>('instant-sos');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'upi'>('cod');
  const [pharmacistNote, setPharmacistNote] = useState('Please double-pack with ice gel packs for insulin if applicable.');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0);
  const mrpTotal = cart.reduce((sum, item) => sum + item.medicine.mrp * item.quantity, 0);
  
  let promoDiscount = 0;
  if (appliedPromo === 'HEALTH20') {
    promoDiscount = subtotal * 0.20;
  } else if (appliedPromo === 'FIRSTMED') {
    promoDiscount = Math.min(subtotal, 5.00);
  }

  const deliveryFee = deliveryType === 'pickup' ? 0 : deliveryType === 'instant-sos' ? 2.99 : subtotal >= 25 ? 0 : 2.50;
  const grandTotal = Math.max(0, subtotal - promoDiscount + deliveryFee);

  const hasRxItem = cart.some(item => item.medicine.requiresPrescription);
  const hasColdChain = cart.some(item => item.medicine.coldStorageRequired);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `AC-${Math.floor(100000 + Math.random() * 900000)}`;
    const estimatedTime = deliveryType === 'instant-sos' ? '35 minutes' : deliveryType === 'pickup' ? '15 minutes' : '2 hours';

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      subtotal,
      discount: promoDiscount,
      deliveryFee,
      total: grandTotal,
      deliveryType,
      address: {
        fullName,
        phone,
        street,
        city,
        pincode,
      },
      prescriptionAttached: !!attachedPrescription,
      paymentMethod,
      status: 'Received',
      estimatedDeliveryTime: estimatedTime,
    };

    onOrderCompleted(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Secure Pharmacy Order Checkout</h2>
              <p className="text-xs text-slate-500">Licensed dispensing &amp; temperature-controlled dispatch</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
          {/* Rx Verification Check */}
          {hasRxItem && (
            <div className={`p-4 rounded-xl border flex items-start justify-between gap-3 ${
              attachedPrescription 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}>
              <div className="flex items-start gap-2.5">
                <FileText className="w-5 h-5 mt-0.5 shrink-0 text-emerald-700" />
                <div>
                  <span className="text-xs font-bold block">
                    {attachedPrescription ? 'Valid Prescription Attached & Verified' : 'Action Required: Prescription for Schedule H Drugs'}
                  </span>
                  <p className="text-xs mt-0.5">
                    {attachedPrescription 
                      ? `Rx by ${attachedPrescription.doctorName} attached for compliance.`
                      : 'Your cart contains prescription-grade items. You can upload an Rx or request our licensed pharmacist to call you for verification.'}
                  </p>
                </div>
              </div>

              {!attachedPrescription && (
                <button
                  type="button"
                  onClick={onOpenPrescriptionModal}
                  className="px-3 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-900 text-xs font-bold rounded-lg cursor-pointer transition-colors shrink-0"
                >
                  Upload Rx Now
                </button>
              )}
            </div>
          )}

          {/* Delivery Option Selection */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              1. Choose Delivery Method:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label 
                className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                  deliveryType === 'instant-sos'
                    ? 'border-teal-600 bg-teal-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryType"
                  value="instant-sos"
                  checked={deliveryType === 'instant-sos'}
                  onChange={() => setDeliveryType('instant-sos')}
                  className="sr-only"
                />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Instant SOS Delivery</span>
                    <Truck className="w-4 h-4 text-teal-600" />
                  </div>
                  <p className="text-[11px] text-teal-800 font-semibold mt-1">30–45 Mins</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Priority express dispatch for acute medicines</p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-800 mt-3 pt-2 border-t border-slate-200">
                  +$2.99
                </span>
              </label>

              <label 
                className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                  deliveryType === 'standard'
                    ? 'border-teal-600 bg-teal-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryType"
                  value="standard"
                  checked={deliveryType === 'standard'}
                  onChange={() => setDeliveryType('standard')}
                  className="sr-only"
                />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Standard Same-Day</span>
                    <Clock className="w-4 h-4 text-slate-500" />
                  </div>
                  <p className="text-[11px] text-slate-700 font-semibold mt-1">2–3 Hours</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Free for orders over $25</p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-800 mt-3 pt-2 border-t border-slate-200">
                  {subtotal >= 25 ? 'FREE' : '$2.50'}
                </span>
              </label>

              <label 
                className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                  deliveryType === 'pickup'
                    ? 'border-teal-600 bg-teal-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryType"
                  value="pickup"
                  checked={deliveryType === 'pickup'}
                  onChange={() => setDeliveryType('pickup')}
                  className="sr-only"
                />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Store Pickup</span>
                    <Building className="w-4 h-4 text-slate-500" />
                  </div>
                  <p className="text-[11px] text-slate-700 font-semibold mt-1">Ready in 15 mins</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Collect at AuraCare Central Counter</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 mt-3 pt-2 border-t border-slate-200">
                  FREE
                </span>
              </label>
            </div>
          </div>

          {/* Delivery Address Details */}
          {deliveryType !== 'pickup' && (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                2. Patient &amp; Delivery Destination:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Patient Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Emergency Mobile / WhatsApp</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Street Address &amp; Apartment / Suite</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">City, State</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Zip / Postal Code</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              3. Payment Selection:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label 
                className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-teal-600 bg-teal-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="sr-only"
                />
                <Truck className="w-4 h-4 text-teal-600 shrink-0" />
                <div className="text-xs font-bold text-slate-800">Cash on Delivery (COD)</div>
              </label>

              <label 
                className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-teal-600 bg-teal-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="sr-only"
                />
                <CreditCard className="w-4 h-4 text-teal-600 shrink-0" />
                <div className="text-xs font-bold text-slate-800">Credit / Debit Card</div>
              </label>

              <label 
                className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-teal-600 bg-teal-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="sr-only"
                />
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <div className="text-xs font-bold text-slate-800">Instant UPI / QR Code</div>
              </label>
            </div>
          </div>

          {/* Pharmacist Instructions note */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Instructions for Pharmacist &amp; Courier (Optional)
            </label>
            <input
              type="text"
              value={pharmacistNote}
              onChange={(e) => setPharmacistNote(e.target.value)}
              placeholder="e.g. Call before delivery, handle cold flask with care"
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          {/* Order Summary Line */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-slate-700">Total payable at checkout:</span>
              <div className="text-[11px] text-slate-500">
                {cart.length} unique medicines ({deliveryType === 'instant-sos' ? '30-45m SOS Delivery' : 'Standard Delivery'})
              </div>
            </div>
            <div className="text-xl font-bold font-mono text-teal-900">
              ${grandTotal.toFixed(2)}
            </div>
          </div>

          {/* Footer Submit */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Back to Cart
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Confirm &amp; Place Medical Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
