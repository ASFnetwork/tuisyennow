import React, { useState } from 'react';
import { TUITION_PLANS } from '../data/mockData';
import { Plan } from '../types';
import { X, CheckCircle2, ShieldCheck, CreditCard, ArrowRight, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId?: string;
  onNavigateTab: (tabId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPlanId = 'growth',
  onNavigateTab,
}) => {
  const plan = TUITION_PLANS.find(p => p.id === selectedPlanId) || TUITION_PLANS[1];

  const [tuitionName, setTuitionName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('Selangor');
  const [mode, setMode] = useState<'trial' | 'pay_now'>('trial');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch (err) {}
  };

  const handleResetModal = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={handleResetModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
                Pendaftaran Rasmi didik.tuisyennow.my
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Mulakan Akaun Pusat Tuisyen Anda
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Pakej Dipilih: <strong className="text-amber-400">{plan.name}</strong> (RM{plan.monthlyPrice}/bulan)
              </p>
            </div>

            {/* Mode Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl mb-5 border border-slate-800">
              <button
                type="button"
                onClick={() => setMode('trial')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  mode === 'trial'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                14 Hari Percubaan Percuma
              </button>
              <button
                type="button"
                onClick={() => setMode('pay_now')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  mode === 'pay_now'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Langgan Terus via iPay88
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Nama Pusat Tuisyen / Akademi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="cth: Pusat Tuisyen Pintar Cemerlang"
                  value={tuitionName}
                  onChange={(e) => setTuitionName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Nama Pemilik / Pengurus *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="cth: Cikgu Hazim"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Negeri Lokasi *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Selangor">Selangor</option>
                    <option value="Kuala Lumpur">Kuala Lumpur</option>
                    <option value="Johor">Johor</option>
                    <option value="Pulau Pinang">Pulau Pinang</option>
                    <option value="Perak">Perak</option>
                    <option value="Kedah">Kedah</option>
                    <option value="Melaka">Melaka</option>
                    <option value="Negeri Sembilan">Negeri Sembilan</option>
                    <option value="Pahang">Pahang</option>
                    <option value="Terengganu">Terengganu</option>
                    <option value="Kelantan">Kelantan</option>
                    <option value="Sabah">Sabah</option>
                    <option value="Sarawak">Sarawak</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Nombor WhatsApp Pemilik (Untuk Pengaktifan Bot) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="cth: 0123456789 atau 60123456789"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-400 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Emel Pentadbir Rasmi *
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@tuisyenanda.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>
                    {mode === 'trial'
                      ? 'Aktifkan 14 Hari Percubaan Sekarang'
                      : `Teruskan ke Bayaran iPay88 (RM${plan.monthlyPrice})`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-center text-[10px] text-slate-400 mt-2">
                🔒 Data anda disulitkan mengikut Akta Perlindungan Data Peribadi 2010 (PDPA Malaysia).
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-bold text-white">
              Pusat Tuisyen Berjaya Didaftarkan!
            </h3>

            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Tahniah, pendaftaran akaun <strong className="text-amber-400">{tuitionName || 'Pusat Tuisyen Anda'}</strong> telah berjaya diterima. 
              Pautan akses portal dan pengaktifan modul automasi WhatsApp telah dihantar ke <strong>{whatsappPhone || 'nombor anda'}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Pelan:</span>
                <strong className="text-white">{plan.name}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Status:</span>
                <span className="text-emerald-400 font-bold">14 Hari Percubaan Aktif</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Domain Sistem:</span>
                <span className="text-amber-400 font-mono">didik.tuisyennow.my</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://didik.tuisyennow.my"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center justify-center gap-1.5 shadow"
              >
                <span>Buka Portal Pengurusan Tuisyen Sekarang</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => {
                  handleResetModal();
                  onNavigateTab('ipay88');
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750"
              >
                Uji Simulator Bayaran iPay88
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
