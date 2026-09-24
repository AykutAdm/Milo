import { useEffect, useState } from "react";
import {
  deleteSubscription,
  getSubscriptions,
} from "../../services/subscriptionService";
import type { Subscription } from "../../types/subscription";
import { Link } from "react-router-dom";
import { Calendar, Pencil, Plus, Trash2 } from "lucide-react";

function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const fetchData = async () => {
    try {
      const data = await getSubscriptions();
      setSubscriptions(data);
    } catch (error) {
      console.error("Abonelikleri alırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteSubscription(id);
      await fetchData();
    } catch (error) {
      console.error("Abonelik silinirken hata oluştu:", error);
    }
  };

  return (
     <div>
      {/* Başlık + Ekle butonu */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-50">Aboneliklerim</h2>
          <p className="text-zinc-400 text-sm mt-1">
            Toplam {subscriptions.length} abonelik
          </p>
        </div>
        <Link
          to="/subscription/create"
          className="flex items-center gap-2 px-4 py-2 bg-zinc-50 text-zinc-900 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Yeni Abonelik
        </Link>
      </div>

      {/* Kart grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subscriptions.map((sub) => (
          <div
            key={sub.userSubscriptionId}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors"
          >
            {/* Üst — logo + isim */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={sub.platformIconUrl}
                alt={sub.platformName}
                className="w-18 h-18 rounded-lg object-contain bg-white p-2"
              />
              <div>
                <h3 className="font-semibold text-zinc-50 text-lg">{sub.platformName}</h3>
                <span className="text-m text-zinc-500 ">{sub.categoryName}</span>
              </div>
            </div>

            {/* Orta — fiyat + periyot */}
            <div className="mb-4">
              <span className="text-2xl font-bold text-zinc-50">
                {sub.price}₺
              </span>
              <span className="text-zinc-500 text-sm ml-1">/ {sub.period}</span>
            </div>

            {/* Yenilenme tarihi */}
            <div className="flex items-center gap-2 text-zinc-400 text-sm mb-4">
              <Calendar className="h-4 w-4" />
              <span>{new Date(sub.renewalDate).toLocaleDateString("tr-TR")}</span>
            </div>

            {/* Alt — butonlar */}
            <div className="flex gap-2">
              <Link
                to={`/subscription/update/${sub.userSubscriptionId}`}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors text-sm"
              >
                <Pencil className="h-4 w-4" />
                Düzenle
              </Link>
              <button
                onClick={() => handleDelete(sub.userSubscriptionId)}
                className="flex items-center justify-center px-3 py-2 bg-red-950 text-red-400 rounded-lg hover:bg-red-900 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Boş durum */}
      {subscriptions.length === 0 && (
        <div className="text-center py-16 text-zinc-500">
          <p>Henüz aboneliğin yok.</p>
          <Link to="/subscription/create" className="text-zinc-300 hover:underline mt-2 inline-block">
            İlk aboneliğini ekle
          </Link>
        </div>
      )}
    </div>
  );
}

export default SubscriptionPage;
