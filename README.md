# Documentación Técnica: Task Management App

## Visión General
Aplicación React para gestión de tareas con autenticación Auth0 y herramientas modernas de desarrollo. Proporciona operaciones CRUD completas para tareas con interfaz responsive y sistema de autenticación seguro.

**Relevancia**:  
Demuestra prácticas modernas de desarrollo React con TypeScript, Vite y gestión de estado.

---
## Tecnologías Principales
| Categoría           | Tecnología          | Versión    | Propósito                                  |
|---------------------|---------------------|------------|--------------------------------------------|
| Frontend Framework  | React               | ^19.1.0    | Componentes UI                             |
| Lenguaje            | TypeScript          | ~5.8.3     | Tipado estático                            |
| Build Tool          | Vite                | ^7.0.4     | Desarrollo rápido y builds                 |
| Autenticación       | Auth0 React         | ^2.3.0     | Gestión de identidad                       |
| HTTP Client         | Axios               | ^1.10.0    | Comunicación con API                       |
| UI Framework        | Bootstrap           | ^5.3.0     | Diseño responsive                          |
| Router              | React Router DOM    | ^7.7.0     | Navegación cliente                         |
| Testing             | Jest                | ^29.7.0    | Pruebas unitarias                          |

---
## Arquitectura de la Aplicación
Sistema organizado en capas con separación de responsabilidades:

Client Application
├── App.tsx (Auth0Provider + Router)
├── React Router (Protected Routes)
│
├── Capa de Componentes UI
│ ├── DashboardPage
│ ├── TaskList
│ ├── TaskForm
│ └── TaskItem
│
├── Capa de Servicios
│ ├── useTasks Hook (Gestión de estado)
│ └── taskService (Cliente API)
│
└── Infraestructura
├── clientAxios (HTTP)
└── Auth0 (Identity Provider)


**Herramientas de soporte**:  
- Vite (Dev Server & Build)
- TypeScript (Type Checking)
- Jest (Testing)
- ESLint (Calidad de código)

---
## Componentes Clave

### 🔐 Sistema de Autenticación
- **Auth0 Integration**:  
  Proveedor centralizado con `@auth0/auth0-react`
- **Protected Routing**:  
  Rutas protegidas que requieren autenticación
- **Flujo de Login**:  
  Página dedicada con manejo de redirecciones Auth0

### ✅ Sistema de Gestión de Tareas
- **Gestión de Estado**:  
  Custom hook `useTasks` para operaciones CRUD
- **Operaciones**:  
  Crear/Leer/Actualizar/Eliminar tareas
- **Componentes UI**:  
  - `TaskList`: Muestra colección de tareas
  - `TaskForm`: Formulario creación/edición
  - `TaskItem`: Componente individual

### ⚙️ Infraestructura de Desarrollo
- **Build System**:  
  Vite con HMR (Hot Module Replacement)
- **Type Safety**:  
  TypeScript en modo estricto
- **Testing Suite**:  
  Jest + React Testing Library

---
## Workflow de Desarrollo
Comandos principales (`package.json`):

| Comando         | Acción                          | Propósito                              |
|-----------------|---------------------------------|----------------------------------------|
| `npm run dev`   | `vite`                          | Inicia servidor desarrollo             |
| `npm run build` | `tsc -b && vite build`          | Build producción                      |
| `npm run lint`  | `eslint .`                      | Verificación calidad código           |
| `npm run test`  | `jest`                          | Ejecuta pruebas                       |
| `npm run preview` | `vite preview`                | Previsualiza build producción local   |

---
## Estructura de Archivos



src/
├── main.tsx # Punto de entrada
├── App.tsx # Componente raíz (Auth0 + Router)
├── layouts/ # Componentes estructurales
│ ├── NavBar.tsx
│ └── Footer.tsx
├── pages/ # Vistas principales
│ ├── DashboardPage.tsx
│ └── LoginPage.tsx
├── features/ # Lógica de tareas
│ ├── TaskList.tsx
│ ├── TaskForm.tsx
│ └── TaskItem.tsx
├── hooks/ # Custom hooks
│ └── useTasks.ts # Gestión estado tareas
├── services/ # Conexión con API
│ ├── taskService.ts
│ └── clientAxios.ts
└── tests/ # Pruebas unitarias