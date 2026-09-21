import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { register } from "../services/authService"

function RegisterPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegister = async () => {
        try {
            await register(firstName, lastName, email, password)
            navigate("/login")
        } catch (error) {
            console.error("Kayıt hatası:", error)
        }
    }

  return (
    <div>
        <div>
      <h2>Kayıt Ol</h2>
    </div>

       <div>
        <label>Ad:</label>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>

        <div>
        <label>Soyad:</label>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>

      <div>
        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <label>Şifre:</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button onClick={handleRegister}>Kayıt Ol</button>

      <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
    </div>
  )
}

export default RegisterPage