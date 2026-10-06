import React, { useState, useMemo } from 'react';
import { IPAY88_CHANNELS } from '../data/mockData';
import { 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  QrCode, 
  Building2, 
  Smartphone, 
  Landmark, 
  RefreshCw, 
  ArrowRight,
  Receipt,
  FileCode,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface IPay88SimulatorProps {
  onPaymentSuccess?: (details: any) => void;
}

export const IPay88Simulator: React.FC<IPay88SimulatorProps> = ({ onPaymentSuccess }) => {
  // Simulator inputs
  const [merchantCode, setMerchantCode] = useState('M01234');
  const [merchantKey, setMerchantKey] = useState('apple123KEY');
  const [refNo, setRefNo] = useState(`INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-8821`);
  const [amount, setAmount] = useState('189.00');
  const [currency] = useState('MYR');
  const [studentName, setStudentName] = useState('Nur Aina Batrisyia');
  const [parentName, setParentName] = useState('Puan Halimah binti Kassim');
  const [parentPhone, setParentPhone] = useState('0123456789');
  const [selectedChannel, setSelectedChannel] = useState('duitnow_qr');

  // Checkout transaction state
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<{
    status: 'idle' | 'success' | 'failed';
    transId?: string;
    authCode?: string;
    receiptNo?: string;
    timestamp?: string;
  }>({ status: 'idle' });

  // Calculate SHA256 Signature in client for demonstration
  // In real PHP: hash('sha256', $merchantKey . $merchantCode . $refNo . $amountClean . $currency)
  const sha256Signature = useMemo(() => {
    const amountClean = amount.replace(/[.,]/g, '');
    const rawString = `${merchantKey}${merchantCode}${refNo}${amountClean}${currency}`;
    // Simple fast visual hash simulation matching standard length (64 hex characters)
    let hash = 0;
    for (let i = 0; i < rawString.length; i++) {
      const char = rawString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    // Hex string pad
    const hex1 = Math.abs(hash).toString(16).padStart(8, '0');
    const hex2 = Math.abs(hash * 31).toString(16).padStart(8, '0');
    const hex3 = Math.abs(hash * 97).toString(16).padStart(8, '0');
    const hex4 = Math.abs(hash * 131).toString(16).padStart(8, '0');
    return `${hex1}${hex2}${hex3}${hex4}a7b9c1d2e3f4567890abcdef12345678`.slice(0, 64);
  }, [merchantKey, merchantCode, refNo, amount, currency]);

  // Handle simulated payment submission
  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setPaymentResult({ status: 'idle' });

    setTimeout(() => {
      setIsProcessing(false);
      const generatedTransId = `T${Date.now().toString().slice(-8)}`;
      const generatedAuthCode = `AUTH-${Math.floor(100000 + Math.random() * 900000)}`;
      const generatedReceipt = `RCP-DIDIK-${Date.now().toString().slice(-6)}`;

      const result = {
        status: 'success' as const,
        transId: generatedTransId,
        authCode: generatedAuthCode,
        receiptNo: generatedReceipt,
        timestamp: new Date().toLocaleString('ms-MY', { timeZone: 'Asia/Kuala_Lumpur' }),
      };

      setPaymentResult(result);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback
      }

      if (onPaymentSuccess) {
        onPaymentSuccess({
          ...result,
          refNo,
          amount,
          studentName,
          parentName,
          parentPhone,
          channel: selectedChannel,
        });
      }
    }, 1800);
  };

  const handleReset = () => {
    setPaymentResult({ status: 'idle' });
    setRefNo(`INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Integrasi Rasmi Gerbang Pembayaran Malaysia</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Simulator Pembayaran iPay88 Sandbox
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Uji bagaimana sistem <strong className="text-amber-400">didik.tuisyennow.my</strong> menjana SHA-256 signature, 
          menerima bayaran FPX/DuitNow QR daripada ibu bapa, dan mengemas kini pangkalan data MySQL secara automatik.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: iPay88 Parameters & Channel Selection */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                88
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Parameter Permintaan Transaksi iPay88</h3>
                <p className="text-xs text-slate-400">Protokol SHA-256 (Piawaian Keselamatan Bank Negara Malaysia)</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-slate-800 text-emerald-400 border border-slate-700">
              SANDBOX MODE
            </span>
          </div>

          {/* Preset Buttons */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-2 block">Pilih Contoh Transaksi:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setAmount('189.00');
                  setRefNo(`INV-DIDIK-GROWTH-${Math.floor(1000 + Math.random() * 9000)}`);
                  setStudentName('Pemilik Tuisyen (Pelan Growth)');
                }}
                className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                  amount === '189.00'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">Langganan Didik</div>
                <div className="text-[11px] text-slate-400">RM 189.00 (Pelan Growth)</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAmount('240.00');
                  setRefNo(`INV-STU-SPM-${Math.floor(1000 + Math.random() * 9000)}`);
                  setStudentName('Nur Aina Batrisyia (SPM 4 Subjek)');
                }}
                className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                  amount === '240.00'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">Yuran Pelajar SPM</div>
                <div className="text-[11px] text-slate-400">RM 240.00 / bln</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAmount('89.00');
                  setRefNo(`INV-DIDIK-BASIC-${Math.floor(1000 + Math.random() * 9000)}`);
                  setStudentName('Pemilik Tuisyen (Pelan Starter)');
                }}
                className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                  amount === '89.00'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">Pelan Starter Didik</div>
                <div className="text-[11px] text-slate-400">RM 89.00 / bln</div>
              </button>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Merchant Code (iPay88)</label>
              <input
                type="text"
                value={merchantCode}
                onChange={(e) => setMerchantCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Merchant Key</label>
              <input
                type="text"
                value={merchantKey}
                onChange={(e) => setMerchantKey(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">No. Rujukan Invois (RefNo)</label>
              <input
                type="text"
                value={refNo}
                onChange={(e) => setRefNo(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-amber-400 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Jumlah Bayaran (MYR)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">RM</span>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-emerald-400 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Nama Pelajar / Pelanggan</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">No. Telefon WhatsApp (601x)</label>
              <input
                type="text"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-2 block">
              Pilih Saluran Pembayaran Malaysia (iPay88 Channels):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {IPAY88_CHANNELS.map((ch) => {
                const isSelected = selectedChannel === ch.id;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setSelectedChannel(ch.id)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        Code: {ch.code}
                      </span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                    </div>
                    <div className="text-xs font-bold text-slate-200 truncate">{ch.name}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{ch.fee}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SHA-256 Signature Preview Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 text-amber-400 font-sans font-bold">
                <Lock className="w-3.5 h-3.5" /> Rumus SHA-256 iPay88 Signature:
              </span>
              <span className="text-[10px] text-slate-400 font-sans">Automasi PHP</span>
            </div>
            <div className="text-slate-400 truncate">
              String Mentah: {merchantKey}{merchantCode}{refNo}{amount.replace(/[.,]/g, '')}{currency}
            </div>
            <div className="text-emerald-400 truncate">
              Signature Hash: {sha256Signature}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleSimulatePayment}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white hover:brightness-110 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Menyambung ke Gerbang Bank iPay88...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Uji Bayar RM {amount} Melalui iPay88</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right Output: Gateway Response & Receipt Simulator */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Status Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Receipt className="w-4 h-4 text-amber-400" />
                <span>Keputusan Transaksi (Webhook & Resit)</span>
              </h3>
              {paymentResult.status !== 'idle' && (
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Set Semula
                </button>
              )}
            </div>

            {paymentResult.status === 'idle' && (
              <div className="py-12 text-center text-slate-400">
                <div className="w-14 h-14 rounded-full bg-slate-800/80 mx-auto flex items-center justify-center text-slate-500 mb-3">
                  <CreditCard className="w-7 h-7" />
                </div>
                <p className="text-sm font-medium text-slate-300">Menunggu Ujian Transaksi</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Klik butang <strong>"Uji Bayar"</strong> di sebelah untuk mensimulasikan proses kelulusan iPay88 dan penjanaan resit digital.
                </p>
              </div>
            )}

            {paymentResult.status === 'success' && (
              <div className="space-y-4 pt-4">
                
                {/* Success Banner */}
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm text-emerald-200">iPay88 Status: 1 (TRANSAKSI BERJAYA)</h4>
                    <p className="text-xs text-emerald-300/80 mt-0.5">
                      Bank telah meluluskan bayaran dan menghantar isyarat selamat ke URL tindak balas (ResponseURL).
                    </p>
                  </div>
                </div>

                {/* Digital Receipt Card */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 font-sans text-xs">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                    <div>
                      <div className="font-extrabold text-white text-sm">Didik TuisyenNow</div>
                      <div className="text-[10px] text-slate-400">Resit Rasmi Pembayaran Yuran</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                      PAID / LUNAS
                    </span>
                  </div>

                  <div className="space-y-2 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">No. Resit:</span>
                      <strong className="font-mono text-white">{paymentResult.receiptNo}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">No. Invois (RefNo):</span>
                      <span className="font-mono">{refNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">ID Transaksi iPay88:</span>
                      <span className="font-mono text-blue-400">{paymentResult.transId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Kod Kebenaran Bank:</span>
                      <span className="font-mono">{paymentResult.authCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nama Pelajar:</span>
                      <span className="text-white font-medium">{studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ibu Bapa / Pembayar:</span>
                      <span>{parentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tarikh Transaksi:</span>
                      <span>{paymentResult.timestamp}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold">
                      <span className="text-white">Jumlah Bersih:</span>
                      <span className="text-emerald-400">RM {amount}</span>
                    </div>
                  </div>
                </div>

                {/* Automation trigger indicator */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Resit PDF dihantar automatik ke WhatsApp ({parentPhone})</span>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded font-bold">
                    Terkini
                  </span>
                </div>

              </div>
            )}

          </div>

          {/* Integration Documentation Note */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-white">
              <Info className="w-4 h-4 text-blue-400" />
              <span>Kelebihan iPay88 Berbanding Pindahan Bank Biasa:</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Dengan gerbang iPay88, dana yuran didepositkan terus ke akaun bank semasa syarikat/pusat tuisyen anda 
              (T+1 / T+2 settlement). Tiada lagi masalah resit berganda atau ibu bapa menghantar bukti pembayaran lama.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
