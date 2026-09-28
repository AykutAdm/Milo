import { useEffect, useState } from "react";
import {
  getAiSuggestion,
  getMonthlyTotal,
  getSpendByCategory,
} from "../../services/reportService";
import { Layers, Sparkles, Wallet } from "lucide-react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { SpendByCategory } from "../../types/report";
import ReactMarkdown from "react-markdown";

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

  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleGetSuggestion = async () => {
    setLoading(true);
    try {
      const data = await getAiSuggestion();
      setSuggestion(data);
    } catch (error) {
      console.error("Öneri alınamadı:", error);
      setSuggestion("Öneri alınırken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div>
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-zinc-50">Raporlar</h2>
      <p className="text-zinc-400 text-sm mt-1">Harcama özetin</p>
    </div>

    {/* Özet kartları */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-950 text-indigo-400">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="text-zinc-400 text-sm">Aylık Toplam</span>
        </div>
        <div className="text-2xl font-bold text-zinc-50">{monthlyTotal.toFixed(2)}₺</div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-950 text-pink-400">
            <Layers className="h-5 w-5" />
          </div>
          <span className="text-zinc-400 text-sm">Kategori Sayısı</span>
        </div>
        <div className="text-2xl font-bold text-zinc-50">{spendByCategory.length}</div>
      </div>
    </div>

    {/* Grafik (sol) + AI (sağ) yan yana */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* SOL — Grafik + kategori listesi */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="font-semibold text-zinc-50 mb-4">Kategoriye Göre Harcama</h3>
        {spendByCategory.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={spendByCategory}
                  dataKey="monthlyTotal"
                  nameKey="categoryName"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {spendByCategory.map((item, index) => (
                    <Cell key={item.categoryName} fill={COLORS[index % COLORS.length]} />
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
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-col gap-2 mt-4">
              {spendByCategory.map((item, index) => (
                <div key={item.categoryName} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-zinc-300">{item.categoryName}</span>
                  </div>
                  <span className="font-semibold text-zinc-50">
                    {item.monthlyTotal.toFixed(2)}₺
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-zinc-500 text-center py-8">Henüz veri yok.</p>
        )}
      </div>

      {/* SAĞ — AI Önerileri */}
      <div className="bg-gradient-to-br from-purple-950/40 to-zinc-900 border border-purple-900/50 rounded-xl p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-zinc-50">AI Önerileri</h3>
          </div>
          <button
            onClick={handleGetSuggestion}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <Sparkles className="h-4 w-4" />
            {loading ? "..." : "Öneri Al"}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto max-h-[400px] pr-2">
          {suggestion ? (
            <div className="prose prose-invert prose-sm max-w-none text-zinc-300">
              <ReactMarkdown>{suggestion}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <Sparkles className="h-8 w-8 text-purple-400/50 mb-3" />
              <p className="text-zinc-500 text-sm">
                Aboneliklerini analiz edip<br />tasarruf önerileri al.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}
export default ReportPage;
