import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/mockData';
import { Star, ChevronDown, MessageSquareQuote, HelpCircle, ShieldCheck } from 'lucide-react';

export const TestimonialsFaq: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const testimonials = [
    {
      name: 'Cikgu Farhan Azman',
      center: 'Pusat Tuisyen Bestari Skor (Bangi & Kajang)',
      students: '180 Pelajar SPM & PT3',
      rating: 5,
      content: 'Dulu kami habiskan 3 hingga 4 hari setiap awal bulan semak tangkapan skrin resit Maybank/CIMB di WhatsApp seorang-seorang. Sejak guna Didik TuisyenNow dengan integrasi iPay88, 90% yuran lunas dalam tempoh 48 jam secara automatik!',
    },
    {
      name: 'Puan Christina Lee',
      center: 'EduSmart Academy (Bayan Lepas, Pulau Pinang)',
      students: '240 Pelajar SJKC & Menengah',
      rating: 5,
      content: 'Ibu bapa sangat puji sebab mereka boleh bayar terus guna DuitNow QR atau FPX. Resit PDF rasmi masuk ke WhatsApp serta-merta tanpa perlu tunggu admin kami balas. Sangat profesional untuk imej pusat tuisyen.',
    },
    {
      name: 'Cikgu Zulkarnain bin Ahmad',
      center: 'Akademi Aspirasi Jaya (Skudai, Johor Bahru)',
      students: '95 Pelajar Tingkatan 1 - 5',
      rating: 5,
      content: 'Sebagai pemilik SME kecil, saya tiada bajet nak upah ramai kerani. Skrip PHP dan automasi cron harian Didik telah jimatkan lebih 25 jam masa kerja saya sebulan. Sangat berbaloi melanggan di didik.tuisyennow.my!',
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Testimonials Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
          <MessageSquareQuote className="w-3.5 h-3.5" />
          <span>Kisah Kejayaan Pemilik Tuisyen Tempatan</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Dipercayai Oleh Ratusan Pengusaha Tuisyen di Seluruh Malaysia
        </h2>
      </div>

      {/* Testimonial Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6">
                "{t.content}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="font-bold text-white text-sm">{t.name}</div>
              <div className="text-xs text-amber-400 font-medium">{t.center}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{t.students}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Soalan Lazim (FAQ)</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Segala Yang Anda Perlu Tahu Mengenai Didik TuisyenNow
          </h3>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-amber-400 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 font-sans">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
