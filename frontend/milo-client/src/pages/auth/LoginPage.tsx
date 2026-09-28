import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { login, loginWith2fa } from "../../services/authService";

const inputClass =
  "w-full h-11 pl-10 pr-3 bg-zinc-900/60 border border-zinc-800 rounded-xl text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-4 focus:ring-zinc-800/60 transition";

const rows = [
  {
    slug: "netflix",
    name: "Netflix",
    color: "#E50914",
    price: "₺229,99",
    day: "12 Eki",
  },
  {
    slug: "spotify",
    name: "Spotify",
    color: "#1DB954",
    price: "₺99,00",
    day: "18 Eki",
  },
  {
    slug: "github",
    name: "GitHub Copilot",
    color: "#6e40c9",
    price: "$10,00",
    day: "21 Eki",
  },
];

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [needsCode, setNeedsCode] = useState(false);
  const [userId, setUserId] = useState("");
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email, password);
      if (data.requiresTwoFactor) {
        setUserId(data.userId);
        setNeedsCode(true);
      } else {
        saveAndGo(data);
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginWith2fa(userId, code);
      saveAndGo(data);
    } catch (error) {
      console.error("Kod hatalı:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveAndGo = (data: any) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 grid lg:grid-cols-2">
      {/* SOL: form */}
      <div className="relative flex flex-col px-6 sm:px-12 py-8 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-125 h-125 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.14), transparent 65%)",
          }}
        />

        {/* Üst bar */}
        <div className="relative flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/milo-logo.jpg"
              alt="Milo"
              className="w-9 h-9 rounded-full"
            />
            <span className="text-xl font-bold tracking-tight">Milo</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Ana sayfa
          </Link>
        </div>

        {/* Orta — form */}
        <div className="relative flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-sm">
            {!needsCode ? (
              <>
                <h1 className="text-4xl font-semibold tracking-tight">
                  Tekrar{" "}
                  <span className="font-serif italic font-normal">
                    hoş geldin
                  </span>
                </h1>
                <p className="text-zinc-400 mt-2 mb-8">
                  Hesabına giriş yap, aboneliklerine göz at.
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-zinc-300 text-sm mb-1.5 block">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ornek@mail.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-zinc-300 text-sm mb-1.5 block">
                      Şifre
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`${inputClass} pr-11`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-zinc-200"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full h-11 mt-2 flex items-center justify-center gap-2 bg-zinc-100 text-zinc-900 rounded-xl font-medium hover:bg-white transition-colors disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Giriş Yap{" "}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-sm text-zinc-400 mt-8">
                  Hesabın yok mu?{" "}
                  <Link
                    to="/register"
                    className="text-zinc-50 font-medium hover:underline"
                  >
                    Kayıt ol
                  </Link>
                </p>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/15 text-blue-400 mb-4">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h1 className="text-3xl font-semibold tracking-tight">
                    İki Faktörlü Doğrulama
                  </h1>
                  <p className="text-zinc-400 mt-2">
                    Authenticator uygulamandaki 6 haneli kodu gir.
                  </p>
                </div>

                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    autoFocus
                    className="w-full h-14 bg-zinc-900/60 border border-zinc-800 rounded-xl text-zinc-50 text-center text-2xl tracking-[0.5em] placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 flex items-center justify-center gap-2 bg-zinc-100 text-zinc-900 rounded-xl font-medium hover:bg-white transition-colors disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Doğrula"
                    )}
                  </button>
                </form>

                <button
                  onClick={() => {
                    setNeedsCode(false);
                    setCode("");
                  }}
                  className="w-full mt-4 text-zinc-500 text-sm hover:text-zinc-300"
                >
                  Geri dön
                </button>
              </>
            )}
          </div>
        </div>

        <p className="relative text-xs text-zinc-600">© 2026 Milo</p>
      </div>

      {/* SAĞ: görsel panel (aynı, dokunmadım) */}
      <div className="hidden lg:block p-3">
        <div className="relative h-full rounded-3xl overflow-hidden border border-zinc-800 bg-linear-to-br from-blue-900 via-zinc-900 to-orange-950">
          <img
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/10" />

          {/* Bildirim kartı */}
          <div className="absolute top-10 right-10 w-72 rounded-2xl border border-white/10 bg-zinc-950/75 backdrop-blur-md p-3 flex items-start gap-3 shadow-2xl">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-medium">
                Netflix yarın yenileniyor
              </div>
              <div className="text-xs text-zinc-500">
                ₺229,99 kartından çekilecek
              </div>
            </div>
          </div>

          {/* Abonelik listesi kartı */}
          <div className="absolute top-36 left-10 w-80 rounded-2xl border border-white/10 bg-zinc-950/75 backdrop-blur-md p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400">Bu ay</span>
              <span className="text-sm font-semibold">₺1.247,90</span>
            </div>
            {rows.map((r) => (
              <div
                key={r.slug}
                className="flex items-center gap-3 py-2 border-t border-white/5"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: r.color }}
                >
                  <img
                    src={`https://cdn.simpleicons.org/${r.slug}/white`}
                    alt=""
                    className="h-4 w-4"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm">{r.name}</div>
                  <div className="text-xs text-zinc-500">{r.day}</div>
                </div>
                <div className="text-sm text-zinc-300">{r.price}</div>
              </div>
            ))}
          </div>

          {/* Alt yazı */}
          <div className="absolute bottom-0 inset-x-0 p-10">
            <p className="text-3xl xl:text-4xl font-semibold tracking-tight leading-tight max-w-md">
              Kaldığın yerden{" "}
              <span className="font-serif italic font-normal">devam et.</span>
            </p>
            <p className="text-zinc-400 mt-4 max-w-md">
              Aboneliklerin, raporların ve bildirimlerin seni bekliyor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
