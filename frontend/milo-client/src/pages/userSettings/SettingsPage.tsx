import { useEffect, useState } from "react";
import {
  changePassword,
  disable2fa,
  enable2fa,
  get2faStatus,
  setup2fa,
  updateProfile,
} from "../../services/authService";
import { Eye, EyeOff, KeyRound, ShieldCheck, Smartphone, User } from "lucide-react";

// Tüm input'lar aynı görünsün diye class'ı tek yerde tuttum
const inputClass =
  "w-full px-3.5 py-2.5 bg-zinc-950/60 border border-zinc-800 rounded-xl text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition";

function SettingsPage() {
  const [qrImage, setQrImage] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  // Profil state
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [profileImageUrl, setProfileImageUrl] = useState(user.profileImageUrl);
  const [profileMessage, setProfileMessage] = useState("");

  // Şifre state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    get2faStatus().then(setIsEnabled).catch(console.error);
  }, []);

  const handleStartSetup = async () => {
    const data = await setup2fa();
    setQrImage(data.qrCodeImage);
  };

  const handleEnable = async () => {
    try {
      await enable2fa(code);
      setMessage("İki faktörlü doğrulama açıldı.");
      setQrImage("");
      setCode("");
      setIsEnabled(true);
    } catch {
      setMessage("Kod hatalı.");
    }
  };

  const handleDisable = async () => {
    await disable2fa();
    setMessage("İki faktörlü doğrulama kapatıldı.");
    setIsEnabled(false);
  };

  const handleUpdateProfile = async () => {
    try {
      const data = await updateProfile(firstName, lastName, profileImageUrl);
      setProfileMessage("Profil güncellendi.");

      const updatedUser = {
        ...user,
        firstName: data.firstName,
        lastName: data.lastName,
        profileImageUrl: data.profileImageUrl,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch {
      setProfileMessage("Güncelleme başarısız.");
    }
  };

  // Şifre değiştir
  const handleChangePassword = async () => {
    try {
      await changePassword(currentPassword, newPassword);
      setPasswordMessage("Şifre değiştirildi.");
      setCurrentPassword("");
      setNewPassword("");
    } catch {
      setPasswordMessage("Şifre değiştirilemedi. Mevcut şifreni kontrol et.");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Ayarlar
        </h2>
        <p className="text-zinc-500 text-sm mt-1">
          Hesap ve güvenlik ayarların
        </p>
      </div>

      {/* Profil ve şifre kartları geniş ekranda yan yana */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* PROFİL KARTI */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-zinc-50">Profil Bilgileri</h3>
              <p className="text-zinc-500 text-sm">Ad ve soyadını güncelle</p>
            </div>
          </div>

          {/* Profil resmi önizlemesi */}
          <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-zinc-950/40 border border-zinc-800">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Profil"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500/40"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                <User className="h-6 w-6" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-zinc-50 font-medium truncate">
                {firstName} {lastName}
              </p>
              <p className="text-zinc-500 text-sm truncate">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Ad</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Soyad</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Uzun URL sığsın diye iki sütunu da kaplıyor */}
            <div className="sm:col-span-2">
              <label className="text-zinc-400 text-sm mb-1.5 block">
                Profil Resmi URL
              </label>
              <input
                type="text"
                value={profileImageUrl}
                onChange={(e) => setProfileImageUrl(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <button
            onClick={handleUpdateProfile}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-500 transition-colors"
          >
            Kaydet
          </button>

          {profileMessage && (
            <p className="text-sm text-zinc-400 mt-3">{profileMessage}</p>
          )}
        </div>

        {/* ŞİFRE KARTI */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-zinc-50">Şifre Değiştir</h3>
              <p className="text-zinc-500 text-sm">Hesap şifreni güncelle</p>
            </div>
          </div>

          <div className="space-y-4 mb-5">
            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">
                Mevcut Şifre
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">
                Yeni Şifre
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-zinc-200"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleChangePassword}
            disabled={!currentPassword || !newPassword}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-500 transition-colors disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed"
          >
            Şifreyi Değiştir
          </button>

          {passwordMessage && (
            <p className="text-sm text-zinc-400 mt-3">{passwordMessage}</p>
          )}
        </div>
      </div>

      {/* 2FA kartı — durumuna göre yeşil ya da gri tonlu */}
      <div
        className={`bg-zinc-900/60 bg-linear-to-br to-transparent border rounded-2xl overflow-hidden ${
          isEnabled
            ? "from-emerald-500/10 border-emerald-500/25"
            : "from-transparent border-zinc-800"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
          <div className="flex gap-4">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${
                isEnabled
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-zinc-50">
                  İki Faktörlü Doğrulama
                </h3>
                {/* Durum rozeti */}
                {isEnabled ? (
                  <span className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Aktif
                  </span>
                ) : (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-500">
                    Pasif
                  </span>
                )}
              </div>
              <p className="text-zinc-500 text-sm mt-1 max-w-xl">
                {isEnabled
                  ? "Hesabın iki faktörlü doğrulama ile korunuyor."
                  : "Giriş yaparken şifrene ek olarak telefonundaki 6 haneli kodu iste. Hesabını çok daha güvenli hale getirir."}
              </p>
            </div>
          </div>

          {/* Sağdaki buton: duruma göre değişiyor */}
          {isEnabled ? (
            <button
              onClick={handleDisable}
              className="px-5 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/20 transition-colors shrink-0"
            >
              Devre Dışı Bırak
            </button>
          ) : (
            !qrImage && (
              <button
                onClick={handleStartSetup}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-500 transition-colors shrink-0"
              >
                <ShieldCheck className="h-4 w-4" />
                Etkinleştir
              </button>
            )
          )}
        </div>

        {/* QR + kod adımı (sadece kurulum sırasında görünür) */}
        {!isEnabled && qrImage && (
          <div className="flex flex-col md:flex-row gap-6 p-6 border-t border-zinc-800">
            <div className="shrink-0">
              <div className="flex items-center gap-2 text-zinc-400 text-sm mb-3">
                <Smartphone className="h-4 w-4" />
                <span>1. QR kodu okut</span>
              </div>
              <img
                src={qrImage}
                alt="QR"
                className="w-44 h-44 bg-white rounded-xl p-2"
              />
            </div>

            <div className="flex-1 max-w-sm">
              <div className="flex items-center gap-2 text-zinc-400 text-sm mb-3">
                <KeyRound className="h-4 w-4" />
                <span>2. Uygulamadaki kodu gir</span>
              </div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className={`${inputClass} text-center text-xl tracking-[0.3em] py-3 mb-3`}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleEnable}
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-500 transition-colors"
                >
                  Doğrula ve Aç
                </button>
                <button
                  onClick={() => {
                    setQrImage("");
                    setCode("");
                  }}
                  className="px-4 py-2.5 bg-zinc-800 text-zinc-400 rounded-xl text-sm hover:bg-zinc-700"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        )}

        {message && (
          <div className="mx-6 mb-6 px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-sm text-zinc-300">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;
