import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  Target, 
  Megaphone, 
  Users, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface CampaignTemplate {
  id: string;
  name: string;
  channel: 'facebook' | 'tiktok' | 'whatsapp' | 'instagram';
  category: string;
  hook: string;
  body: string;
  cta: string;
}

export const TrafficGenerator: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [tuitionName, setTuitionName] = useState('Pusat Tuisyen Pintar Bestari');
  const [location, setLocation] = useState('Shah Alam & Subang Jaya');
  const [targetLevel, setTargetLevel] = useState('SPM 2026 (Tingkatan 4 & 5)');
  const [selectedOffer, setSelectedOffer] = useState('Ujian Diagnostik & Analisis Kelemahan Percuma');

  // Dynamic campaign templates
  const campaigns: CampaignTemplate[] = [
    {
      id: 'fb-spm',
      name: 'Iklan Facebook: Tarik Ibu Bapa Risaukan Subjek SPM',
      channel: 'facebook',
      category: 'Tingkatan 4 & 5 (SPM)',
      hook: `⚠️ "ANAK DAPAT GRED C/D DALAM MATEMATIK TAMBAHAN & FIZIK?" Jangan tunggu hingga percubaan SPM baru nak cemas!`,
      body: `Ibu bapa di sekitar ${location},\n\nKebanyakan calon SPM bukan tak bijak, tapi mereka hilang fokus kerana asas silibus Tingkatan 4 tercicir.\n\nDi ${tuitionName}, kami menggunakan modul berperingkat 'Zero to Hero' bersama barisan tutor pakar berpengalaman lebih 10 tahun.\n\n✅ Kelas bersaiz kecil (Maksimum 15 pelajar)\n✅ Latihan soalan ramalan format terkini Lembaga Peperiksaan\n✅ Laporan kehadiran & prestasi anak dihantar automatik ke WhatsApp anda melalui portal didik.tuisyennow.my\n✅ Kemudahan bayaran ansuran yuran mudah melalui DuitNow QR & FPX iPay88\n\n🎁 TAWARAN TERHAD: ${selectedOffer} bernilai RM80 secara PERCUMA untuk 20 pendaftar terawal!`,
      cta: `👉 Tekan pautan ini untuk tempah sesi percubaan: https://didik.tuisyennow.my/register?c=${encodeURIComponent(tuitionName)}`,
    },
    {
      id: 'wa-blast',
      name: 'Mesej Siaran (Broadcast) WhatsApp: Promosi Pendaftaran Sesi Baharu',
      channel: 'whatsapp',
      category: 'Semua Peringkat',
      hook: `Salam sejahtera ibu bapa yang prihatin! 🌟`,
      body: `Pendaftaran kemasukan baharu bagi sesi *${targetLevel}* di *${tuitionName}* kini dibuka secara rasmi!\n\nKenapa ibu bapa memilih pusat tuisyen kami?\n1. 📈 92% pelajar melonjak 2 gred dalam 3 bulan pertama.\n2. 📱 Sistem pengurusan moden didik.tuisyennow.my – semak jadual, markah kuiz & resit rasmi terus dalam telefon.\n3. 💳 Pembayaran yuran mudah melalui pautan selamat iPay88 tanpa perlu hantar resit kertas.\n\nIstimewa untuk anda: Kami berikan *${selectedOffer}* jika mendaftar sebelum hujung minggu ini!`,
      cta: `Balas mesej ini dengan kod *'NAK DAFTAR'* atau daftar dalam talian: https://didik.tuisyennow.my/register`,
    },
    {
      id: 'tt-script',
      name: 'Skrip Video TikTok / Reels: Hook Pantas Tarik Pelajar',
      channel: 'tiktok',
      category: 'Pelajar Remaja',
      hook: `[Scene: Murid termenung tengok kertas Math Addmath markah merah]\n"Korang rasa Addmath susah sebab formula panjang ke... sebab cikgu tak ajar trick 30 saat ni?"`,
      body: `[Scene: Guru tunjuk cara selesaikan Differentiation / Kamiran guna kaedah pintas 3 langkah]\n\n"Ramai ingat Addmath ni kena hafal semua benda. Sebenarnya ada pattern soalan SPM yang keluar setiap tahun!\n\nKat ${tuitionName} (${location}), kita bongkarkan formula bocor ni dalam sesi kelas intensif."`,
      cta: `Komen "SPM A" kat bawah atau tekan link kat bio untuk claim ${selectedOffer}! Kita jumpa dalam kelas di portal didik.tuisyennow.my!`,
    },
    {
      id: 'ig-carousel',
      name: 'Kandungan Karusel Instagram: 5 Sebab Pelajar Suka Belajar Sini',
      channel: 'instagram',
      category: 'Branding & Reputasi',
      hook: `5 Perkara Yang Bezakan ${tuitionName} Berbanding Tuisyen Biasa 📚✨`,
      body: `Slide 1: Guru Muda Berkaliber & Energetik (Bukan sesi syarahan membosankan!)\nSlide 2: Bilik Kelas Berhawa Dingin & Bersih Selesa\nSlide 3: Sistem Portal Pelajar Pintar (didik.tuisyennow.my) - Akses nota & rakaman bila-bila masa\nSlide 4: Rekod Kehadiran Imbas QR Selamat Untuk Ibu Bapa\nSlide 5: Bayaran Yuran Fleksibel Tanpa Caj Tersembunyi via iPay88`,
      cta: `DM kami "PROMO" untuk nikmati ${selectedOffer} hari ini! Slot terhad mengikut kapasiti bilik.`,
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Alat Pemasaran & Penjana Trafik Tempatan</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Penjana Trafik & Pelajar Baharu Pusat Tuisyen
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Gunakan skrip iklan terbukti berkesan ini di Facebook, TikTok & WhatsApp untuk 
          menarik ratusan ibu bapa mendaftar dan menyalurkan mereka terus ke pangkalan data <strong className="text-amber-400">didik.tuisyennow.my</strong>.
        </p>
      </div>

      {/* Customizer Panel */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-10 shadow-xl">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-400" />
          <span>Sesuaikan Maklumat Pusat Tuisyen Anda</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Nama Pusat Tuisyen</label>
            <input
              type="text"
              value={tuitionName}
              onChange={(e) => setTuitionName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Lokasi Cawangan</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Fokus Peringkat Pelajar</label>
            <select
              value={targetLevel}
              onChange={(e) => setTargetLevel(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="SPM 2026 (Tingkatan 4 & 5)">SPM 2026 (Tingkatan 4 & 5)</option>
              <option value="Tingkatan 1 - 3 (UASA)">Tingkatan 1 - 3 (UASA)</option>
              <option value="Sekolah Rendah (Tahun 4, 5, 6)">Sekolah Rendah (Tahun 4, 5, 6)</option>
              <option value="Aliran Sains Tulen (Fizik, Kimia, Addmath)">Aliran Sains Tulen</option>
              <option value="Kelas Membaca & Mengira (Pemulihan)">Kelas Membaca & Mengira</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1 block">Tawaran Penarik (Lead Magnet)</label>
            <select
              value={selectedOffer}
              onChange={(e) => setSelectedOffer(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-amber-300 focus:outline-none focus:border-amber-500"
            >
              <option value="Ujian Diagnostik & Analisis Kelemahan Percuma">Ujian Diagnostik Percuma</option>
              <option value="Percuma Yuran Pendaftaran & Beg Eksklusif">Percuma Yuran Pendaftaran</option>
              <option value="Diskaun 50% Yuran Bulan Pertama">Diskaun 50% Bulan Pertama</option>
              <option value="Sesi Percubaan Kelas 1 Minggu Tanpa Bayaran">Percubaan Kelas 1 Minggu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {campaigns.map((camp) => {
          const fullText = `${camp.hook}\n\n${camp.body}\n\n${camp.cta}`;
          const isCopied = copiedId === camp.id;

          const channelBadgeColor = {
            facebook: 'bg-blue-600/20 text-blue-300 border-blue-500/30',
            whatsapp: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30',
            tiktok: 'bg-pink-600/20 text-pink-300 border-pink-500/30',
            instagram: 'bg-purple-600/20 text-purple-300 border-purple-500/30',
          }[camp.channel];

          return (
            <div
              key={camp.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${channelBadgeColor}`}>
                    {camp.channel} Ads
                  </span>
                  <span className="text-xs text-slate-400">{camp.category}</span>
                </div>

                <h4 className="text-sm font-bold text-white mb-3">{camp.name}</h4>

                {/* Hook Box */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 mb-3 whitespace-pre-wrap">
                  {camp.hook}
                </div>

                {/* Body Text */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans max-h-56 overflow-y-auto whitespace-pre-wrap">
                  {camp.body}
                  <div className="mt-3 pt-2 border-t border-slate-800 text-amber-400 font-bold">
                    {camp.cta}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Salin & tampal terus ke Ads Manager / WhatsApp
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(camp.id, fullText)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isCopied
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Telah Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Skrip</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Traffic conversion funnel note */}
      <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">
            Pautan Pendaftaran Terus Bersambung ke Pangkalan Data Anda
          </div>
          <div className="text-xs text-slate-300 mt-1">
            Apabila ibu bapa mengisi borang daripada kempen ini, rekod mereka serta-merta muncul di papan pemuka Didik TuisyenNow 
            dan invois iPay88 pertama dijana secara automatik.
          </div>
        </div>
        <a
          href="https://didik.tuisyennow.my"
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow"
        >
          <span>Aktifkan Corong Pendaftaran</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
