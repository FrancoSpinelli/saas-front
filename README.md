# SaaS Plataforma de Servicios por Suscripción

## 📖 Descripción

Plataforma SaaS completa construida con React, TypeScript y Vite. Esta aplicación permite a los administradores gestionar servicios, planes y suscripciones, mientras que los clientes pueden explorar y suscribirse a diferentes servicios según sus intereses.

## ✨ Características Principales

### Para Administradores
- **Dashboard completo** 
- **Gestión de usuarios** 
- **Gestión de categorías** 
- **Gestión de servicios** 
- **Gestión de planes** 
- **Gestión de suscripciones**
- **Gestión de pagos** 
- **Notificaciones**

### Para Clientes
- **Exploración de servicios**
- **Suscripción a servicios**
- **Dashboard personalizado**
- **Gestión de suscripciones**
- **Sistema de perfil**
- **Contenido desbloqueado**

## 🛠️ Stack Tecnológico

- **Framework:** React 19.1.1
- **Lenguaje:** TypeScript 5.9.3
- **Build Tool:** Vite 7.1.7
- **UI Library:** Material-UI (MUI) 7.3.5
- **Routing:** React Router DOM 7.9.5
- **HTTP Client:** Axios 1.13.2
- **State Management:** React Hooks + Context
- **Notifications:** React Toastify 11.0.5
- **Alerts:** SweetAlert2 11.26.3
- **Real-time:** Socket.io Client 4.8.1
- **Date Utilities:** date-fns 4.1.0
- **Linting:** ESLint 9.36.0

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Servicios API y configuración HTTP
│   ├── http.ts            # Cliente Axios configurado
│   └── services/          # Servicios organizados por dominio
├── Components/            # Componentes reutilizables
│   ├── Sidebar.tsx        # Navegación principal
│   ├── EmptyState/        # Estado vacío reutilizable
│   ├── Toast/             # Sistema de notificaciones
│   └── SweetAlert/        # Alertas de confirmación
├── pages/                 # Páginas organizadas por funcionalidad
│   ├── Home/              # Dashboards (Admin y Cliente)
│   ├── Services/          # Gestión y exploración de servicios
│   ├── Plans/             # Gestión de planes de suscripción
│   ├── Subscriptions/     # Gestión de suscripciones
│   ├── Categories/        # Gestión de categorías
│   ├── Users/             # Gestión de usuarios
│   ├── Payments/          # Sistema de pagos
│   └── Profile/           # Perfiles de usuario
├── hooks/                 # Custom hooks
├── router/                # Configuración de rutas y protección
├── types/                 # Definiciones TypeScript
├── utils/                 # Utilidades y helpers
├── validations/           # Esquemas de validación
└── theme.ts              # Configuración de tema MUI
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/FrancoSpinelli/saas-front
   cd saas-front
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```

   Editar `.env` con la configuración de tu API backend (opcional).

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación**
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Usuarios de Prueba
   ```javascript
   // Admin
   email: francospinelli2903@gmail.com
   password: 1234

   // Cliente
   email: santilongo@gmail.com
   password: 1234
   ```

## 📝 Scripts Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo
npm run build    # Compilar para producción
npm run preview  # Vista previa del build de producción
npm run lint     # Ejecutar ESLint
```

## 🔐 Sistema de Autenticación y Roles

### Roles de Usuario
- **ADMIN**: Acceso completo al panel de administración
- **CLIENT**: Acceso a exploración y suscripción de servicios

## 💳 Sistema de Suscripciones

### Estados de Suscripción
- **ACTIVE**: Suscripción activa y funcional
- **PENDING_PAYMENT**: Pendiente de pago
- **EXPIRED**: Suscripción vencida
- **CANCELED**: Cancelada por el usuario

### Tipos de Planes
- **MONTHLY**: Plan mensual
- **QUARTERLY**: Plan trimestral  
- **SEMESTRAL**: Plan semestral
- **ANNUAL**: Plan anual


## 🔧 Configuración de Desarrollo

### ESLint
El proyecto incluye configuración de ESLint optimizada para React y TypeScript:
- Reglas específicas para React Hooks
- Validación de tipos TypeScript
- Reglas de estilo y mejores prácticas

### Estructura de Tipos
Tipos TypeScript organizados por dominio:
- Entidades principales (User, Service, Plan, etc.)
- DTOs para comunicación con API
- Enums para estados y configuraciones

## 🌐 API Integration

### Servicios API
Servicios organizados por dominio business:
- `auth.service.ts`: Autenticación y autorización
- `services.service.ts`: Gestión de servicios
- `plans.service.ts`: Gestión de planes
- `subscriptions.service.ts`: Gestión de suscripciones
- `categories.service.ts`: Gestión de categorías
- `user.service.ts`: Gestión de usuarios
- `payments.service.ts`: Gestión de pagos


## 🚀 Deployment

### Build para Producción
```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.


## 📄 Licencia

Desarrollado con pasión por Franco Spinelli para la materia Programación III - INSPT-UTN.
