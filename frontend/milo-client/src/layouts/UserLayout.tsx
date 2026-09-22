import { Bell, CreditCard, LogOut, Menu, PieChart } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function UserLayout() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex">
      {/* SIDEBAR — genişliği isOpen'e göre değişir */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } border-r border-zinc-800 flex flex-col p-4 transition-all duration-300`}
      >
        {/* Üst — hamburger + logo */}
        <div className="flex items-center gap-2 px-2 py-4">
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="text-zinc-400 hover:text-zinc-50 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          {isOpen && <span className="text-lg font-bold">Milo 🐧</span>}
        </div>

        {/* Menü */}
        <nav className="flex-1 flex flex-col gap-1 mt-4">
          <Link
            to="/subscription"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50 transition-colors"
          >
            <CreditCard className="h-5 w-5 shrink-0" />
            {isOpen && <span>Abonelikler</span>}
          </Link>
          <Link
            to="/reports"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50 transition-colors"
          >
            <PieChart className="h-5 w-5 shrink-0" />
            {isOpen && <span>Raporlar</span>}
          </Link>
          <Link
            to="/notifications"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50 transition-colors"
          >
            <Bell className="h-5 w-5 shrink-0" />
            {isOpen && <span>Bildirimler</span>}
          </Link>
        </nav>

        {/* Alt — Çıkış */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50 transition-colors"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {isOpen && <span>Çıkış</span>}
        </button>
      </aside>

      {/* İÇERİK */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
