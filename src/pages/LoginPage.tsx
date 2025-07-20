// src/routes/LoginPage.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";

export const LoginPage = () => {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect: login,
    user
  } = useAuth0();

  const signup = () => 
    login({ authorizationParams: { screen_hint: "signup" } });

  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) {
    // Redirige a la página principal si ya está autenticado
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <h5 className="text-muted">Cargando...</h5>
        </div>
      </div>
    )
  }


  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow border-0" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-5">
                  <div
                    className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <span className="text-white fw-bold" style={{ fontSize: "2rem" }}>
                      👤
                    </span>
                  </div>
                  <h1 className="h3 fw-bold text-dark mb-3">¡Bienvenido de vuelta!</h1>
                  <p className="text-muted">Inicia sesión en tu cuenta o crea una nueva</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger border-0 mb-4" role="alert">
                    <div className="d-flex align-items-center">
                      <span className="me-2">⚠️</span>
                      <div>
                        <strong>Error:</strong> {error.message}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="d-grid gap-3 mb-4">
                  <button
                    onClick={() => login()}
                    className="btn btn-primary btn-lg"
                    style={{
                      height: "50px",
                      borderRadius: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    🔐 Iniciar Sesión
                  </button>

                  <button
                    onClick={signup}
                    className="btn btn-outline-primary btn-lg"
                    style={{
                      height: "50px",
                      borderRadius: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    ✨ Crear Cuenta Nueva
                  </button>
                </div>

                {/* Security Note */}
                <div className="text-center">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <span className="me-2">🔒</span>
                    <small className="text-muted fw-medium">Autenticación segura con Auth0</small>
                  </div>
                  <small className="text-muted">Al continuar, aceptas nuestros términos y condiciones</small>
                </div>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="card mt-4 border-0 bg-white shadow-sm">
              <div className="card-body p-4">
                <h6 className="text-center text-muted mb-4">Beneficios de tener una cuenta</h6>
                <div className="row text-center g-4">
                  <div className="col-4">
                    <div className="mb-2" style={{ fontSize: "2rem" }}>
                      ⚡
                    </div>
                    <small className="text-muted fw-medium">Acceso rápido</small>
                  </div>
                  <div className="col-4">
                    <div className="mb-2" style={{ fontSize: "2rem" }}>
                      🛡️
                    </div>
                    <small className="text-muted fw-medium">Datos seguros</small>
                  </div>
                  <div className="col-4">
                    <div className="mb-2" style={{ fontSize: "2rem" }}>
                      🎯
                    </div>
                    <small className="text-muted fw-medium">Personalizado</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};