import React, { useState } from 'react';
import { 
  X, 
  Repeat, 
  Clock, 
  Calendar, 
  Check, 
  Plus, 
  AlertCircle, 
  ShoppingCart, 
  Bell, 
  Pill,
  Trash2
} from 'lucide-react';
import { RefillReminder, Medicine } from '../types/pharmacy';
import { MEDICINES_DATA } from '../data/medicinesData';

interface RefillTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (medicine: Medicine) => void;
}

export const RefillTrackerModal: React.FC<RefillTrackerModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [reminders, setReminders] = useState<RefillReminder[]>([
    {
      id: 'rem-1',
      medicineName: 'Glucophage XR 500mg',
      dailyDosageTimes: ['Morning', 'Evening'],
      pillsRemaining: 6,
      pillsPerDay: 2,
      refillThresholdDays: 5,
      autoRefillEnabled: true,
    },
    {
      id: 'rem-2',
      medicineName: 'Lipitor 20mg',
      dailyDosageTimes: ['Bedtime'],
      pillsRemaining: 18,
      pillsPerDay: 1,
      refillThresholdDays: 5,
      autoRefillEnabled: false,
    },
    {
      id: 'rem-3',
      medicineName: 'Telma 40mg',
      dailyDosageTimes: ['Morning'],
      pillsRemaining: 4,
      pillsPerDay: 1,
      refillThresholdDays: 5,
      autoRefillEnabled: true,
    }
  ]);

  const [newMedName, setNewMedName] = useState('');
  const [newPillsRemaining, setNewPillsRemaining] = useState('30');
  const [newPillsPerDay, setNewPillsPerDay] = useState('1');

  if (!isOpen) return null;

  const handleToggleAutoRefill = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, autoRefillEnabled: !r.autoRefillEnabled } : r));
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const handleAddNewReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim()) return;

    const newReminder: RefillReminder = {
      id: `rem-${Date.now()}`,
      medicineName: newMedName.trim(),
      dailyDosageTimes: ['Morning'],
      pillsRemaining: parseInt(newPillsRemaining) || 30,
      pillsPerDay: parseInt(newPillsPerDay) || 1,
      refillThresholdDays: 5,
      autoRefillEnabled: true,
    };

    setReminders(prev => [...prev, newReminder]);
    setNewMedName('');
    setNewPillsRemaining('30');
  };

  const handleOrderRefillForMed = (medName: string) => {
    const found = MEDICINES_DATA.find(m => m.name.toLowerCase().includes(medName.toLowerCase().split(' ')[0]));
    if (found) {
      onAddToCart(found);
    }
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
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Dosage Schedule &amp; Auto-Refill Tracker</h2>
              <p className="text-xs text-slate-500">Track remaining pills &amp; prevent missed chronic doses</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Active Medication Reminders List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>Current Chronic Medicine Regimen</span>
            </h3>

            <div className="space-y-3">
              {reminders.map((rem) => {
                const daysLeft = Math.floor(rem.pillsRemaining / rem.pillsPerDay);
                const isCriticalLow = daysLeft <= rem.refillThresholdDays;

                return (
                  <div
                    key={rem.id}
                    className={`rounded-xl border p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isCriticalLow 
                        ? 'border-amber-300 bg-amber-50/50' 
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{rem.medicineName}</span>
                        {isCriticalLow && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Refill Due ({daysLeft} days left)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>Schedule: <strong>{rem.dailyDosageTimes.join(', ')}</strong></span>
                        <span>·</span>
                        <span>{rem.pillsRemaining} pills remaining</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      {/* Auto-refill toggle */}
                      <button
                        onClick={() => handleToggleAutoRefill(rem.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                          rem.autoRefillEnabled
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        <Repeat className="w-3.5 h-3.5" />
                        <span>{rem.autoRefillEnabled ? 'Auto-Refill: ON' : 'Auto-Refill: OFF'}</span>
                      </button>

                      {/* Quick 1-click refill */}
                      <button
                        onClick={() => handleOrderRefillForMed(rem.medicineName)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Order Refill</span>
                      </button>

                      <button
                        onClick={() => handleDeleteReminder(rem.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
                        title="Remove tracker"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add Medicine to Tracker Form */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-teal-600" />
              <span>Track a New Prescription Medicine</span>
            </h4>

            <form onSubmit={handleAddNewReminder} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Medicine Name</label>
                <input
                  type="text"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  placeholder="e.g. Thyronorm 50mcg, Ecosprin 75mg"
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Pills in Strip/Bottle</label>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={newPillsRemaining}
                  onChange={(e) => setNewPillsRemaining(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>

          {/* Benefits info */}
          <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 flex items-start gap-2.5">
            <Bell className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">How AuraCare Auto-Refill Works: </span>
              When your medication dips below 5 days of remaining dosage, our pharmacist dispatches your recurring refill with free temperature-controlled delivery so your chronic therapy is never interrupted.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
