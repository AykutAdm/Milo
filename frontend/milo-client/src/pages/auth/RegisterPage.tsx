import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { register } from "../../services/authService";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(firstName, lastName, email, password);
      navigate("/login");
    } catch (error) {
      console.error("Kayıt hatası:", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_40%,rgba(255,255,255,0.05),transparent_70%)]" />
      <div className="relative w-full max-w-sm bg-zinc-900/70 backdrop-blur border border-zinc-800 rounded-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-zinc-50">Milo 🐧</h1>
          <p className="text-zinc-500 text-xs mt-1">Abonelik Takip Sistemi</p>
        </div>
        <h2 className="text-2xl font-bold text-zinc-50 mb-2">Kayıt Ol</h2>

        {/* Ad */}
        <div className="mb-4">
          <label className="text-zinc-300 text-sm mb-1 block">Ad</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ad"
              className="w-full pl-10 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
            />
          </div>
        </div>

        {/* Soyad */}
        <div className="mb-4">
          <label className="text-zinc-300 text-sm mb-1 block">Soyad</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Soyad"
              className="w-full pl-10 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-zinc-300 text-sm mb-1 block">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@mail.com"
              className="w-full pl-10 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
            />
          </div>
        </div>

        {/* Şifre */}
        <div className="mb-6">
          <label className="text-zinc-300 text-sm mb-1 block">Şifre</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-zinc-200"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Kayıt butonu */}
        <button
          onClick={handleRegister}
          className="w-full py-2 bg-zinc-50 text-zinc-900 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
        >
          Kayıt Ol
        </button>
        <div className="border-t border-zinc-800 mt-6 pt-4">
          <p className="text-center text-sm text-zinc-400">
            Zaten Hesabın var mı?{" "}
            <Link
              to="/login"
              className="text-zinc-50 font-medium hover:underline"
            >
              Giriş yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
