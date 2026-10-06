import React, { useState, useEffect } from 'react';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  getAccessToken 
} from '../services/googleAuth';
import { 
  fetchUserContacts, 
  fetchOtherContacts, 
  createGoogleContact, 
  deleteGoogleContact, 
  GoogleContact 
} from '../services/googleContactsApi';
import { User } from 'firebase/auth';
import { 
  Users, 
  UserPlus, 
  Search, 
  RefreshCw, 
  Phone, 
  Mail, 
  Trash2, 
  Send, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  ShieldCheck,
  LogOut,
  Sparkles,
  Filter
} from 'lucide-react';

interface GoogleContactsManagerProps {
  onSelectContactForWhatsApp?: (contact: { name: string; phone: string }) => void;
  onImportContactAsStudent?: (contact: { name: string; phone: string; email?: string }) => void;
}

export const GoogleContactsManager: React.FC<GoogleContactsManagerProps> = ({
  onSelectContactForWhatsApp,
  onImportContactAsStudent,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  
  const [contacts, setContacts] = useState<GoogleContact[]>([]);
  const [otherContacts, setOtherContacts] = useState<GoogleContact[]>([]);
  const [activeTab, setActiveTab] = useState<'contacts' | 'other'>('contacts');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newGivenName, setNewGivenName] = useState('');
  const [newFamilyName, setNewFamilyName] = useState('');
  const [newPhone, setNewPhone] = useState('+60');
  const [newEmail, setNewEmail] = useState('');
  const [newOrg, setNewOrg] = useState('Pusat Tuisyen Didik');
  const [newNotes, setNewNotes] = useState('Ibu Bapa Pelajar SPM');
  const [isSubmittingNew, setIsSubmittingNew] = useState(false);

  // Destructive deletion confirmation modal state (MANDATORY per Workspace Skill)
  const [contactToDelete, setContactToDelete] = useState<GoogleContact | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initialize auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setIsAuthenticated(true);
        loadContacts();
      },
      () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        setContacts([]);
        setOtherContacts([]);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    setErrorMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setIsAuthenticated(true);
        await loadContacts();
      }
    } catch (err: any) {
      console.error('Google Sign In failed:', err);
      setErrorMessage(err.message || 'Gagal log masuk dengan Google.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
    setContacts([]);
    setOtherContacts([]);
    setSuccessMessage('Log keluar Google Contacts berjaya.');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const loadContacts = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const [connectionsList, otherList] = await Promise.all([
        fetchUserContacts().catch(() => []),
        fetchOtherContacts().catch(() => []),
      ]);
      setContacts(connectionsList);
      setOtherContacts(otherList);
    } catch (err: any) {
      console.error('Load contacts error:', err);
      setErrorMessage(err.message || 'Gagal memuat turun senarai kenalan Google.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add Contact Handler
  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGivenName.trim()) return;

    setIsSubmittingNew(true);
    setErrorMessage(null);

    try {
      const created = await createGoogleContact({
        givenName: newGivenName.trim(),
        familyName: newFamilyName.trim() || undefined,
        phoneNumber: newPhone.trim() || undefined,
        email: newEmail.trim() || undefined,
        organization: newOrg.trim() || undefined,
        notes: newNotes.trim() || undefined,
      });

      setContacts((prev) => [created, ...prev]);
      setIsAddModalOpen(false);
      setNewGivenName('');
      setNewFamilyName('');
      setNewPhone('+60');
      setNewEmail('');
      setSuccessMessage(`Kenalan "${created.displayName}" berjaya disimpan ke Google Contacts!`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal menyimpan kenalan ke Google Contacts.');
    } finally {
      setIsSubmittingNew(false);
    }
  };

  // Destructive delete confirmed handler
  const handleConfirmDelete = async () => {
    if (!contactToDelete) return;

    setIsDeleting(true);
    setErrorMessage(null);

    try {
      await deleteGoogleContact(contactToDelete.resourceName);
      setContacts((prev) => prev.filter((c) => c.resourceName !== contactToDelete.resourceName));
      setSuccessMessage(`Kenalan "${contactToDelete.displayName}" telah dipadam daripada akaun Google anda.`);
      setContactToDelete(null);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memadam kenalan.');
    } finally {
      setIsDeleting(false);
    }
  };

  const currentList = activeTab === 'contacts' ? contacts : otherContacts;

  const filteredList = currentList.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesName = c.displayName.toLowerCase().includes(q);
    const matchesEmail = c.emails.some((e) => e.toLowerCase().includes(q));
    const matchesPhone = c.phoneNumbers.some((p) => p.includes(q));
    const matchesOrg = c.organization?.toLowerCase().includes(q) || false;
    return matchesName || matchesEmail || matchesPhone || matchesOrg;
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>Integrasi Google Contacts Rasmi (Google People API)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Pengurusan & Penyegerakan Kenalan Ibu Bapa
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Segerakkan buku telefon Google akaun pusat tuisyen anda terus ke <strong className="text-amber-400">didik.tuisyennow.my</strong>. 
          Pilih mana-mana kenalan untuk menghantar peringatan yuran WhatsApp atau import sebagai rekod pelajar tuisyen.
        </p>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-400 underline">Tutup</button>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-rose-400 underline">Tutup</button>
        </div>
      )}

      {/* Main Body */}
      {!isAuthenticated ? (
        /* Sign-in State */
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mx-auto flex items-center justify-center mb-5">
            <Users className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Sambungkan Akaun Google Contacts Anda
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
            Dapatkan kebenaran untuk melihat, menyegerakkan, dan mengurus kenalan ibu bapa terus dari telefon pintar atau akaun Google Workspace pusat tuisyen anda.
          </p>

          {/* Official Google Sign-In Button as required by SKILL.md */}
          <div className="flex justify-center">
            <button
              onClick={handleSignIn}
              disabled={isAuthenticating}
              className="inline-flex items-center gap-3 bg-white hover:bg-slate-100 text-slate-800 font-medium px-5 py-3 rounded-full shadow-md hover:shadow-lg transition-all border border-slate-300 disabled:opacity-50 cursor-pointer"
            >
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span className="text-sm font-semibold tracking-wide">
                {isAuthenticating ? 'Menyambung ke Google...' : 'Sign in with Google'}
              </span>
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> OAuth 2.0 Rasmi
            </span>
            <span>•</span>
            <span>Token disimpan selamat dalam memori sementara</span>
          </div>
        </div>
      ) : (
        /* Authenticated View */
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Top Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            
            <div className="flex items-center gap-3">
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'Google User'}
                  className="w-11 h-11 rounded-full border-2 border-emerald-400 object-cover"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-sm">
                  {currentUser?.displayName?.[0] || 'G'}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{currentUser?.displayName || 'Akaun Google'}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                    Disambungkan
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">{currentUser?.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={loadContacts}
                disabled={isLoading}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
                <span>Segarkan</span>
              </button>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Tambah Kenalan Google</span>
              </button>

              <button
                onClick={handleSignOut}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-colors"
                title="Log Keluar Google"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Search Bar & Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'contacts'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Kenalan Utama ({contacts.length})
              </button>
              <button
                onClick={() => setActiveTab('other')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'other'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Kenalan Lain ({otherContacts.length})
              </button>
            </div>

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama, nombor telefon (+60), atau emel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

          </div>

          {/* Contacts List / Table */}
          {isLoading ? (
            <div className="py-16 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-amber-400 mb-3" />
              <p className="text-xs">Memuatkan kenalan daripada Google People API...</p>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="py-16 text-center text-slate-400 border border-dashed border-slate-800 rounded-2xl">
              <Users className="w-10 h-10 mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-semibold text-slate-300">Tiada kenalan dijumpai</p>
              <p className="text-xs text-slate-500 mt-1">
                {searchQuery ? 'Cuba ubah kata carian anda.' : 'Klik butang "Tambah Kenalan Google" untuk menambah rekod baru.'}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredList.map((contact) => {
                const primaryPhone = contact.phoneNumbers[0];
                const primaryEmail = contact.emails[0];

                return (
                  <div
                    key={contact.resourceName}
                    className="bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between transition-all group"
                  >
                    <div>
                      {/* Contact Header */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          {contact.photoUrl ? (
                            <img
                              src={contact.photoUrl}
                              alt={contact.displayName}
                              className="w-9 h-9 rounded-full object-cover border border-slate-700"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-xs">
                              {contact.displayName.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                              {contact.displayName}
                            </div>
                            {contact.organization && (
                              <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                                {contact.organization}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Delete Trigger */}
                        <button
                          onClick={() => setContactToDelete(contact)}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded-md hover:bg-slate-800 transition-colors"
                          title="Padam daripada Google Contacts"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Contact Details */}
                      <div className="space-y-1 mt-3 text-[11px] text-slate-300">
                        {primaryPhone ? (
                          <div className="flex items-center gap-2 text-emerald-400 font-mono">
                            <Phone className="w-3 h-3 text-slate-500" />
                            <span>{primaryPhone}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-slate-500 italic">
                            <Phone className="w-3 h-3" />
                            <span>Tiada nombor telefon</span>
                          </div>
                        )}

                        {primaryEmail && (
                          <div className="flex items-center gap-2 text-slate-400 truncate">
                            <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                            <span className="truncate">{primaryEmail}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                      {primaryPhone && (
                        <button
                          onClick={() => {
                            if (onSelectContactForWhatsApp) {
                              onSelectContactForWhatsApp({
                                name: contact.displayName,
                                phone: primaryPhone,
                              });
                            }
                          }}
                          className="flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center gap-1"
                          title="Pautkan ke Automasi WhatsApp"
                        >
                          <Send className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (onImportContactAsStudent) {
                            onImportContactAsStudent({
                              name: contact.displayName,
                              phone: primaryPhone || '+60123456789',
                              email: primaryEmail,
                            });
                          }
                        }}
                        className="flex-1 py-1.5 px-2 rounded-lg text-[10px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center gap-1"
                        title="Import kenalan sebagai rekod pelajar Didik"
                      >
                        <UserPlus className="w-3 h-3" />
                        <span>Import Didik</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* Modal: Tambah Kenalan Baharu ke Google Contacts */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-amber-400" />
              <span>Tambah Kenalan Baru ke Google Contacts</span>
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Kenalan ini akan disimpan terus ke akaun Google anda melalui People API.
            </p>

            <form onSubmit={handleCreateContact} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Nama Pertama *</label>
                  <input
                    type="text"
                    required
                    placeholder="cth: Puan Halimah"
                    value={newGivenName}
                    onChange={(e) => setNewGivenName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Nama Keluarga</label>
                  <input
                    type="text"
                    placeholder="cth: Kassim"
                    value={newFamilyName}
                    onChange={(e) => setNewFamilyName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Nombor Telefon (WhatsApp) *</label>
                <input
                  type="text"
                  required
                  placeholder="+60123456789"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-400 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">Emel</label>
                <input
                  type="email"
                  placeholder="ibubapa@gmail.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Organisasi</label>
                  <input
                    type="text"
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Kategori / Jawatan</label>
                  <input
                    type="text"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingNew}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-50"
                >
                  {isSubmittingNew ? 'Menyimpan ke Google...' : 'Simpan Kenalan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANDATORY WORKSPACE CONFIRMATION DIALOG FOR DESTRUCTIVE ACTIONS */}
      {contactToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-rose-900/60 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-white mb-2">
              Padam Kenalan daripada Google Contacts?
            </h3>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Adakah anda pasti mahu memadam kenalan{' '}
              <strong className="text-rose-400">"{contactToDelete.displayName}"</strong>?
              Tindakan ini akan memadam data kenalan ini secara kekal daripada akaun Google Contacts anda dan tidak boleh dikembalikan.
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 mb-6 space-y-1">
              <div>Resource ID: <span className="font-mono text-slate-300">{contactToDelete.resourceName}</span></div>
              {contactToDelete.phoneNumbers[0] && (
                <div>Telefon: <span className="text-emerald-400 font-mono">{contactToDelete.phoneNumbers[0]}</span></div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setContactToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white disabled:opacity-50 flex items-center gap-1.5"
              >
                {isDeleting ? 'Memadam...' : 'Ya, Padam Kenalan'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
