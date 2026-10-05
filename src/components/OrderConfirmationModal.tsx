import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  ThermometerSnowflake, 
  PhoneCall, 
  Download, 
  X,
  FileCheck
} from 'lucide-react';
import { Order } from '../types/pharmacy';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  useEffect(() => {
    if (!order) return;
    // Advance simulation step
    const timer = setTimeout(() => {
      setCurrentStepIndex(2);
    }, 4000);
    return () => clearTimeout(timer);
  }, [order]);

  if (!order) return null;

  const trackingSteps = [
    { title: 'Order Received', desc: 'Logged into AuraCare central dispensing database' },
    { title: 'Pharmacist Audit', desc: 'Batch number & expiry dates verified by Dr. Nathan Reed, Pharm.D' },
    { title: 'Cold-Chain Packing', desc: 'Sealed with tamper-evident strip & insulated gel packs' },
    { title: 'Express Dispatch', desc: 'Handed to temperature-monitored courier rider' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-teal-700 text-white p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-teal-100 hover:text-white hover:bg-teal-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-teal-200">
                Order Confirmed &amp; Dispatched
              </div>
              <h2 className="text-xl font-bold text-white">Order #{order.id}</h2>
              <p className="text-xs text-teal-100 mt-0.5">
                Estimated Delivery in <span className="font-bold underline">{order.estimatedDeliveryTime}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Live Progress Timeline */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>Live Pharmacy Dispensation Status</span>
            </h3>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {trackingSteps.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={idx} className="relative">
                    <div 
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                        isPassed 
                          ? 'bg-teal-600 text-white ring-4 ring-teal-100' 
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>

                    <div>
                      <div className={`text-xs font-bold ${isCurrent ? 'text-teal-900' : 'text-slate-800'}`}>
                        {step.title} {isCurrent && <span className="text-[10px] text-teal-700 font-semibold">(In Progress)</span>}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery & Contact card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-1">
              <span className="font-semibold text-slate-500 uppercase text-[10px]">Delivering To</span>
              <div className="font-bold text-slate-800">{order.address.fullName}</div>
              <div className="text-slate-600">{order.address.street}</div>
              <div className="text-slate-600">{order.address.city} - {order.address.pincode}</div>
              <div className="text-slate-500 pt-1">Phone: {order.address.phone}</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
              <span className="font-semibold text-slate-500 uppercase text-[10px]">Delivery Protocol</span>
              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                <Truck className="w-3.5 h-3.5 text-teal-600" />
                <span>Type: {order.deliveryType === 'instant-sos' ? '30-45m Emergency SOS' : 'Standard Delivery'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Payment: {order.paymentMethod.toUpperCase()} (Total: ${order.total.toFixed(2)})</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700 font-medium text-[11px]">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Prescription Compliance Verified</span>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Dispensed Medications ({order.items.length} items):
            </span>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-slate-50/50 p-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2 px-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800">{item.medicine.name}</span>
                    <span className="text-[11px] text-teal-800 font-mono block">{item.medicine.genericName}</span>
                    <span className="text-[10px] text-slate-400">Qty: {item.quantity} · {item.medicine.packSize}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-800">
                    ${(item.medicine.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Helpline and Invoice actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>Need help with delivery? Call <strong>1800-419-MEDS</strong></span>
            </div>

            <button
              onClick={() => alert(`Tax invoice for Order #${order.id} downloaded.`)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Tax Invoice (PDF)</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Continue Browsing Pharmacy
          </button>
        </div>
      </div>
    </div>
  );
};
