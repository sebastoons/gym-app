# 🏋️ GymApp - Sistema de Gestión de Gimnasio

Sistema completo de gestión para gimnasios desarrollado con **Django REST Framework** y **React + Vite**.

## 🚀 Características

- **Autenticación JWT** completa (login, registro, logout)
- **Roles de usuario**: Cliente, Entrenador, Administrador
- **Base de datos SQLite** con modelos personalizados
- **Frontend React** moderno con CSS modular
- **API REST** documentada
- **Diseño responsivo** y profesional

## 🛠️ Tecnologías

### Backend
- **Django 4.2.7**
- **Django REST Framework**
- **SQLite**
- **JWT Authentication**
- **CORS Headers**

### Frontend
- **React 18**
- **Vite**
- **React Router DOM**
- **Axios**
- **CSS3** con variables y animaciones

## 📋 Requisitos Previos

- **Python 3.8+**
- **Node.js 16+**
- **npm** o **yarn**

## ⚡ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/gym-app.git
cd gym-app
```

### 2. Configurar Backend (Django)
```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar base de datos
python manage.py makemigrations authentication
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# Ejecutar servidor de desarrollo
python manage.py runserver
```

### 3. Configurar Frontend (React)
```bash
# En otra terminal
cd frontend

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

## 🌐 Acceso a la Aplicación

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin

## 📁 Estructura del Proyecto

```
gym-app/
├── backend/                 # Django REST API
│   ├── gym_project/        # Configuración principal
│   ├── authentication/     # App de autenticación
│   ├── gym/               # App principal del gimnasio
│   ├── requirements.txt   # Dependencias Python
│   └── manage.py
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── context/       # Context API
│   │   ├── services/      # API calls
│   │   └── styles/        # CSS modular
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔐 API Endpoints

### Autenticación
- `POST /api/auth/register/` - Registro de usuario
- `POST /api/auth/login/` - Iniciar sesión
- `POST /api/auth/logout/` - Cerrar sesión
- `GET /api/auth/profile/` - Perfil del usuario

## 👥 Roles de Usuario

### Cliente
- Ver clases disponibles
- Reservar clases
- Gestionar perfil
- Ver horarios

### Entrenador
- Ver clases asignadas
- Gestionar participantes
- Ver horarios personales

### Administrador
- Gestión completa de usuarios
- Gestión de clases y horarios
- Gestión de membresías
- Reportes y estadísticas

## 🎨 Características del Frontend

- **Diseño moderno** con gradientes y animaciones
- **CSS modular** organizado por componentes
- **Variables CSS** centralizadas
- **Responsive design**
- **Estados de loading** y validación
- **Navegación protegida** por roles

## 🔧 Scripts Disponibles

### Backend
```bash
python manage.py runserver    # Ejecutar servidor
python manage.py test         # Ejecutar tests
python manage.py migrate      # Aplicar migraciones
```

### Frontend
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

Tu Nombre - [tu@email.com](mailto:tu@email.com)

Enlace del Proyecto: [https://github.com/TU_USUARIO/gym-app](https://github.com/TU_USUARIO/gym-app)

## 🚧 Próximas Características

- [ ] Gestión de clases y horarios
- [ ] Sistema de reservas
- [ ] Gestión de membresías
- [ ] Sistema de pagos
- [ ] Notificaciones
- [ ] Dashboard con estadísticas
- [ ] Aplicación móvil