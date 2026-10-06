import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Users, 
  Receipt, 
  Clock, 
  Play,
  Sparkles,
  Layers
} from 'lucide-react';

interface HeroFunnelProps {
  onOpenCheckout: (planId?: string) => void;
  onNavigateTab: (tabId: string) => void;
}

export const HeroFunnel: React.FC<HeroFunnelProps> = ({ onOpenCheckout, onNavigateTab }) => {
  return (
    <div className="relative overflow-hidden pt-6 pb-20">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-48 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 shadow-lg shadow-amber-500/5 text-xs text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold text-amber-300">Khas untuk Pemilik SME Tuisyen Malaysia:</span>
            <span>Tingkatkan kutipan yuran sehingga 3.4x lebih pantas</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Tukar Pusat Tuisyen Manual Anda Kepada{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400">
              Sistem Automasi Digital Pintar
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Berhenti pening kepala menyemak slip bank palsu di WhatsApp setiap awal bulan. 
            Langgan <strong className="text-amber-400 font-semibold underline decoration-amber-500/40">didik.tuisyennow.my</strong> untuk 
            mengautomasikan kutipan yuran dengan <strong className="text-white">iPay88 (FPX, DuitNow QR)</strong>, 
            resit automatik & peringatan <strong className="text-emerald-400">WhatsApp Cloud API</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenCheckout('growth')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
            >
              <span>Cuba Percuma 14 Hari di Didik</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigateTab('roi')}
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-base bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Kira Penjimatan Tuisyen Anda</span>
            </button>

            <button
              onClick={() => onNavigateTab('ipay88')}
              className="w-full sm:w-auto px-5 py-4 rounded-xl font-semibold text-sm bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-emerald-400" />
              <span>Demo iPay88 & WhatsApp</span>
            </button>
          </div>

          {/* Feature Highlights Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tiada kad kredit diperlukan untuk percubaan
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Integrasi rasmi iPay88 Malaysia (FPX & QR)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Skrip PHP & MySQL sedia muat turun
            </span>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 mb-1">480+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-300">Pusat Tuisyen SME di Malaysia</div>
            <div className="text-[11px] text-slate-400 mt-1">Selangor, Johor, Penang, Perak, Sabah & Sarawak</div>
          </div>
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 mb-1">94.7%</div>
            <div className="text-xs sm:text-sm font-medium text-slate-300">Kutipan Yuran Berjaya 7 Hari Pertama</div>
            <div className="text-[11px] text-slate-400 mt-1">Dengan pautan segera iPay88 via WhatsApp</div>
          </div>
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-sky-400 mb-1">28 Jam</div>
            <div className="text-xs sm:text-sm font-medium text-slate-300">Masa Admin Dijimatkan Sebulan</div>
            <div className="text-[11px] text-slate-400 mt-1">Bebas dari semakan slip bank manual</div>
          </div>
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-5 text-center">
            <div className="text-3xl sm:text-4xl font-black text-purple-400 mb-1">100%</div>
            <div className="text-xs sm:text-sm font-medium text-slate-300">Patuh Piawaian Malaysia</div>
            <div className="text-[11px] text-slate-400 mt-1">Resit sah cukai LHDN & ringgit Malaysia (MYR)</div>
          </div>
        </div>

        {/* Comparison: Manual Tuisyen vs Didik TuisyenNow */}
        <div className="mt-16 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Mengapa Pusat Tuisyen Perlu Berhijrah ke <span className="text-amber-400">didik.tuisyennow.my</span> Hari Ini?
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Perbandingan ketara antara cara lama manual dan cara moden automasi Didik.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* The Old Painful Way */}
            <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-6 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-900/40 text-rose-300 border border-rose-700/50 mb-4">
                ✕ Cara Lama (Manual & Menyusahkan)
              </div>
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span><strong>Slip bank WhatsApp bertimbun:</strong> Admin terpaksa buka akaun Maybank/CIMB setiap hari semak sama ada duit benar-benar masuk.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span><strong>Risiko slip palsu atau edit Canva:</strong> Terdedah kepada penipuan tangkapan skrin (screenshot) yang disunting ibu bapa.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span><strong>Kutipan yuran tertunggak berbulan:</strong> Ibu bapa lupa bayar, pusat tuisyen segan nak WhatsApp tanya satu persatu.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span><strong>Kos kertas resit & cetakan manual:</strong> Beratus ringgit hangus beli buku resit karbon dan dakwat pencetak.</span>
                </li>
              </ul>
            </div>

            {/* The Didik Smart Automation Way */}
            <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-2xl p-6 relative shadow-lg shadow-emerald-500/5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-900/50 text-emerald-300 border border-emerald-500/50 mb-4">
                ✓ Cara Didik TuisyenNow (Pantas & Automatik)
              </div>
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold mt-0.5">•</span>
                  <span><strong>Gerbang Rasmi iPay88:</strong> Ibu bapa bayar terus guna DuitNow QR atau FPX semua bank Malaysia dalam 10 saat.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold mt-0.5">•</span>
                  <span><strong>Pengesahan 100% Sah & Segera:</strong> Sistem auto kemaskini status 'PAID' tanpa perlukan admin buka bank secara manual.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold mt-0.5">•</span>
                  <span><strong>WhatsApp Bot Peringatan Automatik:</strong> Invois dan link iPay88 dihantar tepat pada tarikh yang anda tetapkan secara sopan.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold mt-0.5">•</span>
                  <span><strong>Resit PDF Sah Dimuat Turun:</strong> Resit digital bernombor siri dihantar terus ke WhatsApp ibu bapa dan disimpan di awan.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Quick Action Inside Funnel */}
          <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              💡 Boleh dihubungkan ke server PHP & MySQL sedia ada anda atau gunakan awan rasmi didik.tuisyennow.my.
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigateTab('php_code')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline"
              >
                Lihat Skrip PHP & MySQL
              </button>
              <button
                onClick={() => onOpenCheckout('growth')}
                className="px-5 py-2.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950"
              >
                Daftar Tuisyen Saya Sekarang
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
