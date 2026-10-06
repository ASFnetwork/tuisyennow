import React, { useState } from 'react';
import { SAMPLE_STUDENTS } from '../data/mockData';
import { Student } from '../types';
import { 
  GraduationCap, 
  Users, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Send, 
  DollarSign, 
  Plus, 
  FileText, 
  Download,
  CreditCard,
  QrCode,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface DidikSystemPreviewProps {
  onOpenCheckout: (planId?: string) => void;
}

export const DidikSystemPreview: React.FC<DidikSystemPreviewProps> = ({ onOpenCheckout }) => {
  const [students, setStudents] = useState<Student[]>(SAMPLE_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [notificationSentId, setNotificationSentId] = useState<string | null>(null);

  // Filter students
  const filteredStudents = students.filter((stu) => {
    const matchesSearch = 
      stu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stu.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stu.icNumber.includes(searchQuery) ||
      stu.grade.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || stu.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalStudents = students.length;
  const paidCount = students.filter(s => s.paymentStatus === 'paid').length;
  const overdueCount = students.filter(s => s.paymentStatus === 'overdue').length;
  const totalCollected = students
    .filter(s => s.paymentStatus === 'paid')
    .reduce((acc, curr) => acc + curr.monthlyFee, 0);
  const totalOverdue = students
    .filter(s => s.paymentStatus === 'overdue')
    .reduce((acc, curr) => acc + curr.monthlyFee, 0);

  const handleSendReminder = (student: Student) => {
    setNotificationSentId(student.id);
    setTimeout(() => {
      setNotificationSentId(null);
    }, 3000);
  };

  const handleMarkAsPaid = (studentId: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          paymentStatus: 'paid',
          lastPaymentDate: new Date().toISOString().split('T')[0],
        };
      }
      return s;
    }));
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Banner / System Branding */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  LIVE PORTAL PREVIEW
                </span>
                <span className="text-xs text-slate-400">didik.tuisyennow.my</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Pusat Tuisyen Bintang Cemerlang (Cawangan Shah Alam)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Papan Pemuka Pentadbir: Pengurusan Yuran, Kehadiran, & Automasi iPay88
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => onOpenCheckout('growth')}
              className="flex-1 lg:flex-none px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
            >
              Langgan Akses Penuh
            </button>
            <a
              href="https://didik.tuisyennow.my"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
            >
              <span>Log Masuk</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Dashboard Financial Summary Cards */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-400" /> Jumlah Pelajar Berdaftar
            </span>
            <div className="text-2xl font-black text-white mt-1">{totalStudents} Orang</div>
            <div className="text-[11px] text-emerald-400 mt-0.5">100% Aktif</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Yuran Berjaya Dikutip (Bulan Ini)
            </span>
            <div className="text-2xl font-black text-emerald-400 mt-1">RM {totalCollected.toLocaleString()}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{paidCount} Pelajar Selesai Bayar</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" /> Yuran Belum Dibayar / Tertunggak
            </span>
            <div className="text-2xl font-black text-rose-400 mt-1">RM {totalOverdue.toLocaleString()}</div>
            <div className="text-[11px] text-rose-400/80 mt-0.5">{overdueCount} Pelajar Perlu Diingatkan</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-amber-400" /> Purata Masa Bayaran
            </span>
            <div className="text-2xl font-black text-amber-400 mt-1">1.8 Hari</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Melalui WhatsApp + iPay88 FPX</div>
          </div>
        </div>

      </div>

      {/* Student List Table & Actions */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        
        {/* Table Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama pelajar, no IC, atau nama ibu bapa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'all'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Semua ({students.length})
            </button>
            <button
              onClick={() => setStatusFilter('paid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'paid'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Lunas (Paid)
            </button>
            <button
              onClick={() => setStatusFilter('overdue')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'overdue'
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Tertunggak (Overdue)
            </button>
          </div>

        </div>

        {/* Table Content */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Pelajar & Tingkatan</th>
                <th className="py-3 px-4">Subjek Didaftar</th>
                <th className="py-3 px-4">Ibu Bapa / Telefon</th>
                <th className="py-3 px-4">Yuran Bulanan</th>
                <th className="py-3 px-4">Status Bayaran</th>
                <th className="py-3 px-4 text-right">Tindakan Automasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredStudents.map((stu) => {
                const isSent = notificationSentId === stu.id;

                return (
                  <tr key={stu.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* Student Info */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-xs">{stu.name}</div>
                      <div className="text-[11px] text-amber-400 font-medium">{stu.grade}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{stu.icNumber}</div>
                    </td>

                    {/* Subjects */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {stu.subjects.map((sub, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-300 border border-slate-700/60"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Parent & Phone */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-200">{stu.parentName}</div>
                      <div className="text-[11px] text-emerald-400 font-mono">{stu.parentPhone}</div>
                    </td>

                    {/* Fee Amount */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">RM {stu.monthlyFee}</div>
                      <div className="text-[10px] text-slate-400">Oktober 2026</div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {stu.paymentStatus === 'paid' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle className="w-3 h-3" /> LUNAS (PAID)
                        </span>
                      )}
                      {stu.paymentStatus === 'overdue' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse">
                          <AlertCircle className="w-3 h-3" /> TERTUNGGAK
                        </span>
                      )}
                      {stu.paymentStatus === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                          <Clock className="w-3 h-3" /> MENUNGGU FPX
                        </span>
                      )}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {stu.paymentStatus !== 'paid' ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleSendReminder(stu)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                                isSent
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              }`}
                            >
                              <Send className="w-3 h-3" />
                              <span>{isSent ? 'Terkirim!' : 'Peringatan WA'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleMarkAsPaid(stu.id)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                              title="Tandakan sebagai dibayar secara manual / tunai"
                            >
                              Sahkan Bayar
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-mono">
                              Dibayar {stu.lastPaymentDate}
                            </span>
                            <button
                              type="button"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                              title="Muat Turun Resit PDF"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
