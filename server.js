import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuración de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por ventana
});
app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la base de datos
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'magic_the_gathering',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 20
});

// Verificar conexión a la base de datos
pool.on('connect', () => {
  console.log('✅ Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error en la conexión a PostgreSQL:', err);
});

// ===== RUTAS DE LA API =====

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===== USUARIOS =====

// Crear usuario
app.post('/api/usuarios', async (req, res) => {
  const { id_usuario, username, email, tlf, pais, ciudad, calle } = req.body;
  
  if (!id_usuario || !username || !email) {
    return res.status(400).json({ 
      success: false, 
      error: 'ID, username y email son requeridos' 
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO usuario (id_usuario, username, email, fecha_registro, tlf, pais, ciudad, calle)
       VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7)
       RETURNING id_usuario`,
      [id_usuario, username, email, tlf || null, pais || null, ciudad || null, calle || null]
    );
    
    res.json({ 
      success: true, 
      id_usuario: result.rows[0].id_usuario,
      message: 'Usuario creado exitosamente' 
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Obtener usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id_usuario, username, email, fecha_registro, tlf, pais, ciudad, calle
       FROM usuario
       ORDER BY fecha_registro DESC`
    );
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ===== SUCURSALES =====

// Crear sucursal
app.post('/api/sucursales', async (req, res) => {
  const { id_sucursal, pais, ciudad, calle, telefono } = req.body;
  
  if (!id_sucursal || !pais || !ciudad) {
    return res.status(400).json({ 
      success: false, 
      error: 'ID, país y ciudad son requeridos' 
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO sucursal (id_sucursal, pais, ciudad, calle, telefono)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id_sucursal`,
      [id_sucursal, pais, ciudad, calle || null, telefono || null]
    );
    
    res.json({ 
      success: true, 
      id_sucursal: result.rows[0].id_sucursal,
      message: 'Sucursal creada exitosamente' 
    });
  } catch (error) {
    console.error('Error al crear sucursal:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Obtener sucursales
app.get('/api/sucursales', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id_sucursal, pais, ciudad, calle, telefono
       FROM sucursal
       ORDER BY id_sucursal DESC`
    );
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error al obtener sucursales:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ===== PRODUCTOS =====

// Crear producto
app.post('/api/productos', async (req, res) => {
  const { id_productos, descripcion, coste, es_carta } = req.body;
  
  if (!id_productos || !descripcion || coste === undefined) {
    return res.status(400).json({ 
      success: false, 
      error: 'ID, descripción y coste son requeridos' 
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO productos (id_productos, descr_producto, coste_producto, es_carta)
       VALUES ($1, $2, $3, $4)
       RETURNING id_productos`,
      [id_productos, descripcion, parseFloat(coste), es_carta || false]
    );
    
    res.json({ 
      success: true, 
      id_productos: result.rows[0].id_productos,
      message: 'Producto registrado exitosamente' 
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Obtener productos
app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id_productos, descr_producto, coste_producto, es_carta
       FROM productos
       ORDER BY id_productos DESC`
    );
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ===== MAZOS =====

// Crear mazo
app.post('/api/mazos', async (req, res) => {
  const { id_mazo, nombre, formato, descripcion, id_creador } = req.body;
  
  if (!id_mazo || !nombre || !formato) {
    return res.status(400).json({ 
      success: false, 
      error: 'ID, nombre y formato son requeridos' 
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO mazo (id_mazo, nombre_mazo, formato_mazo, descripcion_mazo, id_creador, fecha_subida)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id_mazo`,
      [id_mazo, nombre, formato, descripcion || null, id_creador || 1]
    );
    
    res.json({ 
      success: true, 
      id_mazo: result.rows[0].id_mazo,
      message: 'Mazo creado exitosamente' 
    });
  } catch (error) {
    console.error('Error al crear mazo:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Obtener mazos
app.get('/api/mazos', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT m.id_mazo, m.nombre_mazo, m.formato_mazo, m.cant_cartas, 
              m.descripcion_mazo, m.fecha_subida, m.likes, u.username as creador
       FROM mazo m
       LEFT JOIN usuario u ON m.id_creador = u.id_usuario
       ORDER BY m.fecha_subida DESC`
    );
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error al obtener mazos:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ===== TRANSACCIONES =====

// Crear transacción
app.post('/api/transacciones', async (req, res) => {
  const { ref_movimiento, tipo, id_emisor, id_receptor, cantidad } = req.body;
  
  if (!ref_movimiento || !tipo || !id_emisor || !id_receptor || !cantidad) {
    return res.status(400).json({ 
      success: false, 
      error: 'Todos los campos son requeridos' 
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO transaccion (ref_movimiento, tipo_transaccion, id_emisor, id_receptor, cantidad_productos, fecha_transaccion)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING ref_movimiento`,
      [ref_movimiento, tipo, id_emisor, id_receptor, cantidad]
    );
    
    res.json({ 
      success: true, 
      ref_movimiento: result.rows[0].ref_movimiento,
      message: 'Transacción registrada exitosamente' 
    });
  } catch (error) {
    console.error('Error al crear transacción:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Obtener transacciones
app.get('/api/transacciones', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.ref_movimiento, t.tipo_transaccion, t.token_transaccion, 
              t.fecha_transaccion, t.cantidad_productos,
              e.username as emisor, r.username as receptor
       FROM transaccion t
       LEFT JOIN usuario e ON t.id_emisor = e.id_usuario
       LEFT JOIN usuario r ON t.id_receptor = r.id_usuario
       ORDER BY t.fecha_transaccion DESC`
    );
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});



// Filtrar cartas
app.post('/api/cartas/filtrar', async (req, res) => {
  const { nombre, tipo, mana, rareza } = req.body;
  
  try {
    let query = `
      SELECT id_juego, nombre_carta, habilidades, rareza, artista, tipo_principal
      FROM detalle_carta
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (nombre) {
      query += ` AND nombre_carta ILIKE $${paramIndex}`;
      params.push(`%${nombre}%`);
      paramIndex++;
    }

    if (tipo) {
      query += ` AND tipo_principal ILIKE $${paramIndex}`;
      params.push(`%${tipo}%`);
      paramIndex++;
    }

    if (mana) {
      query += ` AND mana ILIKE $${paramIndex}`;
      params.push(`%${mana}%`);
      paramIndex++;
    }

    if (rareza) {
      query += ` AND rareza ILIKE $${paramIndex}`;
      params.push(`%${rareza}%`);
      paramIndex++;
    }

    query += ' ORDER BY nombre_carta LIMIT 50';

    const result = await pool.query(query, params);
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error al filtrar cartas:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ===== RUTA DE SALUD =====

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// ===== MANEJO DE ERRORES =====

app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Error interno del servidor' 
  });
});

// Ruta 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Ruta no encontrada' 
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${port}`);
  console.log(`📊 Base de datos: ${process.env.DB_NAME || 'magic_the_gathering'}`);
  console.log(`🌐 Entorno: ${process.env.NODE_ENV || 'development'}`);
}); 