import React, { useState } from 'react';
import { PHP_MYSQL_CODE_FILES, CodeFile } from '../data/phpCodeTemplates';
import { 
  FileCode2, 
  Copy, 
  Check, 
  Download, 
  Database, 
  Server, 
  Key, 
  Terminal, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const PhpMysqlCodeHub: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<CodeFile>(PHP_MYSQL_CODE_FILES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadFile = (file: CodeFile) => {
    const blob = new Blob([file.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    PHP_MYSQL_CODE_FILES.forEach((f) => {
      handleDownloadFile(f);
    });
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
          <Server className="w-3.5 h-3.5" />
          <span>Pakej Pembangun PHP 8.1+ & MySQL 8.0</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Pusat Kod Sumber PHP, MySQL & iPay88 Malaysia
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Disediakan lengkap untuk pemilik SME tuisyen atau pembangun web yang ingin 
          memasang modul integrasi ini di cPanel hosting, VPS, atau menyambungkannya terus ke <strong className="text-amber-400">didik.tuisyennow.my</strong>.
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Top File Selector Bar */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {PHP_MYSQL_CODE_FILES.map((file) => {
              const isCurrent = selectedFile.name === file.name;
              return (
                <button
                  key={file.name}
                  onClick={() => setSelectedFile(file)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
                    isCurrent
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>{file.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Kod</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleDownloadFile(selectedFile)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Muat Turun Fail</span>
            </button>
          </div>

        </div>

        {/* File Description Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <span>{selectedFile.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-sans font-bold bg-slate-800 text-amber-400">
                {selectedFile.language.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {selectedFile.description}
            </p>
          </div>

          <button
            onClick={handleDownloadAll}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 underline flex items-center gap-1 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Muat Turun Semua 5 Fail Skrip</span>
          </button>
        </div>

        {/* Code Content Viewer */}
        <div className="p-4 sm:p-6 bg-slate-950 max-h-[520px] overflow-y-auto">
          <pre className="font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto whitespace-pre">
            <code>{selectedFile.code}</code>
          </pre>
        </div>

      </div>

      {/* Deployment Guide in Bahasa Malaysia */}
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold mb-4">
            1
          </div>
          <h4 className="text-sm font-bold text-white mb-2">Import Skema MySQL</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Buka phpMyAdmin di cPanel hosting anda, cipta pangkalan data <code className="text-amber-400">didik_tuisyennow_db</code> dan 
            import fail <code className="text-slate-300">schema_didik_tuisyen.sql</code>. Semua jadual dan kunci asing akan dibina automatik.
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-4">
            2
          </div>
          <h4 className="text-sm font-bold text-white mb-2">Konfigurasi Kunci iPay88 & Meta</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Masukkan <code className="text-emerald-400">MerchantCode</code> & <code className="text-emerald-400">MerchantKey</code> yang diperoleh 
            daripada iPay88 Malaysia ke dalam fail <code className="text-slate-300">config.php</code> berserta Token WhatsApp Cloud API.
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold mb-4">
            3
          </div>
          <h4 className="text-sm font-bold text-white mb-2">Aktifkan Cron Job Harian</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Jadualkan cron harian jam 9:00 pagi untuk menjalankan <code className="text-sky-400">cron_auto_reminder.php</code>. 
            Sistem akan menyemak yuran tertunggak dan melepaskan WhatsApp peringatan secara automatik.
          </p>
        </div>

      </div>

    </div>
  );
};
