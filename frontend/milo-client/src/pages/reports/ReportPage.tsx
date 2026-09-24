import { useEffect, useState } from "react";
import {
  getMonthlyTotal,
  getSpendByCategory,
} from "../../services/reportService";
import { Wallet } from "lucide-react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { SpendByCategory } from "../../types/report";

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
];

function ReportPage() {
  const [monthlyTotal, setMonthlyTotal] = useState<number>(0);
  const [spendByCategory, setSpendByCategory] = useState<SpendByCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const monthly = await getMonthlyTotal();
        setMonthlyTotal(monthly);

        const spend = await getSpendByCategory();
        setSpendByCategory(spend);
      } catch (error) {
        console.error("Rapor verileri alınamadı:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-50">Raporlar</h2>
        <p className="text-zinc-400 text-sm mt-1">Harcama özetin</p>
      </div>

      {/* Aylık toplam kartı */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6 max-w-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 text-zinc-400">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="text-zinc-400 text-sm">Aylık Toplam</span>
        </div>
        <div className="text-3xl font-bold text-zinc-50">
          {monthlyTotal.toFixed(2)}₺
        </div>
      </div>

      {/* Kategori dağılımı grafiği */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="font-semibold text-zinc-50 mb-4">
          Kategoriye Göre Harcama
        </h3>

        {spendByCategory.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spendByCategory}
                dataKey="monthlyTotal"
                nameKey="categoryName"
                cx="50%"
                cy="50%"
                outerRadius={100}
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
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-zinc-500 text-center py-8">Henüz veri yok.</p>
        )}
      </div>
    </div>
  );
}
export default ReportPage;
