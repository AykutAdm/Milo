import { useEffect, useState } from "react";
import type { SpendByCategory } from "../../types/report";
import type { Subscription, UpcomingRenewal } from "../../types/subscription";
import type { UserNotification } from "../../types/notification";
import {
  getMonthlyTotal,
  getSpendByCategory,
} from "../../services/reportService";
import {
  getSubscriptions,
  getUpcomingRenewals,
} from "../../services/subscriptionService";
import { getLatestNotifications } from "../../services/notificationService";
import { Bell, CalendarClock, CreditCard, Wallet } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#3b82f6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
];
export function DashboardPage() {
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [spendByCategory, setSpendByCategory] = useState<SpendByCategory[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [upcoming, setUpcoming] = useState<UpcomingRenewal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMonthlyTotal(await getMonthlyTotal());
        setSpendByCategory(await getSpendByCategory());
        setSubscriptions(await getSubscriptions());
        setNotifications(await getLatestNotifications(4));
        setUpcoming(await getUpcomingRenewals(7));
      } catch (error) {
        console.error("Dashboard verileri alınamadı:", error);
      }
    };
    fetchData();
  }, []);

  const daysLeft = (date: string) => {
    const diff = Math.ceil(
      (new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    return diff;
  };

  return (
    <div>
      {/* Başlık */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-50">
          Genel Bakış
        </h2>
        <p className="text-zinc-500 mt-1">
          Harcamalarına hızlı bir bakış
        </p>
      </div>

      {/* Özet kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        {/* Öne çıkan kart: hafif mavi degrade */}
        <div className="bg-linear-to-br from-blue-600/25 to-cyan-500/5 border border-blue-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-blue-200">Aylık Toplam</span>
            <div className="w-11 h-11 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <div className="text-4xl font-semibold text-white mt-3 tabular-nums">
            {monthlyTotal.toFixed(2)}
            <span className="text-2xl text-blue-300 ml-1">₺</span>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Aktif Abonelik</span>
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <div className="text-4xl font-semibold text-zinc-50 mt-3 tabular-nums">
            {subscriptions.length}
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Son Bildirim</span>
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <CalendarClock className="h-5 w-5" />
            </div>
          </div>
          <div className="text-4xl font-semibold text-zinc-50 mt-3 tabular-nums">
            {notifications.length}
          </div>
        </div>
      </div>

      {/* Alt kısım: 3 kutu yan yana, böylece sayfa tek ekrana sığıyor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Yaklaşan ödemeler */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-zinc-50">Yaklaşan Ödemeler</h3>
            <span className="text-sm text-zinc-500">7 gün</span>
          </div>

          {upcoming.length > 0 ? (
            <div className="flex flex-col">
              {upcoming.map((r) => {
                const days = daysLeft(r.renewalDate);
                return (
                  <div
                    key={r.userSubscriptionId}
                    className="flex items-center justify-between gap-3 py-3.5 border-b border-zinc-800/70 last:border-0"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={r.platformIconUrl}
                        alt={r.platformName}
                        className="w-11 h-11 rounded-xl object-contain bg-white p-1.5 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-zinc-100 font-medium truncate">
                          {r.platformName}
                        </p>
                        <p className="text-zinc-500 text-sm tabular-nums">
                          {r.price}₺
                        </p>
                      </div>
                    </div>

                    {/* Aciliyet rozeti: kırmızı = 1 gün, sarı = 3 gün */}
                    <span
                      className={`text-sm font-medium px-2.5 py-1 rounded-lg shrink-0 ${
                        days <= 1
                          ? "bg-red-500/15 text-red-400"
                          : days <= 3
                            ? "bg-amber-500/15 text-amber-400"
                            : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {days === 0 ? "Bugün" : `${days} gün`}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm py-6 text-center">
              Yaklaşan ödeme yok.
            </p>
          )}
        </div>

        {/* Son bildirimler */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-medium text-zinc-50 mb-3">Son Bildirimler</h3>

          <div className="flex flex-col">
            {notifications.map((n) => (
              <div
                key={n.userNotificationId}
                className="flex items-start gap-3 py-3.5 border-b border-zinc-800/70 last:border-0"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                  <Bell className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-zinc-100 font-medium">{n.title}</p>
                  {/* line-clamp-2: uzun mesajı en fazla 2 satırda keser */}
                  <p className="text-zinc-500 text-sm mt-0.5 line-clamp-2">
                    {n.message}
                  </p>
                </div>
              </div>
            ))}
            {notifications.length === 0 && (
              <p className="text-zinc-500 text-sm py-6 text-center">
                Henüz bildirim yok.
              </p>
            )}
          </div>
        </div>

        {/* Kategori dağılımı */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-medium text-zinc-50 mb-3">Kategori Dağılımı</h3>

          {spendByCategory.length > 0 ? (
            <>
              {/* Grafik + ortasındaki toplam yazısı */}
              <div className="relative">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={spendByCategory}
                      dataKey="monthlyTotal"
                      nameKey="categoryName"
                      cx="50%"
                      cy="50%"
                      innerRadius={75}
                      outerRadius={105}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {spendByCategory.map((item, index) => (
                        <Cell
                          key={item.categoryName}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        border: "1px solid #27272a",
                        borderRadius: "8px",
                        color: "#fafafa",
                      }}
                      itemStyle={{ color: "#fafafa" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-sm text-zinc-500">Toplam</span>
                  <span className="text-2xl font-semibold text-zinc-50 tabular-nums">
                    {monthlyTotal.toFixed(0)}₺
                  </span>
                </div>
              </div>

              {/* Grafiğin altındaki renk açıklamaları */}
              <div className="flex flex-col gap-3 mt-5">
                {spendByCategory.map((item, index) => (
                  <div
                    key={item.categoryName}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-sm"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span className="text-zinc-400">{item.categoryName}</span>
                    </div>
                    <span className="text-zinc-200 tabular-nums">
                      {item.monthlyTotal.toFixed(2)}₺
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-zinc-500 text-sm text-center py-8">
              Henüz veri yok.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
