import { useEffect, useState } from "react";
import {
  deleteAccountInfo,
  getAccountInfos,
  showPassword,
} from "../../services/accountInfoService";
import type { AccountInfo } from "../../types/accountInfo";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Pencil, Plus, Trash2 } from "lucide-react";

function AccountInfoPage() {
  const [accountInfos, setAccountInfos] = useState<AccountInfo[]>([]);
  const [openedPasswordId, setOpenedPasswordId] = useState("");
  const [openedPassword, setOpenedPassword] = useState("");

  const fetchData = async () => {
    try {
      const data = await getAccountInfos();
      setAccountInfos(data);
    } catch (error) {
      console.error("Hesap bilgilerini alırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteAccountInfo(id);
      await fetchData();
    } catch (error) {
      console.error("Hesap bilgisi silinirken hata oluştu:", error);
    }
  };

  const handleShowPassword = async (id: string) => {
    if (openedPasswordId === id) {
      setOpenedPasswordId("");
      setOpenedPassword("");
      return;
    }

    try {
      const data = await showPassword(id);
      setOpenedPasswordId(id);
      setOpenedPassword(data.result);
    } catch (error) {
      console.error("Şifre gösterilirken hata oluştu:", error);
    }
  };

  return (
    <div>
      {/* Başlık + Ekle butonu */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-50">Hesaplarım</h2>
          <p className="text-zinc-400 text-sm mt-1">
            Toplam {accountInfos.length} hesap
          </p>
        </div>
        <Link
          to="/accounts/create"
          className="flex items-center gap-2 px-4 py-2 bg-zinc-50 text-zinc-900 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Yeni Hesap Bilgisi
        </Link>
      </div>

      {/* Kart grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {accountInfos.map((info) => (
          <div
            key={info.accountInfoId}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors flex flex-col"
          >
            {/* Üst — platform + kullanıcı adı */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={info.platformIconUrl}
                alt={info.platformName}
                className="w-18 h-18 rounded-lg object-contain bg-white p-2 shrink-0"
              />
              <div>
                <h3 className="font-semibold text-zinc-50">
                  {info.platformName}
                </h3>
                {info.username && (
                  <span className="text-xs text-zinc-500">{info.username}</span>
                )}
              </div>
            </div>

            {/* Email */}
            {info.email && (
              <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
                <Mail className="h-4 w-4" />
                <span>{info.email}</span>
              </div>
            )}

            {/* Açıklama */}
            {info.description && (
              <p className="text-zinc-500 text-sm mb-4">{info.description}</p>
            )}

            {/* Şifre satırı*/}
            <div className="flex items-center gap-2 text-zinc-300 text-sm mb-4 bg-zinc-950 rounded-lg px-3 py-2">
              <span className="font-mono flex-1">
                {openedPasswordId === info.accountInfoId
                  ? openedPassword
                  : "••••••••"}
              </span>
              <button
                onClick={() => handleShowPassword(info.accountInfoId)}
                className="text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                {openedPasswordId === info.accountInfoId ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Alt — butonlar */}
            <div className="flex gap-2 mt-auto">
              <Link
                to={`/accounts/update/${info.accountInfoId}`}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors text-sm"
              >
                <Pencil className="h-4 w-4" />
                Düzenle
              </Link>
              <button
                onClick={() => handleDelete(info.accountInfoId)}
                className="flex items-center justify-center px-3 py-2 bg-red-950 text-red-400 rounded-lg hover:bg-red-900 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Boş durum */}
      {accountInfos.length === 0 && (
        <div className="text-center py-16 text-zinc-500">
          <p>Henüz hesap bilgin yok.</p>
          <Link
            to="/accounts/create"
            className="text-zinc-300 hover:underline mt-2 inline-block"
          >
            İlk hesap bilgini ekle
          </Link>
        </div>
      )}
    </div>
  );
}

export default AccountInfoPage;
