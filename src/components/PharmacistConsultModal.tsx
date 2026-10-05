import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  Send, 
  UserCheck, 
  Stethoscope,
  CheckCircle2
} from 'lucide-react';

interface PharmacistConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PharmacistConsultModal: React.FC<PharmacistConsultModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'pharmacist'; text: string; time: string }>>([
    {
      sender: 'pharmacist',
      text: 'Hello, I am Dr. Nathan Reed (Pharm.D), on-duty registered pharmacist at AuraCare. How can I assist with your medication dosage, drug interactions, or emergency delivery today?',
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { sender: 'user', text: userText, time: nowTime }]);
    setInputValue('');
    setIsTyping(true);

    // Realistic automated pharmacist response
    setTimeout(() => {
      setIsTyping(false);
      let reply = "Understood. For prescription medications, please ensure your physician's dosage schedule is followed. If you are experiencing sudden wheezing, chest pain, or high fever, our 24/7 SOS delivery is ready or you should contact emergency triage.";
      
      const lower = userText.toLowerCase();
      if (lower.includes('insulin') || lower.includes('sugar') || lower.includes('diabetes')) {
        reply = "For Insulin Glargine or Metformin: Always store unopened insulin between 2°C–8°C in our cold-chain ice flask. Never freeze it. Metformin is best taken after meals to prevent gastric upset.";
      } else if (lower.includes('side effect') || lower.includes('allergy')) {
        reply = "If you notice skin rashes, facial swelling, or breathing difficulty, stop the medication immediately and seek emergency medical care. Minor nausea with antibiotics can be lessened by taking the dose with light food.";
      } else if (lower.includes('delivery') || lower.includes('sos') || lower.includes('urgent')) {
        reply = "Our emergency rider is on standby. For critical acute medicines (inhalers, cardiac nitrates, antipyretics), our average dispatch time is 32 minutes across the metro area.";
      }

      setMessages(prev => [...prev, { sender: 'pharmacist', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col justify-between animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Pharmacist profile */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
                NR
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 absolute bottom-0 right-0"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">Dr. Nathan Reed, Pharm.D</h3>
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <p className="text-[11px] text-teal-300">
                On-Duty Licensed Pharmacist · Reg #DL-2026-MED-8492
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Emergency Voice Hotline banner */}
        <div className="bg-teal-50 border-b border-teal-200 px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-teal-900 font-semibold">
            <PhoneCall className="w-4 h-4 text-emerald-600" />
            <span>Toll-Free Pharmacy SOS: 1800-419-MEDS</span>
          </div>
          <span className="text-[11px] text-teal-700 font-medium">Free Call · Available 24/7</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 max-h-80 min-h-64">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-teal-700 text-white rounded-br-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-2xs'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-2 rounded-full w-24 shadow-2xs">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about medication dosage, interactions, or SOS delivery..."
            className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-3 py-2 bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white rounded-lg transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
