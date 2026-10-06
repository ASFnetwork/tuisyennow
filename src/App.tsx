/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroFunnel } from './components/HeroFunnel';
import { RoiCalculator } from './components/RoiCalculator';
import { PricingPlans } from './components/PricingPlans';
import { IPay88Simulator } from './components/IPay88Simulator';
import { WhatsAppAutomation } from './components/WhatsAppAutomation';
import { TrafficGenerator } from './components/TrafficGenerator';
import { DidikSystemPreview } from './components/DidikSystemPreview';
import { PhpMysqlCodeHub } from './components/PhpMysqlCodeHub';
import { TestimonialsFaq } from './components/TestimonialsFaq';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { Plan } from './types';
import { ExternalLink, CheckCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('funnel');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('growth');

  const handleOpenCheckout = (planId?: string) => {
    if (planId) setSelectedPlanId(planId);
    setIsCheckoutOpen(true);
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlanId(plan.id);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = (details: any) => {
    // When iPay88 succeeds in simulator, notify and optionally link to WhatsApp tab
    console.log('Payment successful:', details);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Banner Alert for Malaysian Tuition Owners */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 text-slate-950 text-xs font-bold py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span>🇲🇾 Tawaran Pembukaan 2026: Percuma 14 Hari Tanpa Kad Kredit untuk Pusat Tuisyen Malaysia di</span>
          <a
            href="https://didik.tuisyennow.my"
            target="_blank"
            rel="noopener noreferrer"
            className="underline inline-flex items-center gap-1 font-extrabold hover:text-white transition-colors"
          >
            didik.tuisyennow.my
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'funnel' && (
          <div>
            <HeroFunnel
              onOpenCheckout={handleOpenCheckout}
              onNavigateTab={setActiveTab}
            />

            {/* Quick Teaser Sections on Main Funnel */}
            <div className="border-t border-slate-900 bg-slate-950/60">
              <RoiCalculator onOpenCheckout={handleOpenCheckout} />
            </div>

            <div className="border-t border-slate-900 bg-slate-950">
              <PricingPlans onSelectPlan={handleSelectPlan} />
            </div>

            <div className="border-t border-slate-900 bg-slate-950/80">
              <TestimonialsFaq />
            </div>

            {/* Bottom Conversion Call To Action */}
            <div className="py-20 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800 text-center relative overflow-hidden">
              <div className="max-w-3xl mx-auto relative z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4 inline-block">
                  Sertai 480+ Pusat Tuisyen di Malaysia
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Sedia Untuk Mengautomasikan Kutipan Yuran Tuisyen Anda?
                </h2>
                <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
                  Daftar akaun sekarang di <strong className="text-amber-400">didik.tuisyennow.my</strong>. 
                  Jimat berpuluh jam kerja manual dan elakkan kerugian yuran tertunggak setiap bulan.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => handleOpenCheckout('growth')}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Daftar Percuma 14 Hari Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="https://didik.tuisyennow.my"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2"
                  >
                    <span>Lawati didik.tuisyennow.my</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roi' && (
          <div className="pt-4 pb-12">
            <RoiCalculator onOpenCheckout={handleOpenCheckout} />
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="pt-4 pb-12">
            <PricingPlans onSelectPlan={handleSelectPlan} />
          </div>
        )}

        {activeTab === 'ipay88' && (
          <div className="pt-4 pb-12">
            <IPay88Simulator onPaymentSuccess={handlePaymentSuccess} />
          </div>
        )}

        {activeTab === 'whatsapp' && (
          <div className="pt-4 pb-12">
            <WhatsAppAutomation />
          </div>
        )}

        {activeTab === 'portal' && (
          <div className="pt-4 pb-12">
            <DidikSystemPreview onOpenCheckout={handleOpenCheckout} />
          </div>
        )}

        {activeTab === 'traffic' && (
          <div className="pt-4 pb-12">
            <TrafficGenerator />
          </div>
        )}

        {activeTab === 'php_code' && (
          <div className="pt-4 pb-12">
            <PhpMysqlCodeHub />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateTab={setActiveTab}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* Checkout & Registration Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPlanId={selectedPlanId}
        onNavigateTab={setActiveTab}
      />

    </div>
  );
}
