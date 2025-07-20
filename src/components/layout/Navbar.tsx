import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const {user,  logout } = useAuth0();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          <i className="bi bi-check2-square me-2"></i>
          TaskManager
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-3">
                    <i className="bi bi-person-circle me-1"></i>
                    Hola, {user.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={() => logout()}>
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <span className="navbar-text">
                  <i className="bi bi-person me-1"></i>
                  Inicia sesión para gestionar tus tareas
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;