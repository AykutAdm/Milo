import {
  Bell,
  CreditCard,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  PieChart,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function UserLayout() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pointer-events-none" />

      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.15), transparent 65%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.12), transparent 65%)",
        }}
      />

      <div
        className="absolute top-0 left-1/3 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(96,165,250,0.1), transparent 70%)",
        }}
      />
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } border-r border-zinc-800 flex flex-col p-4 transition-all duration-300 relative z-10 bg-zinc-950/50 backdrop-blur`}
      >
        {/* Üst — hamburger + logo */}
        <div className="flex items-center gap-2 px-2 py-4">
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="text-zinc-400 hover:text-zinc-50 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          {isOpen && (
            <div className="flex items-center gap-2">
              <img
                src="/milo-logo.jpg"
                alt="Milo"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-lg font-bold">Milo</span>
            </div>
          )}
        </div>

        {/* Menü */}
        <nav className="flex-1 flex flex-col gap-1.5 mt-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-50 transition-all group"
          >
            <LayoutDashboard className="h-5 w-5 shrink-0 text-blue-400 group-hover:scale-110 transition-transform" />
            {isOpen && <span className="font-medium">Genel Bakış</span>}
          </Link>

          <Link
            to="/subscription"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-50 transition-all group"
          >
            <CreditCard className="h-5 w-5 shrink-0 text-indigo-400 group-hover:scale-110 transition-transform" />
            {isOpen && <span className="font-medium">Abonelikler</span>}
          </Link>

          <Link
            to="/accounts"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-50 transition-all group"
          >
            <KeyRound className="h-5 w-5 shrink-0 text-emerald-400 group-hover:scale-110 transition-transform" />
            {isOpen && <span className="font-medium">Hesaplar</span>}
          </Link>

          <Link
            to="/reports"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-50 transition-all group"
          >
            <PieChart className="h-5 w-5 shrink-0 text-amber-400 group-hover:scale-110 transition-transform" />
            {isOpen && <span className="font-medium">Raporlar</span>}
          </Link>

          <Link
            to="/notifications"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-50 transition-all group"
          >
            <Bell className="h-5 w-5 shrink-0 text-pink-400 group-hover:scale-110 transition-transform" />
            {isOpen && <span className="font-medium">Bildirimler</span>}
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-50 transition-all group"
          >
            <Settings className="h-5 w-5 shrink-0 text-zinc-400 ..." />
            {isOpen && <span>Ayarlar</span>}
          </Link>
        </nav>

        {/* Alt — kullanıcı bilgisi */}
        {user && (
          <div className="flex items-center gap-3 px-3 py-3 border-t border-zinc-800 mb-2">
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={user.firstName}
                className="w-9 h-9 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-sm font-medium shrink-0">
                {user.firstName?.charAt(0)}
                {user.lastName?.charAt(0)}
              </div>
            )}
            {isOpen && (
              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-50 truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-zinc-500 truncate">{user.email}</p>
              </div>
            )}
          </div>
        )}

        {/* Alt — Çıkış */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:bg-red-950/50 hover:text-red-400 transition-colors group"
        >
          <LogOut className="h-5 w-5 shrink-0 group-hover:scale-110 transition-transform" />
          {isOpen && <span className="font-medium">Çıkış</span>}
        </button>
      </aside>

      {/* İÇERİK */}
      <main className="flex-1 p-8 relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
