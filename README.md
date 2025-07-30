# 🎮 Magic: The Gathering - Aplicación Web Completa

## 📋 Descripción del Proyecto

Esta es una aplicación web completa para la gestión de cartas **Magic: The Gathering** que incluye:

- **Backend Node.js** con Express y PostgreSQL
- **Frontend** HTML, CSS y JavaScript
- **API REST** completa para todas las operaciones
- **Interfaz moderna** y responsiva

## 🏗️ Arquitectura del Proyecto

### Tecnologías Utilizadas
- **Backend:** Node.js, Express, PostgreSQL
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Base de Datos:** PostgreSQL
- **Seguridad:** Helmet, CORS, Rate Limiting

### Estructura de Archivos
```
cartas/
├── server.js              # Servidor backend Node.js
├── package.json           # Dependencias del proyecto
├── env.example           # Variables de entorno (ejemplo)
├── public/               # Archivos estáticos del frontend
│   ├── index.html        # Página principal
│   ├── styles.css        # Estilos CSS
│   └── script.js         # JavaScript del frontend
├── README.md             # Este archivo
└── .env                  # Variables de entorno (crear)
```

## 🚀 Instalación y Configuración

### 1. Requisitos Previos
- **Node.js** (versión 16 o superior)
- **PostgreSQL** instalado y funcionando
- **Base de datos** `magic_the_gathering` creada

### 2. Configuración de la Base de Datos

#### A. Crear la base de datos
```sql
CREATE DATABASE magic_the_gathering;
```

#### B. Verificar tablas existentes
Tu base de datos debe tener estas tablas:
- `usuario`
- `sucursal`
- `productos`
- `mazo`
- `transaccion`
- `detalle_carta`

### 3. Configuración del Proyecto

#### A. Instalar dependencias
```bash
npm install
```

#### B. Configurar variables de entorno
1. Copiar el archivo de ejemplo:
   ```bash
   copy env.example .env
   ```

2. Editar `.env` con tus credenciales:
   ```env
   # Para PostgreSQL local
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=magic_the_gathering
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña
   DB_SSL=false
   PORT=3000
   ```

#### C. Para bases de datos en la nube
Si tu base de datos está en la nube (Heroku, Railway, Supabase, etc.), usa estas configuraciones:

**Heroku PostgreSQL:**
```env
DB_HOST=tu-app.herokuapp.com
DB_PORT=5432
DB_NAME=database_name
DB_USER=username
DB_PASSWORD=password
DB_SSL=true
```

**Railway:**
```env
DB_HOST=containers-us-west-1.railway.app
DB_PORT=5432
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=password
DB_SSL=true
```

**Supabase:**
```env
DB_HOST=db.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=password
DB_SSL=true
```

### 4. Ejecutar la Aplicación

#### A. Modo desarrollo
```bash
npm run dev
```

#### B. Modo producción
```bash
npm start
```

#### C. Acceder a la aplicación
- **Frontend:** http://localhost:3000
- **API:** http://localhost:3000/api

## 🎯 Funcionalidades Implementadas

### 1. **Filtrar Cartas** 🔍
- **Endpoint:** `POST /api/cartas/filtrar`
- **Funcionalidad:** 
  - Buscar por nombre (búsqueda parcial)
  - Filtrar por tipo de carta
  - Filtrar por color de mana
  - Filtrar por rareza

### 2. **Crear Mazos** 🃏
- **Endpoint:** `POST /api/mazos`
- **Funcionalidad:**
  - Crear nuevo mazo con nombre, formato y descripción
  - Ver lista de mazos existentes
  - Mostrar estadísticas de cada mazo

### 3. **Registrar Productos** 📦
- **Endpoint:** `POST /api/productos`
- **Funcionalidad:**
  - Registrar nuevos productos con descripción y coste
  - Marcar si es una carta o no
  - Ver lista de productos registrados

### 4. **Transacciones** 💱
- **Endpoint:** `POST /api/transacciones`
- **Funcionalidad:**
  - Registrar compras, ventas e intercambios
  - Especificar emisor, receptor y cantidad
  - Ver historial de transacciones

### 5. **Gestionar Usuarios** 👥
- **Endpoint:** `POST /api/usuarios`
- **Funcionalidad:**
  - Crear nuevos usuarios
  - Ver lista completa de usuarios registrados
  - Mostrar información detallada de cada usuario

### 6. **Gestionar Sucursales** 🏪
- **Endpoint:** `POST /api/sucursales`
- **Funcionalidad:**
  - Crear nuevas sucursales
  - Ver lista de sucursales existentes
  - Gestionar información de ubicación

## 🔧 API Endpoints

### Usuarios
- `GET /api/usuarios` - Obtener todos los usuarios
- `POST /api/usuarios` - Crear nuevo usuario

