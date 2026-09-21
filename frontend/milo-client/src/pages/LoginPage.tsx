import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()  

    const handleLogin = async () => {
        try {
            const data=await login(email, password);

            localStorage.setItem("token", data.token);
            
            navigate("/subscription")

        } catch (error) {
            console.error("Giriş hatası:", error);
        }
    };

  return (
   <div>
      <h2>Giriş Yap</h2>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Şifre:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}>Giriş</button>

      <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
    </div>
  )
}

export default LoginPage