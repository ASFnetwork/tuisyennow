import React, { useState } from 'react';
import { TUITION_PLANS } from '../data/mockData';
import { Check, Sparkles, Shield, Zap, ArrowRight, ExternalLink } from 'lucide-react';
import { Plan } from '../types';

interface PricingPlansProps {
  onSelectPlan: (plan: Plan) => void;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>Pakej Langganan Rasmi didik.tuisyennow.my</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Pilih Pelan Yang Sesuai Untuk Skala Tuisyen Anda
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base">
          Semua pelan disertakan percubaan percuma 14 hari, modul integrasi iPay88, 
          dan sistem automasi WhatsApp sedia guna di Malaysia.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="mt-8 inline-flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
              billingCycle === 'monthly'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bayaran Bulanan
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-5 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
              billingCycle === 'annual'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Bayaran Tahunan</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/30">
              Jimat 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        {TUITION_PLANS.map((plan) => {
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          const isGrowth = plan.popular;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-3xl p-7 transition-all ${
                isGrowth
                  ? 'bg-slate-900/95 border-2 border-amber-500/80 shadow-2xl shadow-amber-500/10 scale-105 z-10'
                  : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700 shadow-xl'
              }`}
            >
              {/* Top Badge */}
              {plan.badge && (
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                      isGrowth
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Title & Limits */}
              <h3 className="text-xl font-black text-white">{plan.name}</h3>
              <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                <span>{plan.maxStudents}</span>
                <span>•</span>
                <span>{plan.maxTutors}</span>
              </div>

              {/* Price Tag */}
              <div className="mt-6 flex items-baseline gap-2 pb-6 border-b border-slate-800">
                <span className="text-sm font-semibold text-slate-400 line-through">
                  RM {plan.originalPrice}
                </span>
                <span className="text-4xl sm:text-5xl font-black text-white">
                  RM {price}
                </span>
                <span className="text-xs text-slate-400 font-medium">/ bulan</span>
              </div>

              {/* Features List */}
              <div className="mt-6 flex-1 space-y-3.5">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                  Ciri-Ciri Termasuk:
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="mt-0.5 rounded-full p-0.5 bg-emerald-500/20 text-emerald-400">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
                    isGrowth
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <span>Langgan Pelan Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[11px] text-slate-400 mt-2">
                  Cuba 14 hari percuma dahulu di portal Didik
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enterprise / Custom Consultation Banner */}
      <div className="mt-14 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Pusat Tuisyen Mempunyai Lebih 500 Pelajar & Berbilang Cawangan?</span>
          </h4>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Kami menyediakan pakej Dedicated Enterprise dengan integrasi API iPay88 B2B tersendiri,
            pelayan pangkalan data MySQL peribadi berprestasi tinggi, dan sesi latihan kakitangan di lokasi anda.
          </p>
        </div>
        <a
          href="https://didik.tuisyennow.my"
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-6 py-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-750 text-amber-400 border border-amber-500/30 flex items-center gap-2"
        >
          <span>Hubungi Pasukan Didik</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
};
