import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  CheckCheck, 
  Smartphone, 
  ShieldCheck, 
  Bell, 
  QrCode, 
  Clock, 
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface WhatsAppAutomationProps {
  initialContact?: { name: string; phone: string } | null;
  onNavigateToContacts?: () => void;
}

export const WhatsAppAutomation: React.FC<WhatsAppAutomationProps> = ({
  initialContact,
  onNavigateToContacts,
}) => {
  const [templateType, setTemplateType] = useState<'fee_reminder' | 'payment_receipt' | 'attendance' | 'exam_promo'>('fee_reminder');
  const [parentName, setParentName] = useState(initialContact?.name || 'Puan Halimah');
  const [studentName, setStudentName] = useState('Nur Aina Batrisyia');
  const [phoneNo, setPhoneNo] = useState(initialContact?.phone || '+60123456789');
  const [amount, setAmount] = useState('240.00');
  const [subject, setSubject] = useState('Matematik Tambahan & Fizik (SPM)');

  // Update if initialContact changes
  React.useEffect(() => {
    if (initialContact) {
      if (initialContact.name) setParentName(initialContact.name);
      if (initialContact.phone) setPhoneNo(initialContact.phone);
    }
  }, [initialContact]);
  
  // Status simulation
  const [isSending, setIsSending] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'sent' | 'delivered' | 'read'>('read');
  const [logs, setLogs] = useState<Array<{ id: string; time: string; text: string; status: string }>>([
    { id: '1', time: '10:04:12 AM', text: 'Template [fee_reminder] dihantar ke 60123456789', status: 'Delivered' },
    { id: '2', time: '09:45:00 AM', text: 'Template [payment_receipt] dihantar ke 60139876543 (RM180.00)', status: 'Read' },
    { id: '3', time: '08:30:15 AM', text: 'Notifikasi Kehadiran: Pelajar STU-001 imbas QR Masuk Kelas', status: 'Delivered' },
  ]);

  // Generate current message body according to template
  const getMessageContent = () => {
    switch (templateType) {
      case 'fee_reminder':
        return {
          title: '🔔 Peringatan Yuran Tuisyen Bulanan',
          body: `Salam hormat ${parentName},\n\nIni adalah peringatan mesra bagi yuran pengajian anakanda *${studentName}* (${subject}) bagi sesi *Oktober 2026* berjumlah *RM${amount}*.\n\nSila klik pautan selamat iPay88 di bawah untuk membuat bayaran secara online (DuitNow QR / FPX Online Banking):\n\n🔗 https://didik.tuisyennow.my/pay/INV-8821\n\n_Resit rasmi digital akan dijana serta-merta selepas transaksi berjaya._`,
          buttons: ['Bayar Sekarang (iPay88) 💳', 'Tanya Pejabat 💬'],
        };
      case 'payment_receipt':
        return {
          title: '✅ Resit Rasmi Pembayaran Lunas',
          body: `Salam hormat ${parentName},\n\nTerima kasih! Pembayaran yuran pengajian *${studentName}* telah berjaya disahkan melalui sistem perbankan iPay88.\n\n━━━━━━━━━━━━━━━━━━━━\n📄 No. Resit: *RCP-DIDIK-99218*\n💰 Jumlah: *RM${amount}*\n📅 Tarikh: *${new Date().toLocaleDateString('ms-MY')}*\n🏦 Kaedah: *DuitNow QR / Maybank2u*\n━━━━━━━━━━━━━━━━━━━━\n\nAnda boleh memuat turun salinan PDF resit lengkap di portal ibu bapa kami: https://didik.tuisyennow.my/receipts`,
          buttons: ['Muat Turun Resit PDF 📥', 'Semak Rekod Pelajar 📊'],
        };
      case 'attendance':
        return {
          title: '📍 Notifikasi Kehadiran Kelas Tuisyen',
          body: `Salam ibu bapa,\n\nDimaklumkan bahawa anakanda *${studentName}* telah selamat mendaftar masuk (Check-in) ke bilik kelas *${subject}* pada jam *8:02 PM* melalui imbasan Kod QR Didik.\n\nSuhu: Normal (36.5°C)\nBilik: Dewan Einstein (Tingkat 2)\nTutor Bertugas: Cikgu Radzi (M.Sc. UKM)\n\nTerima kasih atas kepekaan anda.`,
          buttons: ['Lihat Jadual Kelas 📅'],
        };
      case 'exam_promo':
        return {
          title: '🚀 Bengkel Pecutan Skor A SPM 2026',
          body: `Khas untuk ibu bapa pelajar Tingkatan 4 & 5,\n\nPusat Tuisyen Didik membawakan *Bengkel Formula Skor A Matematik Tambahan & Fizik SPM* bersama Penceramah Cemerlang Kebangsaan pada 24-25 Oktober ini.\n\n🎁 Diskaun Khas 30% untuk pelajar berdaftar sedia ada Didik Tuisyen!\n\nDaftar tempat duduk anakanda sekarang sebelum pendaftaran penuh: https://didik.tuisyennow.my/spm-bengkel`,
          buttons: ['Tempah Tempat Duduk 🎯', 'Muat Turun Modul 📖'],
        };
    }
  };

  const currentMsg = getMessageContent();

  const handleSendTest = () => {
    setIsSending(true);
    setDeliveryStatus('sent');

    setTimeout(() => {
      setDeliveryStatus('delivered');
      setTimeout(() => {
        setIsSending(false);
        setDeliveryStatus('read');
        const newLog = {
          id: String(Date.now()),
          time: new Date().toLocaleTimeString('en-US'),
          text: `Template [${templateType}] dihantar ke ${phoneNo.replace(/[^0-9]/g, '')}`,
          status: 'Read',
        };
        setLogs((prev) => [newLog, ...prev.slice(0, 5)]);
      }, 1000);
    }, 800);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Modul Automasi WhatsApp Rasmi Malaysia</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Automasi Mesej Yuran & Resit Terus ke Telefon Ibu Bapa
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Didik TuisyenNow menggunakan integrasi rasmi Meta WhatsApp Cloud API.
          Peringatan dihantar berjadual secara sopan tanpa risiko nombor pusat tuisyen anda disekat.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls & Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          
          <div>
            <label className="text-xs font-bold text-slate-200 mb-2 block uppercase tracking-wider">
              Pilih Jenis Templat Mesej WhatsApp:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setTemplateType('fee_reminder')}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  templateType === 'fee_reminder'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-amber-400 mb-1">🔔 Peringatan</div>
                <div className="text-[11px] text-slate-300">Yuran Tertunggak</div>
              </button>

              <button
                type="button"
                onClick={() => setTemplateType('payment_receipt')}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  templateType === 'payment_receipt'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-emerald-400 mb-1">✅ Resit Rasmi</div>
                <div className="text-[11px] text-slate-300">Selepas iPay88</div>
              </button>

              <button
                type="button"
                onClick={() => setTemplateType('attendance')}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  templateType === 'attendance'
                    ? 'bg-sky-500/20 border-sky-500 text-sky-300'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-sky-400 mb-1">📍 Kehadiran</div>
                <div className="text-[11px] text-slate-300">Imbas QR Kod</div>
              </button>

              <button
                type="button"
                onClick={() => setTemplateType('exam_promo')}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  templateType === 'exam_promo'
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-purple-400 mb-1">🚀 Promosi</div>
                <div className="text-[11px] text-slate-300">Bengkel SPM</div>
              </button>
            </div>
          </div>

          {/* Form Dynamic Inputs */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">Nama Ibu Bapa</label>
                {onNavigateToContacts && (
                  <button
                    type="button"
                    onClick={onNavigateToContacts}
                    className="text-[10px] text-blue-400 hover:text-blue-300 underline font-semibold"
                  >
                    Pilih dari Google Contacts
                  </button>
                )}
              </div>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Nama Pelajar</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Nombor Telefon WhatsApp</label>
              <input
                type="text"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Jumlah Yuran (MYR)</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 mb-1 block">Subjek / Pakej Pengajian</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Trigger Button */}
          <div className="pt-2">
            <button
              type="button"
              disabled={isSending}
              onClick={handleSendTest}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Menghantar WhatsApp API ke Meta Cloud...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Simulasi Hantar Mesej WhatsApp Ini</span>
                </>
              )}
            </button>
          </div>

          {/* Live Delivery Activity Feed */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                Log Webhook WhatsApp Real-Time
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Meta Graph API v21.0 Online
              </span>
            </div>
            <div className="space-y-2">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-slate-950 border border-slate-800/80"
                >
                  <div className="text-slate-300 truncate max-w-[280px]">
                    <span className="text-slate-400 font-mono mr-2">{log.time}</span>
                    <span>{log.text}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Live Smartphone Simulator (5 cols) */}
        <div className="lg:col-span-5 flex justify-center">
          
          <div className="w-full max-w-[340px] bg-slate-950 rounded-[40px] border-[6px] border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[580px] relative">
            
            {/* Phone Notch & Speaker */}
            <div className="bg-slate-950 h-5 w-full flex justify-center items-center">
              <div className="w-20 h-3 bg-slate-800 rounded-b-xl" />
            </div>

            {/* WhatsApp App Bar */}
            <div className="bg-[#075e54] text-white p-3 flex items-center gap-3 shadow">
              <div className="w-9 h-9 rounded-full bg-emerald-700 border border-emerald-500 flex items-center justify-center font-bold text-xs">
                DT
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold leading-tight">Didik TuisyenNow Rasmi</div>
                <div className="text-[10px] text-emerald-200">Akaun Perniagaan Sah Verified</div>
              </div>
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
            </div>

            {/* Chat Body (WhatsApp Wallpaper Texture) */}
            <div className="flex-1 bg-[#0b141a] p-3 overflow-y-auto space-y-3 font-sans text-xs flex flex-col justify-end">
              
              {/* Date divider */}
              <div className="text-center my-1">
                <span className="px-2 py-0.5 rounded-md bg-[#182229] text-[10px] text-slate-400 shadow-sm">
                  Hari Ini
                </span>
              </div>

              {/* Message Bubble (Incoming WhatsApp message) */}
              <div className="max-w-[92%] bg-[#202c33] text-slate-100 rounded-2xl rounded-tl-none p-3 shadow-md relative border border-[#2a3942]">
                
                {/* Header title */}
                <div className="font-bold text-amber-400 mb-1 text-[11px]">
                  {currentMsg.title}
                </div>

                {/* Message Body text */}
                <div className="text-[11px] leading-relaxed whitespace-pre-wrap text-slate-200">
                  {currentMsg.body}
                </div>

                {/* Interactive Action Buttons */}
                <div className="mt-3 pt-2 border-t border-slate-700/60 space-y-1.5">
                  {currentMsg.buttons.map((btn, idx) => (
                    <button
                      key={idx}
                      className="w-full py-1.5 px-2 rounded-lg bg-[#2a3942] hover:bg-[#32444f] text-[11px] font-semibold text-emerald-400 flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>{btn}</span>
                    </button>
                  ))}
                </div>

                {/* Time & Read Receipts */}
                <div className="flex justify-end items-center gap-1 mt-1.5 text-[9px] text-slate-400">
                  <span>10:45 AM</span>
                  {deliveryStatus === 'sent' && <span className="text-slate-400">✓</span>}
                  {deliveryStatus === 'delivered' && <span className="text-slate-400">✓✓</span>}
                  {deliveryStatus === 'read' && (
                    <span className="text-sky-400 flex items-center font-bold">✓✓</span>
                  )}
                </div>

              </div>

            </div>

            {/* Chat bottom input bar */}
            <div className="bg-[#1f2c34] p-2 flex items-center gap-2 border-t border-[#2a3942]">
              <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-1.5 text-[11px] text-slate-400">
                Mesej balas automatik...
              </div>
              <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                <Send className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Phone bottom bar */}
            <div className="bg-slate-950 h-3 w-full flex justify-center items-center">
              <div className="w-24 h-1 bg-slate-700 rounded-full" />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
