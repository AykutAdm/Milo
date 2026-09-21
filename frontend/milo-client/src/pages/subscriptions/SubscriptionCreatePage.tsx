import { useEffect, useState } from "react";
import type { Platform } from "../../types/platform";
import { getPlatforms } from "../../services/platformService";
import { createSubscription } from "../../services/subscriptionService";
import { useNavigate } from "react-router-dom";

function SubscriptionCreatePage() {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [platformId, setPlatformId] = useState("");
  const [price, setPrice] = useState("");
  const [period, setPeriod] = useState("Aylık");
  const [renewalDate, setRenewalDate] = useState("");

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const data = await getPlatforms();
        setPlatforms(data);
      } catch (error) {
        console.error("Platformlar alınamadı:", error);
      }
    };

    fetchPlatforms();
  }, []);

  const handleSubmit = async () => {
    try {
      await createSubscription({
        price: Number(price),
        period: period,
        renewalDate: renewalDate,
        userSubscriptionStatus: 1,
        platformId: platformId,
      });
      navigate("/subscription");
    } catch (error) {
      console.error("Abonelik eklenemedi:", error);
    }
  };

  return (
    <div>
      <h3>Yeni Abonelik Ekle</h3>

      <div>
        <label>Platform: </label>
        <select
          value={platformId}
          onChange={(e) => setPlatformId(e.target.value)}
        >
          <option value="">Seçiniz</option>
          {platforms.map((p) => (
            <option key={p.platformId} value={p.platformId}>
              {p.platformName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Fiyat: </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <label>Periyot: </label>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="Aylık">Aylık</option>
          <option value="Yıllık">Yıllık</option>
        </select>
      </div>

      <div>
        <label>Yenilenme Tarihi: </label>
        <input
          type="date"
          value={renewalDate}
          onChange={(e) => setRenewalDate(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>Ekle</button>
    </div>
  );
}

export default SubscriptionCreatePage;
