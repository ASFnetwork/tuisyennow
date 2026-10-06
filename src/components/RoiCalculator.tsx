import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, TrendingUp, Clock, DollarSign, Sparkles, CheckCircle2 } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenCheckout: (planId?: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenCheckout }) => {
  const [studentCount, setStudentCount] = useState<number>(120);
  const [avgFee, setAvgFee] = useState<number>(180);
  const [overduePercent, setOverduePercent] = useState<number>(18);
  const [adminHoursPerWeek, setAdminHoursPerWeek] = useState<number>(10);

  // Computations
  const calculations = useMemo(() => {
    const monthlyGrossRevenue = studentCount * avgFee;
    const annualGrossRevenue = monthlyGrossRevenue * 12;

    // Money currently stuck / late each month
    const monthlyStuckRevenue = (monthlyGrossRevenue * overduePercent) / 100;
    const annualStuckRevenue = monthlyStuckRevenue * 12;

    // With Didik TuisyenNow automated WhatsApp reminders + 1-click iPay88 link, recovery rate is estimated at 85%
    const monthlyRecovered = monthlyStuckRevenue * 0.85;
    const annualRecovered = monthlyRecovered * 12;

    // Admin time saved (80% of manual checking slips eliminated)
    const annualAdminHoursSaved = adminHoursPerWeek * 52 * 0.8;
    const hourlyStaffCost = 15; // RM15/hr average admin cost
    const annualAdminCostSaved = annualAdminHoursSaved * hourlyStaffCost;

    // Paper receipt printing & stationery saved (approx RM2 per student per month)
    const annualPaperSaved = studentCount * 2 * 12;

    // Total Financial Benefit
    const totalAnnualBenefit = annualRecovered + annualAdminCostSaved + annualPaperSaved;

    // Didik Growth plan cost: RM189/mo * 12 = RM2,268/yr
    const annualSystemCost = 189 * 12;
    const netAnnualGain = totalAnnualBenefit - annualSystemCost;
    const roiPercentage = ((netAnnualGain / annualSystemCost) * 100).toFixed(0);

    return {
      monthlyGrossRevenue,
      annualGrossRevenue,
      monthlyStuckRevenue,
      annualStuckRevenue,
      monthlyRecovered,
      annualRecovered,
      annualAdminHoursSaved: Math.round(annualAdminHoursSaved),
      annualAdminCostSaved,
      annualPaperSaved,
      totalAnnualBenefit,
      annualSystemCost,
      netAnnualGain,
      roiPercentage,
    };
  }, [studentCount, avgFee, overduePercent, adminHoursPerWeek]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Kalkulator Penjimatan & ROI Tuisyen Malaysia</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Kira Berapa Ribu Ringgit Pusat Tuisyen Anda Boleh Diselamatkan
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Masukkan anggaran operasi pusat tuisyen anda di bawah. Sistem pintar kami akan mengira 
          kebocoran aliran tunai dan anggaran pulangan modal jika anda menggunakan automasi Didik.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Sliders Input Panel */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>⚙️ Parameter Pusat Tuisyen Anda</span>
          </h3>

          {/* Slider 1: Student Count */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300">Bilangan Pelajar Aktif</label>
              <span className="text-sm font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                {studentCount} Pelajar
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="5"
              value={studentCount}
              onChange={(e) => setStudentCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>20 Pelajar (Tuisyen Rumah)</span>
              <span>500+ Pelajar (Rangkaian Besar)</span>
            </div>
          </div>

          {/* Slider 2: Average Monthly Fee */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300">Purata Yuran Sebulan Setiap Pelajar</label>
              <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                RM {avgFee} / Pelajar
              </span>
            </div>
            <input
              type="range"
              min="60"
              max="450"
              step="10"
              value={avgFee}
              onChange={(e) => setAvgFee(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>RM60 (Sekolah Rendah)</span>
              <span>RM450 (Pakej Lengkap SPM / IGCSE)</span>
            </div>
          </div>

          {/* Slider 3: Overdue Percentage */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300">Kadar Yuran Tertunggak / Lambat Bayar</label>
              <span className="text-sm font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded border border-rose-500/20">
                {overduePercent}% daripada yuran
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              step="1"
              value={overduePercent}
              onChange={(e) => setOverduePercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>5% (Sangat Pantas)</span>
              <span>40% (Kerap Tertunggak 1-2 Bulan)</span>
            </div>
          </div>

          {/* Slider 4: Admin Hours */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300">Masa Admin Semak Resit & WhatsApp Seminggu</label>
              <span className="text-sm font-bold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/20">
                {adminHoursPerWeek} Jam / Minggu
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="35"
              step="1"
              value={adminHoursPerWeek}
              onChange={(e) => setAdminHoursPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>2 Jam</span>
              <span>35 Jam (Hampir Pekerja Penuh Masa)</span>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <div>
              <span className="text-slate-400">Anggaran Hasil Kasar Bulanan:</span>
              <div className="text-base font-bold text-white">RM {calculations.monthlyGrossRevenue.toLocaleString()} / bln</div>
            </div>
            <div className="text-right">
              <span className="text-rose-400">Risiko Tertunggak Semasa:</span>
              <div className="text-base font-bold text-rose-400">RM {Math.round(calculations.monthlyStuckRevenue).toLocaleString()} / bln</div>
            </div>
          </div>
        </div>

        {/* Calculated Results / Output Card */}
        <div className="lg:col-span-6 bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Hasil Penjimatan Didik</span>
              <h3 className="text-xl font-black text-white mt-0.5">Nilai Tambah Bersih Pusat Tuisyen Anda</h3>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Anggaran ROI</span>
              <span className="text-xl font-extrabold text-emerald-400">+{calculations.roiPercentage}%</span>
            </div>
          </div>

          {/* Key Metric Highlights */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            
            <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-4">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
                <TrendingUp className="w-4 h-4" /> Yuran Diselamatkan
              </div>
              <div className="text-2xl font-black text-white">
                RM {Math.round(calculations.annualRecovered).toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Setahun diselamatkan dari tunggakan lapuk dengan iPay88 + WhatsApp
              </p>
            </div>

            <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-4">
              <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold mb-1">
                <Clock className="w-4 h-4" /> Masa Admin Dijimatkan
              </div>
              <div className="text-2xl font-black text-white">
                {calculations.annualAdminHoursSaved} Jam
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Setahun (Bernilai ~RM {Math.round(calculations.annualAdminCostSaved).toLocaleString()} gaji kakitangan)
              </p>
            </div>

          </div>

          {/* Breakdown List */}
          <div className="mt-6 space-y-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Yuran bulanan kembali ke akaun bank:</span>
              <strong className="text-emerald-400">+RM {Math.round(calculations.monthlyRecovered).toLocaleString()} / bulan</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Kos kertas resit & toner pencetak dijimatkan:</span>
              <strong className="text-slate-200">+RM {calculations.annualPaperSaved.toLocaleString()} / tahun</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Kos langganan Pelan Didik Growth (RM189 x 12):</span>
              <span className="text-slate-400">-RM {calculations.annualSystemCost.toLocaleString()} / tahun</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
              <span>Keuntungan Bersih Aliran Tunai:</span>
              <span className="text-amber-400">RM {Math.round(calculations.netAnnualGain).toLocaleString()} / tahun</span>
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <button
              onClick={() => onOpenCheckout('growth')}
              className="w-full py-4 px-6 rounded-xl font-black text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Kunci Penjimatan Ini di didik.tuisyennow.my</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              Daftar dalam 2 minit. 14 hari percubaan percuma sepenuhnya tanpa risiko.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