### Sucursales
- `GET /api/sucursales` - Obtener todas las sucursales
- `POST /api/sucursales` - Crear nueva sucursal

### Productos
- `GET /api/productos` - Obtener todos los productos
- `POST /api/productos` - Crear nuevo producto

### Mazos
- `GET /api/mazos` - Obtener todos los mazos
- `POST /api/mazos` - Crear nuevo mazo

### Transacciones
- `GET /api/transacciones` - Obtener todas las transacciones
- `POST /api/transacciones` - Crear nueva transacción

### Cartas
- `POST /api/cartas/filtrar` - Filtrar cartas

### Salud
- `GET /api/health` - Verificar estado del servidor

## 🎨 Características de la Interfaz

### Diseño Moderno
- **Paleta de colores** inspirada en Magic: The Gathering
- **Diseño responsivo** que funciona en móviles y desktop
- **Animaciones suaves** y efectos hover
- **Iconos Font Awesome** para mejor UX

### Navegación Intuitiva
- **Menú de navegación** fijo en la parte superior
- **Secciones organizadas** por funcionalidad
- **Indicadores visuales** de sección activa

### Formularios Inteligentes
- **Validación en tiempo real** de campos
- **Mensajes de error** claros y específicos
- **Estados de carga** con spinners
- **Confirmaciones** de operaciones exitosas

## 🔒 Seguridad

### Características de Seguridad Implementadas
- **Helmet** para headers de seguridad
- **CORS** configurado correctamente
- **Rate Limiting** para prevenir spam
- **Validación de entrada** en todos los endpoints
- **Manejo de errores** robusto

## 🚀 Despliegue

### Opciones de Despliegue

#### A. Heroku
1. Crear cuenta en Heroku
2. Conectar repositorio Git
3. Configurar variables de entorno
4. Desplegar automáticamente

#### B. Railway
1. Crear cuenta en Railway
2. Conectar repositorio Git
3. Configurar variables de entorno
4. Desplegar automáticamente

#### C. Vercel
1. Crear cuenta en Vercel
2. Conectar repositorio Git
3. Configurar variables de entorno
4. Desplegar automáticamente

### Variables de Entorno para Producción
```env
NODE_ENV=production
PORT=3000
DB_HOST=tu-host-en-la-nube
DB_PORT=5432
DB_NAME=tu_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_SSL=true
```

## 🐛 Solución de Problemas

### Error de Conexión a BD
1. Verificar que PostgreSQL esté ejecutándose
2. Confirmar credenciales en `.env`
3. Verificar que la base de datos existe
4. Comprobar que las tablas están creadas

### Error de CORS
- El backend ya tiene CORS configurado correctamente
- Si persiste, verificar que el frontend esté en el mismo dominio

### Error de Puerto
- Cambiar `PORT` en `.env` si el puerto 3000 está ocupado
- Verificar que no haya otros servicios usando el mismo puerto

## 📚 Código Comentado

### Estructura del Backend (`server.js`)
```javascript
// Configuración de la base de datos
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  // ... configuración
});

// Endpoint para crear usuario
app.post('/api/usuarios', async (req, res) => {
  // Validación de entrada
  // Inserción en base de datos
  // Respuesta al cliente
});
```

### Estructura del Frontend (`public/script.js`)
```javascript
// Configuración de la API
const API_BASE_URL = 'http://localhost:3000/api';

// Función para crear usuario
async function handleCrearUsuario(e) {
  // Obtener datos del formulario
  // Enviar petición al backend
  // Mostrar resultado
}
```

## 🎓 Para tu Tarea Académica

### Puntos Destacados:
1. **Arquitectura completa** con backend y frontend separados
2. **API REST** bien estructurada
3. **Conexión segura** a base de datos PostgreSQL
4. **Interfaz moderna** y responsiva
5. **Código bien comentado** y organizado
6. **Validaciones** y manejo de errores
7. **Preparado para producción** con variables de entorno

### Funcionalidades Cumplidas:
✅ Filtrar cartas por sus datos  
✅ Crear mazos  
✅ Registrar nuevos productos  
✅ Realizar intercambios o compras de cartas  
✅ Ver los datos de los usuarios  
✅ Gestionar sucursales  
✅ API REST completa  
✅ Backend Node.js funcional  

## 📞 Soporte

Si tienes problemas:

1. **Verificar logs del servidor** en la terminal
2. **Revisar consola del navegador** (F12 → Console)
3. **Confirmar variables de entorno** en `.env`
4. **Verificar conexión a la base de datos**

### Comandos útiles:
```bash
# Verificar estado del servidor
curl http://localhost:3000/api/health

# Ver logs en tiempo real
npm run dev

# Instalar dependencias
npm install

# Ejecutar en producción
npm start
```

---

**¡Tu aplicación Magic: The Gathering está lista para usar! 🎮✨**
