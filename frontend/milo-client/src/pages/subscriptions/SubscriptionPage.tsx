import { useEffect, useState } from "react";
import {
  deleteSubscription,
  getSubscriptions,
} from "../../services/subscriptionService";
import type { Subscription } from "../../types/subscription";
import { Link } from "react-router-dom";

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
      <h2>Aboneliklerim</h2>
      {subscriptions.map((sub) => (
        <div key={sub.userSubscriptionId}>
          <p>
            {sub.platformName} - {sub.price}₺ - {sub.categoryName}
          </p>
          <p>
            {sub.platformName} - {sub.period}
          </p>

          <img
            src={sub.platformIconUrl}
            alt={`${sub.platformName} icon`}
            style={{ width: "50px", height: "50px" }}
          />

          <button onClick={() => handleDelete(sub.userSubscriptionId)}>
            Aboneliği Sil
          </button>
        </div>
      ))}
      <Link to="/subscription/create">
        <button>Yeni Abonelik Ekle</button>
      </Link>
    </div>
  );
}

export default SubscriptionPage;
