import {
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  FileText,
  CreditCard,
  KeyRound,
  Lock,
  Menu,
  PieChart,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const logos = [
  { name: "Netflix", slug: "netflix" },
  { name: "Spotify", slug: "spotify" },
  { name: "YouTube", slug: "youtube" },
  { name: "HBO Max", slug: "hbomax" },
  { name: "GitHub", slug: "github" },
  { name: "Claude", slug: "claude" },
  { name: "Apple Music", slug: "applemusic" },
  { name: "Twitch", slug: "twitch" },
  { name: "JetBrains", slug: "jetbrains" },
  { name: "PlayStation", slug: "playstation" },
  { name: "Discord", slug: "discord" },
];

// Galeri kısmındaki platformlar
const platforms = [
  {
    name: "Netflix",
    slug: "netflix",
    tag: "Dizi & Film",
    color: "#E50914",
    image:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200&q=80",
    desc: "Hangi planı kullandığını, ayın kaçında çekildiğini unutma.",
  },
  {
    name: "Spotify",
    slug: "spotify",
    tag: "Müzik",
    color: "#1DB954",
    image:
      "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=1200&q=80",
    desc: "Aile planı mı bireysel mi, kim ne kadar ödüyor hepsi burada.",
  },
  {
    name: "YouTube",
    slug: "youtube",
    tag: "Video",
    color: "#FF0000",
    image:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200&q=80",
    desc: "Premium'u reklam görmemek için aldın, parasını unutma.",
  },
  {
    name: "HBO Max",
    slug: "hbomax",
    tag: "Dizi & Film",
    color: "#5822b4",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80",
    desc: "Tek bir dizi için açıp sonra iptal etmeyi unutanlardansan tam sana göre.",
  },
  {
    name: "PS Plus",
    slug: "playstation",
    tag: "Oyun",
    color: "#003791",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=1200&q=80",
    desc: "Oyun oynamadığın aylarda da çekiliyor, en azından gör.",
  },
  {
    name: "GitHub",
    slug: "github",
    tag: "Yazılım",
    color: "#6e40c9",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    desc: "Copilot, Pro, Actions dakikaları. Dolar kuruyla birlikte takip et.",
  },
  {
    name: "Claude",
    slug: "claude",
    tag: "Yapay Zeka",
    color: "#D97757",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    desc: "Plus, Pro, API... AI abonelikleri de artık bütçenin parçası.",
  },
  {
    name: "Discord",
    slug: "discord",
    tag: "Topluluk",
    color: "#5865F2",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
    desc: "Nitro'yu bir kere aldın, her ay yenileniyor. Farkında mısın?",
  },
];

const navLinks = [
  { label: "Özellikler", href: "#features" },
  { label: "Platformlar", href: "#platforms" },
  { label: "Nasıl Çalışır", href: "#how" },
  { label: "Hakkında", href: "#about" },
];

type LegalDocKey = "privacy" | "terms";

const legalDocs: Record<
  LegalDocKey,
  { title: string; intro: string; sections: { title: string; body: string }[] }
> = {
  privacy: {
    title: "Gizlilik Politikası",
    intro:
      "Milo'yu kullanırken bize bazı bilgilerini veriyorsun. Bu sayfada hangi bilgileri topladığımızı, ne için kullandığımızı ve nasıl koruduğumuzu açıkça anlatmaya çalıştık.",
    sections: [
      {
        title: "Hangi bilgileri topluyoruz?",
        body: "Kayıt olurken girdiğin ad, soyad ve mail adresini saklıyoruz. Bunun dışında uygulamaya kendin eklediğin abonelikler (platform, fiyat, para birimi, yenilenme tarihi) ve hesap bilgileri kasasına kaydettiğin bilgiler tutuluyor.",
      },
      {
        title: "Bu bilgileri ne için kullanıyoruz?",
        body: "Sadece Milo'nun çalışması için. Aboneliklerini listelemek, yenileme bildirimlerini göndermek, harcama raporlarını hazırlamak ve AI tasarruf önerilerini oluşturmak için kullanılıyor. Reklam amaçlı kullanmıyoruz.",
      },
      {
        title: "Şifreler nasıl saklanıyor?",
        body: "Giriş şifren veritabanına düz metin olarak yazılmıyor. Hesap bilgileri kasasına eklediğin şifreler de AES ile şifrelenip saklanıyor, sadece sen giriş yaptığında çözülüp gösteriliyor.",
      },
      {
        title: "AI önerileri",
        body: "Tasarruf önerileri hazırlanırken abonelik ve harcama bilgilerin yapay zeka servisine gönderiliyor. Bu işlemde hesap şifrelerin ve kasadaki bilgilerin paylaşılmıyor.",
      },
      {
        title: "Bilgilerini kimseyle paylaşmıyoruz",
        body: "Verilerini üçüncü kişilere satmıyor ya da kiralamıyoruz. Yasal bir zorunluluk olmadıkça kimseyle paylaşılmıyor.",
      },
      {
        title: "Hesabını silmek istersen",
        body: "Hesabını istediğin zaman silebilirsin. Hesabın silindiğinde aboneliklerin, hesap bilgilerin ve bildirimlerin de sistemden kaldırılır.",
      },
    ],
  },
  terms: {
    title: "Kullanım Şartları",
    intro:
      "Milo'ya kayıt olarak aşağıdaki şartları kabul etmiş sayılıyorsun. Uzun bir hukuk metni yazmak yerine önemli noktaları kısa tutmaya çalıştık.",
    sections: [
      {
        title: "Hizmetin kapsamı",
        body: "Milo, dijital aboneliklerini takip etmen için yapılmış ücretsiz bir araç. Milo senin adına herhangi bir ödeme yapmaz, abonelik başlatmaz ya da iptal etmez. Aboneliklerinle ilgili işlemleri ilgili platform üzerinden kendin yapman gerekir.",
      },
      {
        title: "Hesap güvenliği",
        body: "Hesabının ve şifrenin güvenliğinden sen sorumlusun. Şifreni kimseyle paylaşma, hesabında şüpheli bir durum görürsen bize haber ver.",
      },
      {
        title: "Girdiğin bilgilerin doğruluğu",
        body: "Raporlar ve bildirimler, senin girdiğin fiyat ve tarih bilgilerine göre hazırlanır. Yanlış ya da eksik girilen bilgilerden kaynaklanan hatalardan Milo sorumlu tutulamaz.",
      },
      {
        title: "AI önerileri tavsiye niteliğinde",
        body: "Yapay zekanın sunduğu tasarruf önerileri sadece fikir vermek içindir. Bir aboneliği iptal etme ya da değiştirme kararı tamamen sana aittir.",
      },
      {
        title: "Kötüye kullanım",
        body: "Sistemi yavaşlatmaya, başkalarının hesaplarına erişmeye ya da Milo'yu amacı dışında kullanmaya çalışan hesaplar uyarı yapılmadan kapatılabilir.",
      },
      {
        title: "Değişiklikler",
        body: "Bu şartlar zaman zaman güncellenebilir. Önemli bir değişiklik olduğunda uygulama içinden ya da mail ile haber veririz.",
      },
    ],
  },
};

const faqs = [
  {
    q: "Milo ücretli mi?",
    a: "Hayır, tamamen ücretsiz. Abonelik takip eden bir uygulamaya abonelik ücreti ödemek biraz ironik olurdu zaten.",
  },
  {
    q: "Hesap şifrelerimi saklamak güvenli mi?",
    a: "Şifreler veritabanına düz metin olarak yazılmıyor, AES ile şifrelenip öyle saklanıyor. Sadece sen giriş yaptığında çözülüp gösteriliyor.",
  },
  {
    q: "Listede olmayan bir platformu ekleyebilir miyim?",
    a: "Evet. Galeride gördüklerin sadece örnek, adını ve fiyatını girdiğin her şeyi abonelik olarak ekleyebilirsin. Spor salonu üyeliği bile olur.",
  },
  {
    q: "AI önerileri nasıl çalışıyor?",
    a: "Raporlar sayfasında harcamaların kategorilere göre analiz ediliyor, sonra yapay zeka bu verilere bakıp nerede kısabileceğine dair öneriler çıkarıyor.",
  },
  {
    q: "Farklı para birimleriyle ödediğim abonelikler olursa ne olacak?",
    a: "Sorun değil. Her abonelik için para birimini seçebiliyorsun, dolar ile ödediğin GitHub da TL ile ödediğin Netflix de aynı listede duruyor.",
  },
  {
    q: "Yenileme bildirimleri ne zaman geliyor?",
    a: "Aboneliğin yenilenme tarihi yaklaştığında bildirimler sayfana düşüyor. Böylece iptal etmek istersen önceden vaktin oluyor.",
  },
];

// CTA kısmındaki yörüngeler
const orbits = [
  { radius: 110, duration: "28s", items: ["netflix", "spotify", "youtube"] },
  {
    radius: 180,
    duration: "44s",
    items: ["github", "claude", "discord", "playstation", "hbomax"],
  },
];

function PlatformLogo({ slug, className }: { slug: string; className?: string }) {
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/white`}
      alt=""
      className={className}
      loading="lazy"
    />
  );
}

function HomePage() {
  const navigate = useNavigate();
  const [activePlatform, setActivePlatform] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDocKey | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/subscription");
    }
  }, [navigate]);

  // Pop-up açıkken arka plan kaymasın, ESC ile kapansın
  useEffect(() => {
    if (!legalDoc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLegalDoc(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [legalDoc]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 relative overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-zinc-950/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-[72px] border-b border-zinc-800/80">
            <a href="#" className="flex items-center gap-2.5">
              <img
                src="/milo-logo.jpg"
                alt="Milo"
                className="w-9 h-9 rounded-full"
              />
              <span className="text-xl font-bold tracking-tight">Milo</span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-zinc-50 hover:bg-zinc-900 transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-sm font-medium hover:bg-zinc-900 transition-colors"
              >
                Giriş Yap
              </Link>
              <Link
                to="/register"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-white transition-colors"
              >
                Kayıt Ol
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-800 hover:bg-zinc-900 transition-colors"
                aria-label="Menü"
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Mobil menü */}
          {menuOpen && (
            <div className="md:hidden py-4 flex flex-col gap-1 border-b border-zinc-800/80">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-900"
                >
                  {l.label}
                </a>
              ))}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Link
                  to="/login"
                  className="text-center px-4 py-2.5 rounded-lg border border-zinc-800 text-sm font-medium"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                  className="text-center px-4 py-2.5 rounded-lg bg-zinc-100 text-zinc-900 text-sm font-medium"
                >
                  Kayıt Ol
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <header className="relative -mt-[72px] pt-[72px] flex flex-col overflow-hidden">
        {/* Kenar glowları (sol mavi, sağ turuncu) */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 0% 45%, rgba(37,99,235,0.22), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 100% 55%, rgba(234,88,12,0.14), transparent 60%)",
          }}
        />


        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center px-6 pt-20 md:pt-28">
          {/* Sol yüzen kartlar */}
          <div className="hidden xl:block absolute left-6 top-[27rem] animate-float">
            <div className="-rotate-6 w-64 rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-md p-3 flex items-start gap-3 text-left shadow-2xl">
              <div className="w-9 h-9 rounded-xl bg-[#1DB954] flex items-center justify-center shrink-0">
                <PlatformLogo slug="spotify" className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium">Spotify yarın yenileniyor</div>
                <div className="text-xs text-zinc-500">₺99,00 kartından çekilecek</div>
              </div>
            </div>
          </div>
          <div
            className="hidden xl:flex absolute left-20 top-[18rem] animate-float"
            style={{ animationDelay: "-2s" }}
          >
            <div className="rotate-12 w-14 h-14 rounded-2xl bg-[#E50914] flex items-center justify-center shadow-[0_10px_40px_-10px_#E50914]">
              <PlatformLogo slug="netflix" className="h-6 w-6" />
            </div>
          </div>

          {/* Sağ yüzen kartlar */}
          <div
            className="hidden xl:block absolute right-6 top-[24rem] animate-float"
            style={{ animationDelay: "-1s" }}
          >
            <div className="rotate-6 w-56 rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-md p-4 text-left shadow-2xl">
              <div className="text-xs text-zinc-500">Bu ayki toplam</div>
              <div className="text-2xl font-semibold mt-0.5">₺1.247,90</div>
              <div className="flex items-end gap-1.5 h-12 mt-3">
                {[35, 55, 40, 70, 50, 90].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm ${i === 5 ? "bg-orange-500" : "bg-zinc-700"}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            className="hidden xl:flex absolute right-24 top-[16rem] animate-float"
            style={{ animationDelay: "-3s" }}
          >
            <div className="-rotate-12 w-12 h-12 rounded-2xl bg-[#6e40c9] flex items-center justify-center shadow-[0_10px_40px_-10px_#6e40c9]">
              <PlatformLogo slug="github" className="h-5 w-5" />
            </div>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight leading-[1.02] max-w-5xl">
            Aboneliklerin dağınık,
            <br />
            <span className="font-serif italic font-normal">
              hesabı Milo tutsun.
            </span>
          </h1>

          <p className="text-zinc-400 text-base md:text-lg mt-7 max-w-2xl leading-relaxed">
            Netflix, Spotify, GitHub, AWS derken ay sonunda kartından ne kadar
            çıktığını bilmiyorsan yalnız değilsin. Milo hepsini tek listede
            topluyor, yenilenmeden önce haber veriyor.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-8 mt-10">
            <Link
              to="/register"
              className="group flex items-center gap-4 pl-6 pr-1.5 py-1.5 bg-zinc-100 text-zinc-900 rounded-full font-medium hover:bg-white transition-colors"
            >
              Hemen Başla
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 text-white group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {platforms.slice(0, 4).map((p) => (
                  <div
                    key={p.slug}
                    className="w-10 h-10 rounded-full border-2 border-zinc-950 flex items-center justify-center"
                    style={{ backgroundColor: p.color }}
                  >
                    <PlatformLogo slug={p.slug} className="h-4 w-4" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">15+ platform</div>
                <div className="text-xs text-zinc-500">
                  ve eklemek istediğin her şey
                </div>
              </div>
            </div>
          </div>

          {/* Uygulama önizlemesi */}
          <div className="relative w-full max-w-5xl mt-16 md:mt-20 [perspective:2000px]">
            <div
              className="absolute -inset-x-10 -top-10 h-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.25), transparent 70%)",
              }}
            />
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/80 p-1.5 shadow-2xl [transform:rotateX(8deg)] origin-top">
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 text-left">
                {/* Pencere çubuğu */}
                <div className="flex items-center gap-2 px-4 h-10 border-b border-zinc-800 bg-zinc-900/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="mx-auto px-4 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-500">
                    milo.app/subscription
                  </div>
                </div>

                <div className="flex">
                  {/* Sidebar */}
                  <div className="hidden md:flex flex-col gap-1 w-48 shrink-0 border-r border-zinc-800 p-3">
                    <div className="flex items-center gap-2 px-2 py-2 mb-2">
                      <img src="/milo-logo.jpg" alt="" className="w-6 h-6 rounded-full" />
                      <span className="text-sm font-semibold">Milo</span>
                    </div>
                    {[
                      { icon: CreditCard, label: "Abonelikler", color: "text-indigo-400", active: true },
                      { icon: KeyRound, label: "Hesaplar", color: "text-emerald-400" },
                      { icon: PieChart, label: "Raporlar", color: "text-amber-400" },
                      { icon: Bell, label: "Bildirimler", color: "text-pink-400" },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs ${m.active ? "bg-zinc-800/70 text-zinc-50" : "text-zinc-400"}`}
                      >
                        <m.icon className={`h-4 w-4 ${m.color}`} />
                        {m.label}
                      </div>
                    ))}
                  </div>

                  {/* İçerik */}
                  <div className="flex-1 p-4 md:p-6 min-w-0">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <div className="text-base md:text-lg font-semibold">Abonelikler</div>
                        <div className="text-xs text-zinc-500">7 aktif abonelik</div>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-900 text-xs font-medium">
                        <Plus className="h-3.5 w-3.5" />
                        Yeni Abonelik
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[
                        { label: "Aylık toplam", value: "₺1.247,90" },
                        { label: "Yıllık tahmini", value: "₺14.974" },
                        { label: "Bu hafta yenilenecek", value: "2" },
                      ].map((s) => (
                        <div key={s.label} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
                          <div className="text-[11px] text-zinc-500 truncate">{s.label}</div>
                          <div className="text-sm md:text-lg font-semibold mt-0.5">{s.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="md:col-span-2 rounded-xl border border-zinc-800 overflow-hidden">
                        {[
                          { slug: "netflix", name: "Netflix", cat: "Dizi & Film", color: "#E50914", day: "12 Eki", price: "₺229,99" },
                          { slug: "spotify", name: "Spotify", cat: "Müzik", color: "#1DB954", day: "18 Eki", price: "₺99,00" },
                          { slug: "github", name: "GitHub Copilot", cat: "Yazılım", color: "#6e40c9", day: "21 Eki", price: "$10,00" },
                          { slug: "youtube", name: "YouTube Premium", cat: "Video", color: "#FF0000", day: "27 Eki", price: "₺79,99" },
                        ].map((r, i) => (
                          <div
                            key={r.slug}
                            className={`flex items-center gap-3 px-3 py-2.5 text-xs ${i > 0 ? "border-t border-zinc-800" : ""}`}
                          >
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                              style={{ backgroundColor: r.color }}
                            >
                              <PlatformLogo slug={r.slug} className="h-3.5 w-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{r.name}</div>
                              <div className="text-zinc-500">{r.cat}</div>
                            </div>
                            <div className="hidden sm:block text-zinc-500 w-16">{r.day}</div>
                            <div className="font-medium">{r.price}</div>
                          </div>
                        ))}
                      </div>

                      <div className="hidden md:flex flex-col rounded-xl border border-zinc-800 p-3">
                        <div className="text-xs text-zinc-500 mb-3">Kategoriye göre</div>
                        <div className="space-y-2.5 text-[11px]">
                          {[
                            { label: "Dizi & Film", w: 78, amount: "₺539", color: "bg-orange-500" },
                            { label: "Yazılım", w: 52, amount: "₺340", color: "bg-indigo-500" },
                            { label: "Müzik", w: 34, amount: "₺229", color: "bg-emerald-500" },
                            { label: "Video", w: 24, amount: "₺139", color: "bg-pink-500" },
                          ].map((c) => (
                            <div key={c.label}>
                              <div className="flex justify-between text-zinc-400 mb-1">
                                <span>{c.label}</span>
                                <span>{c.amount}</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-zinc-800">
                                <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.w}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Alta doğru solma */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-zinc-950 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* LOGO SLIDER */}
        <div className="relative z-10 pt-6 pb-12">
          <div className="flex items-center gap-4 max-w-4xl mx-auto px-6 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-zinc-700" />
            <p className="text-zinc-500 text-sm whitespace-nowrap">
              Kullandığın platformların hepsi burada
            </p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-zinc-700" />
          </div>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
            <div className="flex gap-14 animate-scroll w-max items-center">
              {[...logos, ...logos].map((l, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 opacity-50 hover:opacity-100 transition-opacity"
                >
                  <PlatformLogo slug={l.slug} className="h-7 w-7" />
                  <span className="text-lg font-semibold">{l.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ÖZELLİKLER (bento) */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-sm text-zinc-500 font-medium mb-2">Neler var?</p>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
          Takip etmek için{" "}
          <span className="font-serif italic font-normal">ihtiyacın olan</span>{" "}
          her şey
        </h2>
        <p className="text-zinc-400 mt-4 max-w-2xl">
          Excel tablosuyla uğraşmayı bıraktığım gün Milo'yu yazmaya başladım.
          İçinde benim de her gün kullandığım özellikler var.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {/* Büyük kart: abonelik listesi */}
          <div className="md:col-span-2 md:row-span-2 rounded-3xl border border-zinc-800 bg-zinc-900/40 overflow-hidden flex flex-col">
            <div className="relative h-72 md:h-[26rem] overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-orange-600">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&q=80"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

              {/* Mini abonelik listesi mockup */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[88%] max-w-md rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-md p-4 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-zinc-400">Bu ay</span>
                  <span className="text-sm font-semibold">₺1.247,90</span>
                </div>
                {[
                  { slug: "netflix", name: "Netflix", color: "#E50914", price: "₺229,99", day: "12 Eki" },
                  { slug: "spotify", name: "Spotify", color: "#1DB954", price: "₺99,00", day: "18 Eki" },
                  { slug: "github", name: "GitHub Copilot", color: "#6e40c9", price: "$10,00", day: "21 Eki" },
                ].map((s) => (
                  <div
                    key={s.slug}
                    className="flex items-center gap-3 py-2 border-t border-white/5"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: s.color }}
                    >
                      <PlatformLogo slug={s.slug} className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">{s.name}</div>
                      <div className="text-xs text-zinc-500">{s.day}</div>
                    </div>
                    <div className="text-sm text-zinc-300">{s.price}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8">
              <span className="inline-block text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
                ANA ÖZELLİK
              </span>
              <h3 className="text-2xl font-semibold mb-2">
                Tüm abonelikler tek listede
              </h3>
              <p className="text-zinc-400 leading-relaxed max-w-lg">
                Adını, fiyatını, para birimini ve yenilenme gününü gir, gerisini
                Milo halletsin. Dolar ile ödediğin şeyler de TL olanlar da aynı
                yerde duruyor.
              </p>
            </div>
          </div>

          {/* Rapor kartı */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
            <div className="h-40 flex items-end justify-center gap-2 px-8 pb-6 bg-gradient-to-b from-zinc-900 to-zinc-950">
              {[40, 65, 50, 85, 60, 95, 70].map((h, i) => (
                <div
                  key={i}
                  className={`w-6 rounded-t-md ${i === 5 ? "bg-orange-500" : "bg-zinc-700"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="p-7">
              <h3 className="text-xl font-semibold mb-2">Harcama raporları</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Kategoriye göre grafikler. Hangi alana ne kadar gittiğini bir
                bakışta gör.
              </p>
            </div>
          </div>

          {/* Bildirim kartı */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
            <div className="h-40 flex items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 px-6">
              <div className="w-full rounded-xl border border-zinc-700/60 bg-zinc-800/60 p-3 flex items-start gap-3 shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Netflix yarın yenileniyor</div>
                  <div className="text-xs text-zinc-500">₺229,99 kartından çekilecek</div>
                </div>
              </div>
            </div>
            <div className="p-7">
              <h3 className="text-xl font-semibold mb-2">Yenileme bildirimleri</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Ödeme gününden önce haber alırsın. İptal edeceksen hâlâ
                vaktin var.
              </p>
            </div>
          </div>

          {/* Şifre kasası */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-7 flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
              <KeyRound className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Hesap bilgileri kasası</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Hangi mail ile açmıştım, şifresi neydi? Hesap bilgilerini AES ile
              şifreli olarak sakla.
            </p>
            <div className="mt-auto pt-6 flex items-center gap-2 font-mono text-xs text-zinc-500">
              <Lock className="h-3.5 w-3.5" />
              ••••••••••••
            </div>
          </div>

          {/* AI kartı */}
          <div className="md:col-span-2 relative rounded-3xl border border-zinc-800 overflow-hidden p-7 md:p-10 bg-zinc-900/40">
            <div
              className="absolute -right-20 -top-20 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(249,115,22,0.25), transparent 70%)",
              }}
            />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-4">
                  YENİ
                </span>
                <h3 className="text-2xl font-semibold mb-2">
                  AI ile tasarruf önerileri
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Yapay zeka harcamalarına bakıyor ve nerede kısabileceğini
                  söylüyor. Bazen acı gerçekler çıkabilir, uyarmadı deme.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 text-sm leading-relaxed">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-medium mb-3">
                  <Sparkles className="h-3.5 w-3.5" />
                  Milo AI
                </div>
                <p className="text-zinc-300">
                  Eğlence kategorisinde 3 aktif aboneliğin var. HBO Max ve
                  Netflix'i dönüşümlü kullanırsan aylık yaklaşık{" "}
                  <span className="text-zinc-50 font-medium">₺180</span>{" "}
                  tasarruf edebilirsin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM GALERİSİ */}
      <section id="platforms" className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm text-zinc-500 font-medium mb-2">Platformlar</p>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
              Ne kullanıyorsan{" "}
              <span className="font-serif italic font-normal">ekle.</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm">
            Dizi, müzik, oyun, yazılım, cloud... Popüler olanlar hazır, olmayanı
            da kendin ekliyorsun.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:h-[560px]">
          {platforms.map((p, i) => {
            const active = i === activePlatform;
            return (
              <button
                key={p.slug}
                type="button"
                onMouseEnter={() => setActivePlatform(i)}
                onFocus={() => setActivePlatform(i)}
                onClick={() => setActivePlatform(i)}
                className={`group relative overflow-hidden rounded-3xl border text-left transition-all duration-500 ease-out ${
                  active
                    ? "border-zinc-700 h-[420px] md:h-auto"
                    : "border-zinc-800 h-20 md:h-auto"
                }`}
                style={{
                  flex: active ? "6 1 0%" : "1 1 0%",
                  backgroundColor: "#0c0c0e",
                }}
              >
                {/* Resim */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    active ? "opacity-100" : "opacity-100 md:[clip-path:inset(0_0_75%_0)]"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${p.color}, #09090b 80%)`,
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      active ? "scale-100 opacity-90" : "scale-110 opacity-70 saturate-50"
                    }`}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    active
                      ? "bg-gradient-to-t from-black via-black/40 to-transparent"
                      : "bg-black/60 md:bg-gradient-to-t md:from-[#0c0c0e] md:via-[#0c0c0e] md:to-transparent"
                  }`}
                />

                {/* Kapalıyken: dikey yazı */}
                <div
                  className={`absolute inset-0 flex items-center md:items-end md:justify-center px-5 md:px-0 md:pb-8 gap-3 transition-opacity duration-300 ${
                    active ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <PlatformLogo slug={p.slug} className="h-5 w-5 md:hidden" />
                  <span className="md:vertical-text text-sm md:text-lg font-bold tracking-[0.2em] uppercase text-zinc-400 group-hover:text-zinc-200 whitespace-nowrap">
                    {p.name}
                  </span>
                </div>

                {/* Açıkken: detay */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-6 md:p-8 transition-all duration-500 ${
                    active
                      ? "opacity-100 translate-y-0 delay-150"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <span className="inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur mb-4">
                    {p.tag}
                  </span>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: p.color }}
                    >
                      <PlatformLogo slug={p.slug} className="h-5 w-5" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight whitespace-nowrap">
                      {p.name}
                    </h3>
                  </div>
                  <p className="text-zinc-300 max-w-md mb-5">{p.desc}</p>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest hover:text-zinc-300"
                  >
                    Takibe Başla
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-sm text-zinc-500 font-medium mb-2">Nasıl çalışır?</p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Üç adım,{" "}
            <span className="font-serif italic font-normal">o kadar.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              step: "01",
              title: "Hesabını aç",
              desc: "Mail ve şifre yeterli. Kart bilgisi falan istemiyoruz.",
            },
            {
              step: "02",
              title: "Aboneliklerini ekle",
              desc: "Kullandığın platformları tek tek gir. İlk sefer 5 dakika sürer, sonra bir daha uğraşmazsın.",
            },
            {
              step: "03",
              title: "Arkana yaslan",
              desc: "Yenileme günü yaklaşınca bildirim gelir, ay sonunda raporuna bakarsın.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="relative rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 overflow-hidden"
            >
              <span className="absolute -right-2 -top-6 font-serif italic text-[140px] leading-none text-zinc-800/60 select-none">
                {s.step}
              </span>
              <div className="relative">
                <span className="text-xs font-mono text-orange-400">
                  ADIM {s.step}
                </span>
                <h3 className="text-2xl font-semibold mt-3 mb-2">{s.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HAKKINDA */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-center">
          <div className="md:col-span-2 relative">
            <div
              className="absolute -inset-6 rounded-[2.5rem] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 30%, rgba(37,99,235,0.25), transparent 65%)",
              }}
            />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800 bg-gradient-to-br from-blue-900 to-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1000&q=80"
                alt="Kartla online ödeme"
                className="w-full h-full object-cover opacity-70"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

              <div className="absolute top-5 right-5 flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/70 backdrop-blur px-3 py-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                7 abonelik takipte
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/70 backdrop-blur p-3">
                <img
                  src="/milo-logo.jpg"
                  alt="Milo"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold">Milo</div>
                  <div className="text-xs text-zinc-400">Abonelik Takip Sistemi</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">₺1.247,90</div>
                  <div className="text-xs text-zinc-500">aylık toplam</div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm text-zinc-500 font-medium mb-2">Hakkında</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
              Milo{" "}
              <span className="font-serif italic font-normal">nedir?</span>
            </h2>
            <div className="space-y-4 text-zinc-400 text-lg leading-relaxed">
              <p>
                Milo, kullandığın dijital abonelikleri tek bir yerden takip
                etmen için yapılmış bir abonelik yönetim sistemi. Dizi, müzik,
                oyun, yazılım fark etmez. Ne kadar ödediğini, ne zaman
                yenilendiğini ve hangi hesapla açtığını unutmaman için var.
              </p>
              <p>
                Bugün çoğumuzun 5-10 tane aboneliği var ve bunların bir kısmını
                kullanmadan ödüyoruz bile.{" "}
                <span className="text-zinc-50">
                  Milo'nun amacı her ay tekrar eden bu küçük kayıpların önüne
                  geçmek.
                </span>
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mt-8">
              {[
                { icon: Wallet, title: "Sade", desc: "Karmaşık menüler yok, açtığın gibi kullanırsın." },
                { icon: ShieldCheck, title: "Güvenli", desc: "Hesap bilgilerin şifreli olarak saklanır." },
                { icon: Check, title: "Ücretsiz", desc: "Gizli ücret, premium plan yok." },
              ].map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4"
                >
                  <v.icon className="h-5 w-5 text-orange-400 mb-3" />
                  <div className="font-semibold mb-1">{v.title}</div>
                  <div className="text-sm text-zinc-500 leading-relaxed">{v.desc}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-zinc-800">
              {[
                { value: "15+", label: "Hazır platform" },
                { value: "AES", label: "Şifreleme" },
                { value: "₺0", label: "Ücret" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-semibold">{s.value}</div>
                  <div className="text-sm text-zinc-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-wide mb-4">SSS</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-zinc-400 mt-5 max-w-xl mx-auto leading-relaxed">
            Kullanmaya başlamadan önce en çok merak edilen soruları burada
            topladık. Cevabını bulamazsan bize yazabilirsin.
          </p>
        </div>
        <div className="border-b border-zinc-800">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="group w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="font-semibold text-base md:text-lg group-hover:text-zinc-300 transition-colors">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <p className="overflow-hidden text-zinc-400 text-sm md:text-base leading-relaxed">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ALT CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950">
          {/* Izgara deseni */}
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse at 70% 50%, black 20%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 70% 50%, black 20%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 72% 50%, rgba(37,99,235,0.22), transparent 40%), radial-gradient(ellipse at 0% 100%, rgba(234,88,12,0.15), transparent 45%)",
            }}
          />
          {/* Üst kenar ışığı */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center px-8 md:px-14 py-14 md:py-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
                Ay sonu
                <br />
                sürprizlerine
                <br />
                <span className="font-serif italic font-normal text-orange-300">
                  son ver.
                </span>
              </h2>
              <p className="text-zinc-400 mt-5 max-w-md leading-relaxed">
                Aboneliklerini bir kere ekle, gerisini Milo takip etsin. Ne
                zaman ne kadar çekileceğini artık önceden bileceksin.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-9">
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-4 pl-6 pr-1.5 py-1.5 bg-zinc-100 text-zinc-900 rounded-full font-medium hover:bg-white transition-colors"
                >
                  Ücretsiz Hesap Aç
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 text-white group-hover:rotate-45 transition-transform">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3.5 rounded-full border border-zinc-800 text-sm font-medium hover:bg-zinc-900 transition-colors"
                >
                  Zaten hesabım var
                </Link>
              </div>
            </div>

            {/* Yörüngede dönen platformlar */}
            <div className="relative hidden sm:flex items-center justify-center h-[400px]">
              <div className="absolute w-[220px] h-[220px] rounded-full border border-zinc-800" />
              <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-zinc-800" />

              {orbits.map((ring) => (
                <div
                  key={ring.radius}
                  className="absolute inset-0 animate-orbit"
                  style={{ animationDuration: ring.duration }}
                >
                  {ring.items.map((slug, i) => {
                    const p = platforms.find((x) => x.slug === slug)!;
                    const angle = (i / ring.items.length) * 2 * Math.PI;
                    return (
                      <div
                        key={slug}
                        className="absolute left-1/2 top-1/2"
                        style={{
                          transform: `translate(${Math.cos(angle) * ring.radius}px, ${Math.sin(angle) * ring.radius}px) translate(-50%, -50%)`,
                        }}
                      >
                        <div
                          className="animate-orbit-reverse flex items-center justify-center w-12 h-12 rounded-2xl border border-white/10 shadow-lg"
                          style={{
                            animationDuration: ring.duration,
                            backgroundColor: p.color,
                            boxShadow: `0 8px 30px -8px ${p.color}`,
                          }}
                        >
                          <PlatformLogo slug={p.slug} className="h-5 w-5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Merkez */}
              <div className="relative flex flex-col items-center">
                <div className="absolute -inset-8 rounded-full bg-blue-600/20 blur-2xl" />
                <img
                  src="/milo-logo.jpg"
                  alt="Milo"
                  className="relative w-20 h-20 rounded-full ring-4 ring-zinc-900 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-zinc-800 overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.05), transparent 65%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Bülten */}
            <div>
              <h3 className="text-3xl font-bold tracking-tight leading-tight mb-4">
                Bizden
                <br />
                Haberdar Ol
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Yeni özellikler geldiğinde mail atalım. Spam yok, söz.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm text-emerald-400">
                  <Check className="h-4 w-4" />
                  Teşekkürler, listeye eklendin.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email.trim()) setSubscribed(true);
                  }}
                  className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 pl-4 pr-1.5 py-1.5 focus-within:border-zinc-600 transition-colors"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Mail adresin"
                    className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder:text-zinc-600"
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-100 text-zinc-900 hover:bg-white transition-colors shrink-0"
                    aria-label="Gönder"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Hızlı linkler */}
            <div>
              <h4 className="text-lg font-semibold mb-5">Hızlı Linkler</h4>
              <ul className="space-y-3 text-zinc-400">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="hover:text-zinc-50 transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link to="/login" className="hover:text-zinc-50 transition-colors">
                    Giriş Yap
                  </Link>
                </li>
              </ul>
            </div>

            {/* İletişim (bilgileri kendine göre değiştir) */}
            <div>
              <h4 className="text-lg font-semibold mb-5">İletişim</h4>
              <ul className="space-y-3 text-zinc-400">
                <li>İstanbul, Türkiye</li>
                <li>
                  <a href="mailto:iletisim@milo.app" className="hover:text-zinc-50 transition-colors">
                    iletisim@milo.app
                  </a>
                </li>
                <li>Hafta içi 09:00 - 18:00</li>
              </ul>
            </div>

            {/* Sosyal medya */}
            <div>
              <h4 className="text-lg font-semibold mb-5">Bizi Takip Et</h4>
              <div className="flex items-center gap-3">
                {[
                  { slug: "github", label: "GitHub", href: "https://github.com" },
                  { slug: "x", label: "X", href: "https://x.com" },
                  { slug: "instagram", label: "Instagram", href: "https://instagram.com" },
                  { slug: "discord", label: "Discord", href: "https://discord.com" },
                ].map((s) => (
                  <a
                    key={s.slug}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-colors"
                  >
                    <PlatformLogo slug={s.slug} className="h-4 w-4 opacity-80" />
                  </a>
                ))}
              </div>
              <p className="text-sm text-zinc-500 mt-6 leading-relaxed">
                Bir fikrin ya da hata bildirimin varsa sosyal medyadan da
                yazabilirsin.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t border-zinc-800 text-sm">
            <div className="flex items-center gap-2 text-zinc-500">
              <img src="/milo-logo.jpg" alt="Milo" className="w-6 h-6 rounded-full" />
              © 2026 Milo. Tüm hakları saklıdır.
            </div>
            <div className="flex items-center gap-5 text-zinc-300">
              <button
                type="button"
                onClick={() => setLegalDoc("privacy")}
                className="hover:text-zinc-50 transition-colors"
              >
                Gizlilik Politikası
              </button>
              <button
                type="button"
                onClick={() => setLegalDoc("terms")}
                className="hover:text-zinc-50 transition-colors"
              >
                Kullanım Şartları
              </button>
              <a href="#" className="hover:text-zinc-50 transition-colors">Çerezler</a>
            </div>
          </div>
        </div>
      </footer>

      {/* GİZLİLİK / KULLANIM ŞARTLARI POP-UP */}
      {legalDoc && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setLegalDoc(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-title"
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden animate-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute -top-24 -right-24 w-72 h-72 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(37,99,235,0.18), transparent 65%)",
              }}
            />

            {/* Başlık */}
            <div className="relative flex items-start justify-between gap-4 px-7 pt-7 pb-5 border-b border-zinc-800">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  {legalDoc === "privacy" ? (
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <FileText className="h-5 w-5 text-orange-400" />
                  )}
                </div>
                <div>
                  <h2 id="legal-title" className="text-xl md:text-2xl font-semibold tracking-tight">
                    {legalDocs[legalDoc].title}
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Son güncelleme: 25 Eylül 2026
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLegalDoc(null)}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-zinc-800 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900 transition-colors shrink-0"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* İçerik */}
            <div className="relative overflow-y-auto px-7 py-6 space-y-6">
              <p className="text-zinc-400 leading-relaxed">
                {legalDocs[legalDoc].intro}
              </p>
              {legalDocs[legalDoc].sections.map((sec, i) => (
                <div key={sec.title}>
                  <h3 className="flex items-center gap-3 font-semibold mb-2">
                    <span className="text-xs font-mono text-zinc-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {sec.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed pl-8">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Alt */}
            <div className="relative flex items-center justify-between gap-4 px-7 py-4 border-t border-zinc-800 bg-zinc-900/40">
              <p className="text-xs text-zinc-500">
                Sorun olursa: iletisim@milo.app
              </p>
              <button
                type="button"
                onClick={() => setLegalDoc(null)}
                className="px-5 py-2 rounded-full bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-white transition-colors"
              >
                Anladım
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default HomePage;
