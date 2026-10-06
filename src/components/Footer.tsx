import React from 'react';
import { GraduationCap, ShieldCheck, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tabId: string) => void;
  onOpenCheckout: (planId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenCheckout }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-white text-base">
                Didik<span className="text-amber-400">TuisyenNow</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Sistem pengurusan pusat tuisyen moden khusus untuk pemilik SME di Malaysia. Mengautomasikan 
              kutipan yuran, resit iPay88, dan peringatan WhatsApp.
            </p>
            <div className="text-[11px] text-slate-400">
              Portal Rasmi:{' '}
              <a
                href="https://didik.tuisyennow.my"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 underline font-mono"
              >
                didik.tuisyennow.my
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Modul Sistem
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateTab('funnel')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Utama (Funnel Penukaran)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('roi')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Kalkulator ROI & Penjimatan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('pricing')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Pakej Langganan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('contacts')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Google Contacts (Penyegerakan)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('portal')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Pratonton Portal Didik
                </button>
              </li>
            </ul>
          </div>

          {/* Tech & Integrations */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Integrasi & Pembangun
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateTab('ipay88')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Gerbang Pembayaran iPay88
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('whatsapp')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Modul Automasi WhatsApp
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('traffic')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Penjana Trafik & Iklan Tuisyen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('php_code')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Kod Sumber PHP & MySQL
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Compliance */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">
              Piawaian & Keselamatan
            </h4>
            <div className="space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>iPay88 Official Gateway Partner Ready</span>
              </div>
              <p>
                Menyokong DuitNow QR, FPX B2C/B2B (Maybank, CIMB, Bank Islam, dsb.) & Kad Kredit.
              </p>
              <p>
                Mematuhi Akta Perlindungan Data Peribadi 2010 (PDPA) Malaysia.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onOpenCheckout('growth')}
                className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400"
              >
                Cuba 14 Hari Percuma
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Didik TuisyenNow (didik.tuisyennow.my). Hak Cipta Terpelihara. Khusus untuk SME Pusat Tuisyen di Malaysia.
          </div>
          <div className="flex items-center gap-1">
            <span>Dihasilkan dengan kepakaran sistem pendidikan Malaysia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
