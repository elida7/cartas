# 🚀 Guía de Despliegue - Magic: The Gathering App

## 📋 Instrucciones p
Guía para ayudar a configurar y desplegar la aplicación Magic: The Gathering en cualquier entorno.

---

## 🔧 Paso 1: Preparación del Entorno

### A. Verificar Node.js
```bash
# Verificar que tienes Node.js instalado
node --version
npm --version

# Si no tienes Node.js, descárgalo de: https://nodejs.org/
```

### B. Clonar o Descargar el Proyecto
```bash
# Si tienes Git
git clone [URL_DEL_REPOSITORIO]

# O simplemente descarga los archivos y extráelos
```

---

## 🔧 Paso 2: Configuración de la Base de Datos

### A. Para Base de Datos Local (PostgreSQL)
1. **Instalar PostgreSQL** si no lo tienes
2. **Crear la base de datos:**
   ```sql
   CREATE DATABASE magic_the_gathering;
   ```
3. **Verificar que tienes las tablas necesarias:**
   ```sql
   \dt
   -- Deberías ver: usuario, sucursal, productos, mazo, transaccion, detalle_carta
   ```

### B. Para Base de Datos en la Nube
Si tu base de datos está en la nube, necesitarás las credenciales de conexión:

**Ejemplos de proveedores:**
- **Heroku PostgreSQL**
- **Railway**
- **Supabase**
- **AWS RDS**
- **Google Cloud SQL**

---

## 🔧 Paso 3: Configuración del Proyecto

### A. Instalar Dependencias
```bash
# Navegar al directorio del proyecto
cd cartas

# Instalar dependencias
npm install
```

### B. Configurar Variables de Entorno
1. **Copiar el archivo de ejemplo:**
   ```bash
   copy env.example .env
   ```

2. **Editar el archivo `.env` con tus credenciales:**

   **Para PostgreSQL local:**
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=magic_the_gathering
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña_aqui
   DB_SSL=false
   PORT=3000
   NODE_ENV=development
   ```

   **Para base de datos en la nube:**
   ```env
   DB_HOST=tu-host-en-la-nube.com
   DB_PORT=5432
   DB_NAME=tu_base_de_datos
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_SSL=true
   PORT=3000
   NODE_ENV=production
   ```

---

## 🚀 Paso 4: Ejecutar la Aplicación

### A. Modo Desarrollo (Recomendado para pruebas)
```bash
npm run dev
```

### B. Modo Producción
```bash
npm start
```

### C. Verificar que Funciona
1. **Abrir el navegador** en: http://localhost:3000
2. **Verificar la API** en: http://localhost:3000/api/health
3. **Probar crear un usuario** en la sección "Crear Usuario"

---

## 🌐 Paso 5: Despliegue en la Nube

### Opción A: Heroku (Recomendado)

1. **Crear cuenta en Heroku:**
   - Ve a https://heroku.com
   - Crea una cuenta gratuita

2. **Instalar Heroku CLI:**
   ```bash
   # Windows
   # Descarga desde: https://devcenter.heroku.com/articles/heroku-cli

   # Verificar instalación
   heroku --version
   ```

3. **Crear aplicación en Heroku:**
   ```bash
   # Login
   heroku login

   # Crear app
   heroku create tu-app-magic

   # Agregar base de datos PostgreSQL
   heroku addons:create heroku-postgresql:mini
   ```

4. **Configurar variables de entorno:**
   ```bash
   # Obtener URL de la base de datos
   heroku config:get DATABASE_URL

   # Configurar variables
   heroku config:set NODE_ENV=production
   heroku config:set DB_SSL=true
   ```

5. **Desplegar:**
   ```bash
   git add .
   git commit -m "Primer despliegue"
   git push heroku main
   ```

### Opción B: Railway

1. **Crear cuenta en Railway:**
   - Ve a https://railway.app
   - Conecta tu cuenta de GitHub

2. **Crear proyecto:**
   - Click en "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Selecciona tu repositorio

3. **Configurar base de datos:**
   - Ve a "Variables"
   - Agrega las variables de entorno necesarias

4. **Desplegar automáticamente:**
   - Railway detectará que es un proyecto Node.js
   - Se desplegará automáticamente

### Opción C: Vercel

1. **Crear cuenta en Vercel:**
   - Ve a https://vercel.com
   - Conecta tu cuenta de GitHub

2. **Importar proyecto:**
   - Click en "New Project"
   - Selecciona tu repositorio
   - Configura las variables de entorno

3. **Desplegar:**
   - Vercel detectará automáticamente el framework
   - Se desplegará en segundos

---

## 🔧 Paso 6: Configuración de Base de Datos en la Nube

### A. Heroku PostgreSQL
```bash
# Conectar a la base de datos
heroku pg:psql

# Ejecutar scripts SQL para crear tablas
\i schema.sql
```

### B. Railway PostgreSQL
```bash
# Obtener credenciales
railway variables

# Conectar usando psql
psql "postgresql://user:password@host:port/database"
```

### C. Supabase
1. **Crear proyecto en Supabase**
2. **Ir a SQL Editor**
3. **Ejecutar scripts para crear tablas**

---

## 🧪 Paso 7: Pruebas

### A. Probar la API
```bash
# Verificar que el servidor funciona
curl http://localhost:3000/api/health

# Crear un usuario de prueba
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com"}'
```

### B. Probar la Interfaz Web
1. **Ir a:** http://localhost:3000
2. **Crear un usuario** en la sección "Crear Usuario"
3. **Verificar** que aparece en "Usuarios"
4. **Probar otras funcionalidades**

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Connection refused"
- Verificar que PostgreSQL esté ejecutándose
- Confirmar credenciales en `.env`
- Verificar que la base de datos existe

### Error: "Port already in use"
```bash
# Cambiar puerto en .env
PORT=3001
```

### Error: "SSL connection required"
```env
# En .env, cambiar:
DB_SSL=true
```

---

## 📞 Comandos Útiles

### Desarrollo
```bash
# Ejecutar en modo desarrollo
npm run dev

# Ver logs en tiempo real
npm run dev

# Instalar dependencias
npm install
```

### Producción
```bash
# Ejecutar en modo producción
npm start

# Verificar estado
curl http://localhost:3000/api/health
```

### Base de Datos
```bash
# Conectar a PostgreSQL local
psql -U postgres -d magic_the_gathering

# Ver tablas
\dt

# Ver datos de ejemplo
SELECT * FROM usuario LIMIT 5;
```

---

## ✅ Checklist Final

- [ ] Node.js instalado y funcionando
- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` configurado correctamente
- [ ] Base de datos PostgreSQL creada y accesible
- [ ] Tablas necesarias creadas
- [ ] Servidor ejecutándose (`npm run dev`)
- [ ] Aplicación accesible en http://localhost:3000
- [ ] API funcionando (http://localhost:3000/api/health)
- [ ] Funcionalidades probadas (crear usuario, etc.)

---

## 🎯 Para tu Compañero

### Lo que necesita hacer:
1. **Descargar/Clonar** el proyecto
2. **Instalar Node.js** si no lo tiene
3. **Configurar** el archivo `.env` con sus credenciales
4. **Ejecutar** `npm install`
5. **Ejecutar** `npm run dev`
6. **Probar** la aplicación

### Lo que NO necesita hacer:
- ❌ Modificar código
- ❌ Crear funciones PostgreSQL
- ❌ Configurar servidor web
- ❌ Manejar CORS o seguridad

**¡La aplicación está lista para usar! 🎮✨** 