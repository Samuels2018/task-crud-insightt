import {useState} from 'react';

interface AuthFormProps {
  onLogin: (user: User) => void
}
interface User {
  id: number;
  email: string;
  name?: string;
}

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "El nombre es requerido"
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    // Simular llamada a API
    setTimeout(() => {
      const userData: User = {
        id: Date.now(),
        email: formData.email,
        name: isLogin ? formData.email.split("@")[0] : formData.name,
      }

      onLogin(userData)
      setLoading(false)
    }, 1000)
  }
  

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow">
          <div className="card-body p-4">
            <div className="text-center mb-4">
              <i className="bi bi-check2-square display-4 text-primary"></i>
              <h2 className="card-title mt-2">{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
              <p className="text-muted">
                {isLogin ? "Accede a tu cuenta para gestionar tus tareas" : "Crea una cuenta para comenzar"}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <i className="bi bi-person me-1"></i>
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu nombre completo"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <i className="bi bi-envelope me-1"></i>
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <i className="bi bi-lock me-1"></i>
                  Contraseña
                </label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Mínimo 6 caracteres"
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    <i className="bi bi-lock-fill me-1"></i>
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Repite tu contraseña"
                  />
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Procesando...
                  </>
                ) : (
                  <>
                    <i className={`bi ${isLogin ? "bi-box-arrow-in-right" : "bi-person-plus"} me-1`}></i>
                    {isLogin ? "Iniciar Sesión" : "Registrarse"}
                  </>
                )}
              </button>
            </form>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setFormData({ name: "", email: "", password: "", confirmPassword: "" })
                  setErrors({})
                }}
              >
                {isLogin ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia sesión"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default AuthForm;