import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Platform } from "../../types/platform";
import {
  getSubscriptionById,
  updateSubscription,
} from "../../services/subscriptionService";
import { getPlatforms } from "../../services/platformService";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  CreditCard,
  RefreshCw,
  Tag,
} from "lucide-react";

function SubscriptionUpdatePage() {
  const { id } = useParams();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [platformId, setPlatformId] = useState("");
  const [price, setPrice] = useState("");
  const [period, setPeriod] = useState("Aylık");
  const [renewalDate, setRenewalDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlatforms();
        setPlatforms(data);

        if (id) {
          const subscriptionData = await getSubscriptionById(id);
          setPlatformId(subscriptionData.platformId);
          setPrice(subscriptionData.price.toString());
          setPeriod(subscriptionData.period);
          setRenewalDate(subscriptionData.renewalDate.split("T")[0]);
        }
      } catch (error) {
        console.error("Platformlar alınamadı:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      await updateSubscription({
        userSubscriptionId: id!,
        price: Number(price),
        period: period,
        renewalDate: renewalDate,
        userSubscriptionStatus: 1,
        platformId: platformId,
      });
      navigate("/subscription");
    } catch (error) {
      console.error("Abonelik güncellenemedi:", error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
       <div className="max-w-xl w-full">
        {/* Geri */}
        <button
          onClick={() => navigate("/subscription")}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-50 transition-colors mb-6 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Aboneliklere dön
        </button>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-zinc-50 mb-1">
            Abonelik Düzenle
          </h2>
          <p className="text-zinc-400 text-sm mb-6">
            Abonelik bilgilerini güncelle.
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

          {/* Fiyat */}
          <div className="mb-4">
            <label className="text-zinc-300 text-sm mb-1 block">
              Fiyat (₺)
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full pl-10 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>

          {/* Periyot */}
          <div className="mb-4">
            <label className="text-zinc-300 text-sm mb-1 block">Periyot</label>
            <div className="relative">
              <RefreshCw className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full pl-10 pr-10 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 focus:outline-none focus:border-zinc-600 appearance-none"
              >
                <option value="Aylık">Aylık</option>
                <option value="Yıllık">Yıllık</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
            </div>
          </div>

          {/* Tarih */}
          <div className="mb-6">
            <label className="text-zinc-300 text-sm mb-1 block">
              Yenilenme Tarihi
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="date"
                value={renewalDate}
                onChange={(e) => setRenewalDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/subscription")}
              className="flex-1 py-2 bg-zinc-800 text-zinc-300 rounded-lg font-medium hover:bg-zinc-700 transition-colors"
            >
              İptal
            </button>
            <button
              onClick={handleSubmit}
              disabled={!platformId || !price || !renewalDate}
              className="flex-1 py-2 bg-zinc-50 text-zinc-900 rounded-lg font-medium hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Güncelle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionUpdatePage;
