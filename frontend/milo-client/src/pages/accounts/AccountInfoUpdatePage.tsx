import { useNavigate, useParams } from "react-router-dom";
import type { Platform } from "../../types/platform";
import { useEffect, useState } from "react";
import {
  getAccountInfoById,
  updateAccountInfo,
} from "../../services/accountInfoService";
import { getPlatforms } from "../../services/platformService";
import {
  ArrowLeft,
  ChevronDown,
  CreditCard,
  FileText,
  Mail,
  User,
  Lock,
  EyeOff,
  Eye,
} from "lucide-react";

function AccountInfoUpdatePage() {
  const { id } = useParams();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [platformId, setPlatformId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlatforms();
        setPlatforms(data);

        if (id) {
          const accountInfoData = await getAccountInfoById(id);
          setPlatformId(accountInfoData.platformId);
          setEmail(accountInfoData.email || "");
          setUsername(accountInfoData.username || "");
          setDescription(accountInfoData.description || "");
        }
      } catch (error) {
        console.error("Hesap bilgileri alınamadı:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      await updateAccountInfo({
        accountInfoId: id!,
        platformId: platformId,
        email: email,
        username: username,
        password: password,
        description: description,
      });
      navigate("/accounts");
    } catch (error) {
      console.error("Hesap bilgisi güncellenirken hata oluştu:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Geri */}
      <button
        onClick={() => navigate("/accounts")}
        className="flex items-center gap-2 text-zinc-400 hover:text-zinc-50 transition-colors mb-6 text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Hesaplara dön
      </button>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-zinc-50 mb-1">
          Hesap Bilgisi Düzenle
        </h2>
        <p className="text-zinc-400 text-sm mb-6">
          Hesap bilgilerini güncelle.
        </p>

        {/* Platform */}
        <div className="mb-4">
          <label className="text-zinc-300 text-sm mb-1 block">Platform</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <select
              value={platformId}
              onChange={(e) => setPlatformId(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 focus:outline-none focus:border-zinc-600 appearance-none"
            >
              <option value="">Seçiniz</option>
              {platforms.map((p) => (
                <option key={p.platformId} value={p.platformId}>
                  {p.platformName}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-zinc-300 text-sm mb-1 block">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hesap@mail.com"
              className="w-full pl-10 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
            />
          </div>
        </div>

        {/* Kullanıcı adı */}
        <div className="mb-4">
          <label className="text-zinc-300 text-sm mb-1 block">
            Kullanıcı Adı
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="kullanıcı adı"
              className="w-full pl-10 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
            />
          </div>
        </div>

        {/* Şifre */}
        <div className="mb-6">
          <label className="text-zinc-300 text-sm mb-1 block">Şifre</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Değiştirmek için yeni şifre girin"
              className="w-full pl-10 pr-10 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-zinc-200"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="text-zinc-600 text-xs mt-1">
            Boş bırakırsan mevcut şifren korunur.
          </p>
        </div>

        {/* Açıklama */}
        <div className="mb-6">
          <label className="text-zinc-300 text-sm mb-1 block">Açıklama</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Not (örn. iş hesabı)"
              rows={3}
              className="w-full pl-10 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 resize-none"
            />
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/accounts")}
            className="flex-1 py-2 bg-zinc-800 text-zinc-300 rounded-lg font-medium hover:bg-zinc-700 transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handleSubmit}
            disabled={!platformId}
            className="flex-1 py-2 bg-zinc-50 text-zinc-900 rounded-lg font-medium hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Güncelle
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountInfoUpdatePage;
