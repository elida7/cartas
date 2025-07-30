// ===== CONFIGURACIÓN DE LA API =====
const API_BASE_URL = 'http://localhost:3000/api';

// ===== VARIABLES GLOBALES =====
let currentSection = 'inicio';

// ===== INICIALIZACIÓN DE LA APLICACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando aplicación Magic: The Gathering...');
    
    // Inicializar navegación
    initializeNavigation();
    
    // Cargar datos iniciales
    loadInitialData();
    
    // Configurar event listeners para formularios
    setupFormListeners();
    
    console.log('✅ Aplicación inicializada correctamente');
    
    // Verificar conexión con el backend
    checkBackendConnection();
});

// ===== FUNCIÓN DE NAVEGACIÓN =====
function initializeNavigation() {
    console.log('🧭 Inicializando navegación...');
    
    const navLinks = document.querySelectorAll('.nav-link');
    console.log(`📋 Encontrados ${navLinks.length} enlaces de navegación`);
    
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
}

function handleNavClick(e) {
    e.preventDefault();
    const targetSection = this.getAttribute('data-section');
    console.log(`🖱️ Navegando a: ${targetSection}`);
    switchSection(targetSection);
}

function switchSection(sectionName) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar sección objetivo
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log(`✅ Sección activa: ${sectionName}`);
        
        // Cargar datos de la sección si es necesario
        loadSectionData(sectionName);
    } else {
        console.error(`❌ No se encontró la sección: ${sectionName}`);
    }
    
    // Actualizar navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionName) {
            link.classList.add('active');
        }
    });
    
    currentSection = sectionName;
}

// ===== FUNCIÓN PARA CARGAR DATOS INICIALES =====
function loadInitialData() {
    console.log('📊 Cargando datos iniciales...');
    // Los datos se cargan cuando se accede a cada sección
}

// ===== FUNCIÓN PARA CARGAR DATOS DE SECCIÓN =====
function loadSectionData(sectionName) {
    switch(sectionName) {
        case 'cartas':
            // No cargar cartas automáticamente, esperar a que el usuario busque
            break;
        case 'mazos':
            loadMazos();
            break;
        case 'productos':
            loadProductos();
            break;
        case 'transacciones':
            loadTransacciones();
            break;
        case 'usuarios':
            loadUsuarios();
            break;
        case 'crear-usuario':
            // No necesita carga inicial
            break;
        case 'sucursales':
            loadSucursales();
            break;
    }
}

// ===== CONFIGURACIÓN DE FORMULARIOS =====
function setupFormListeners() {
    console.log('📝 Configurando listeners de formularios...');
    
    // Formulario de filtro de cartas
    const filtroCartasForm = document.getElementById('filtro-cartas-form');
    if (filtroCartasForm) {
        filtroCartasForm.addEventListener('submit', handleFiltroCartas);
    }
    
    // Formulario de crear mazo
    const crearMazoForm = document.getElementById('crear-mazo-form');
    if (crearMazoForm) {
        crearMazoForm.addEventListener('submit', handleCrearMazo);
    }
    
    // Formulario de registrar producto
    const registrarProductoForm = document.getElementById('registrar-producto-form');
    if (registrarProductoForm) {
        registrarProductoForm.addEventListener('submit', handleRegistrarProducto);
    }
    
    // Formulario de registrar transacción
    const registrarTransaccionForm = document.getElementById('registrar-transaccion-form');
    if (registrarTransaccionForm) {
        registrarTransaccionForm.addEventListener('submit', handleRegistrarTransaccion);
    }
    
    // Formulario de crear usuario
    const crearUsuarioForm = document.getElementById('crear-usuario-form');
    if (crearUsuarioForm) {
        crearUsuarioForm.addEventListener('submit', handleCrearUsuario);
    }
    
    // Formulario de crear sucursal
    const crearSucursalForm = document.getElementById('crear-sucursal-form');
    if (crearSucursalForm) {
        crearSucursalForm.addEventListener('submit', handleCrearSucursal);
    }
}

// ===== FUNCIÓN PARA VERIFICAR CONEXIÓN CON BACKEND =====
async function checkBackendConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ Backend conectado correctamente');
        } else {
            console.error('❌ Error en el backend');
        }
    } catch (error) {
        console.error('❌ No se pudo conectar al backend:', error);
        showError('No se pudo conectar al servidor. Verifica que el backend esté ejecutándose.');
    }
}

// ===== FUNCIÓN PARA FILTRAR CARTAS =====
async function handleFiltroCartas(e) {
    e.preventDefault();
    console.log('🔍 Iniciando búsqueda de cartas...');
    
    // Mostrar loading
    showLoading('cartas');
    
    // Obtener datos del formulario
    const formData = new FormData(e.target);
    const filters = {
        nombre: formData.get('nombre') || '',
        tipo: formData.get('tipo') || '',
        mana: formData.get('mana') || '',
        rareza: formData.get('rareza') || ''
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/cartas/filtrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filters)
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayCartas(data.data);
        } else {
            showError('Error al buscar cartas: ' + data.error);
        }
    } catch (error) {
        console.error('❌ Error al filtrar cartas:', error);
        showError('Error de conexión con el servidor');
    } finally {
        hideLoading('cartas');
    }
}

// ===== FUNCIÓN PARA MOSTRAR CARTAS =====
function displayCartas(cartas) {
    const container = document.getElementById('resultados-cartas');
    const noResultados = document.getElementById('no-resultados');
    
    if (!container) return;
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    if (cartas.length === 0) {
        if (noResultados) {
            noResultados.style.display = 'block';
        }
        return;
    }
    
    // Ocultar mensaje de no resultados
    if (noResultados) {
        noResultados.style.display = 'none';
    }
    
    // Mostrar cartas
    cartas.forEach(carta => {
        const cartaElement = createCartaCard(carta);
        container.appendChild(cartaElement);
    });
    
    console.log(`✅ Mostradas ${cartas.length} cartas`);
}

// ===== FUNCIÓN PARA CREAR TARJETA DE CARTA =====
function createCartaCard(carta) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-item';
    
    cardDiv.innerHTML = `
        <h4>${carta.nombre_carta || 'Sin nombre'}</h4>
        <p><strong>Tipo:</strong> <span class="card-type">${carta.tipo_principal || 'Desconocido'}</span></p>
        <p><strong>Rareza:</strong> <span class="card-rarity">${carta.rareza || 'Desconocida'}</span></p>
        <p><strong>Habilidades:</strong> ${carta.habilidades || 'Sin habilidades'}</p>
    `;
    
    return cardDiv;
}

// ===== FUNCIÓN PARA LIMPIAR FILTROS =====
function limpiarFiltros() {
    const form = document.getElementById('filtro-cartas-form');
    if (form) {
        form.reset();
    }
    
    const container = document.getElementById('resultados-cartas');
    if (container) {
        container.innerHTML = '';
    }
    
    const noResultados = document.getElementById('no-resultados');
    if (noResultados) {
        noResultados.style.display = 'none';
    }
}

// ===== FUNCIÓN PARA CREAR MAZO =====
async function handleCrearMazo(e) {
    e.preventDefault();
    console.log('🃏 Creando nuevo mazo...');
    
    // Obtener datos del formulario
    const formData = new FormData(e.target);
    const mazoData = {
        nombre: formData.get('nombre'),
        formato: formData.get('formato'),
        descripcion: formData.get('descripcion'),
        id_creador: 1 // Por defecto usuario 1
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/mazos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mazoData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Mazo creado exitosamente con ID: ' + data.id_mazo);
            e.target.reset();
            loadMazos(); // Recargar lista de mazos
        } else {
            showError('Error al crear mazo: ' + data.error);
        }
    } catch (error) {
        console.error('❌ Error al crear mazo:', error);
        showError('Error de conexión con el servidor');
    }
}

// ===== FUNCIÓN PARA CARGAR MAZOS =====
async function loadMazos() {
    console.log('📚 Cargando mazos...');
    
    showLoading('mazos');
    
    try {
        const response = await fetch(`${API_BASE_URL}/mazos`);
        const data = await response.json();
        
        if (data.success) {
            displayMazos(data.data);
        } else {
            showError('Error al cargar mazos: ' + data.error);
        }
    } catch (error) {
        console.error('❌ Error al cargar mazos:', error);
        showError('Error de conexión con el servidor');
    } finally {
        hideLoading('mazos');
    }
}

// ===== FUNCIÓN PARA MOSTRAR MAZOS =====
function displayMazos(mazos) {
    const container = document.getElementById('lista-mazos');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (mazos.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No hay mazos disponibles</p>';
        return;
    }
    
    mazos.forEach(mazo => {
        const mazoElement = createMazoCard(mazo);
        container.appendChild(mazoElement);
    });
    
    console.log(`✅ Mostrados ${mazos.length} mazos`);
}

// ===== FUNCIÓN PARA CREAR TARJETA DE MAZO =====
function createMazoCard(mazo) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-item';
    
    const fecha = mazo.fecha_subida ? new Date(mazo.fecha_subida).toLocaleDateString('es-ES') : 'Desconocida';
    
    cardDiv.innerHTML = `
        <h4>${mazo.nombre_mazo || 'Sin nombre'}</h4>
        <p><strong>Formato:</strong> ${mazo.formato_mazo || 'Sin formato'}</p>
        <p><strong>Creador:</strong> ${mazo.creador || 'Desconocido'}</p>
        <p><strong>Cartas:</strong> ${mazo.cant_cartas || 0}</p>
        <p><strong>Likes:</strong> ${mazo.likes || 0}</p>
        <p><strong>Descripción:</strong> ${mazo.descripcion_mazo || 'Sin descripción'}</p>
    `;
    
    return cardDiv;
}

// ===== FUNCIÓN PARA REGISTRAR PRODUCTO =====
async function handleRegistrarProducto(e) {
    e.preventDefault();
    console.log('📦 Registrando nuevo producto...');
    
    // Obtener datos del formulario
    const formData = new FormData(e.target);
    const productoData = {
        descripcion: formData.get('descripcion'),
        coste: parseFloat(formData.get('coste')),
        es_carta: formData.get('es_carta') === 'on'
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productoData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Producto registrado exitosamente con ID: ' + data.id_productos);
            e.target.reset();
            loadProductos(); // Recargar lista de productos
        } else {
            showError('Error al registrar producto: ' + data.error);
        }
    } catch (error) {
        console.error('❌ Error al registrar producto:', error);
        showError('Error de conexión con el servidor');
    }
}

// ===== FUNCIÓN PARA CARGAR PRODUCTOS =====
async function loadProductos() {
    console.log('📦 Cargando productos...');
    
    showLoading('productos');
    
    try {
        const response = await fetch(`${API_BASE_URL}/productos`);
        const data = await response.json();
        
        if (data.success) {
            displayProductos(data.data);
        } else {
            showError('Error al cargar productos: ' + data.error);
        }
    } catch (error) {
        console.error('❌ Error al cargar productos:', error);
        showError('Error de conexión con el servidor');
    } finally {
        hideLoading('productos');
    }
}

// ===== FUNCIÓN PARA MOSTRAR PRODUCTOS =====
function displayProductos(productos) {
    const container = document.getElementById('lista-productos');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (productos.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No hay productos registrados</p>';
        return;
    }
    
    productos.forEach(producto => {
        const productoElement = createProductoCard(producto);
        container.appendChild(productoElement);
    });
    
    console.log(`✅ Mostrados ${productos.length} productos`);
}

// ===== FUNCIÓN PARA CREAR TARJETA DE PRODUCTO =====
function createProductoCard(producto) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-item';
    
    cardDiv.innerHTML = `
        <h4>Producto #${producto.id_productos}</h4>
        <p><strong>Descripción:</strong> ${producto.descr_producto || 'Sin descripción'}</p>
        <p><strong>Coste:</strong> $${producto.coste_producto || 0}</p>
        <p><strong>Tipo:</strong> ${producto.es_carta ? 'Carta' : 'Producto'}</p>
    `;
    
    return cardDiv;
}

// ===== FUNCIÓN PARA REGISTRAR TRANSACCIÓN =====
async function handleRegistrarTransaccion(e) {
    e.preventDefault();
    console.log('💱 Registrando nueva transacción...');
    
    // Obtener datos del formulario
    const formData = new FormData(e.target);
    const transaccionData = {
        tipo: formData.get('tipo'),
        id_emisor: parseInt(formData.get('id_emisor')),
        id_receptor: parseInt(formData.get('id_receptor')),
        cantidad: parseInt(formData.get('cantidad'))
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/transacciones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaccionData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Transacción registrada exitosamente');
            e.target.reset();
            loadTransacciones(); // Recargar lista de transacciones
        } else {
            showError('Error al registrar transacción: ' + data.error);
        }
    } catch (error) {
        console.error('❌ Error al registrar transacción:', error);
        showError('Error de conexión con el servidor');
    }
}

// ===== FUNCIÓN PARA CARGAR TRANSACCIONES =====
async function loadTransacciones() {
    console.log('💱 Cargando transacciones...');
    
    showLoading('transacciones');
    
    try {
        const response = await fetch(`${API_BASE_URL}/transacciones`);
        const data = await response.json();
        
        if (data.success) {
            displayTransacciones(data.data);
        } else {
            showError('Error al cargar transacciones: ' + data.error);
        }
    } catch (error) {
        console.error('❌ Error al cargar transacciones:', error);
        showError('Error de conexión con el servidor');
    } finally {
        hideLoading('transacciones');
    }
}

// ===== FUNCIÓN PARA MOSTRAR TRANSACCIONES =====
function displayTransacciones(transacciones) {
    const container = document.getElementById('lista-transacciones');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (transacciones.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No hay transacciones registradas</p>';
        return;
    }
    
    transacciones.forEach(transaccion => {
        const transaccionElement = createTransaccionCard(transaccion);
        container.appendChild(transaccionElement);
    });
    
    console.log(`✅ Mostradas ${transacciones.length} transacciones`);
}

// ===== FUNCIÓN PARA CREAR TARJETA DE TRANSACCIÓN =====
function createTransaccionCard(transaccion) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'transaction-item';
    
    const fecha = new Date(transaccion.fecha_transaccion).toLocaleString('es-ES');
    
    cardDiv.innerHTML = `
        <h4>Transacción #${transaccion.ref_movimiento}</h4>
        <div class="transaction-details">
            <div class="detail">
                <strong>Tipo:</strong> ${transaccion.tipo_transaccion}
            </div>
            <div class="detail">
                <strong>Emisor:</strong> ${transaccion.emisor || 'Desconocido'}
            </div>
            <div class="detail">
                <strong>Receptor:</strong> ${transaccion.receptor || 'Desconocido'}
            </div>
            <div class="detail">
                <strong>Cantidad:</strong> ${transaccion.cantidad_productos}
            </div>
            <div class="detail">
                <strong>Fecha:</strong> ${fecha}
            </div>
            <div class="detail">
                <strong>Token:</strong> ${transaccion.token_transaccion}
            </div>
        </div>
    `;
    
    return cardDiv;
}

// ===== FUNCIÓN PARA CARGAR USUARIOS =====
async function loadUsuarios() {
    console.log('👥 Cargando usuarios...');
    
    showLoading('usuarios');
    
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios`);
        const data = await response.json();
        
        if (data.success) {
            displayUsuarios(data.data);
        } else {
            showError('Error al cargar usuarios: ' + data.error);
        }
    } catch (error) {
        console.error('❌ Error al cargar usuarios:', error);
        showError('Error de conexión con el servidor');
    } finally {
        hideLoading('usuarios');
    }
}

// ===== FUNCIÓN PARA MOSTRAR USUARIOS =====
function displayUsuarios(usuarios) {
    const container = document.getElementById('lista-usuarios');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (usuarios.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No hay usuarios registrados</p>';
        return;
    }
    
    usuarios.forEach(usuario => {
        const usuarioElement = createUsuarioCard(usuario);
        container.appendChild(usuarioElement);
    });
    
    console.log(`✅ Mostrados ${usuarios.length} usuarios`);
}

// ===== FUNCIÓN PARA CREAR TARJETA DE USUARIO =====
function createUsuarioCard(usuario) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-item';
    
    const fecha = usuario.fecha_registro ? new Date(usuario.fecha_registro).toLocaleDateString('es-ES') : 'Desconocida';
    
    cardDiv.innerHTML = `
        <h4>${usuario.username || 'Sin nombre'}</h4>
        <p><strong>Email:</strong> ${usuario.email || 'Sin email'}</p>
        <p><strong>Teléfono:</strong> ${usuario.tlf || 'Sin teléfono'}</p>
        <p><strong>País:</strong> ${usuario.pais || 'Sin especificar'}</p>
        <p><strong>Ciudad:</strong> ${usuario.ciudad || 'Sin especificar'}</p>
        <p><strong>Dirección:</strong> ${usuario.calle || 'Sin especificar'}</p>
        <p><strong>Fecha de registro:</strong> ${fecha}</p>
    `;
    
    return cardDiv;
}

// ===== FUNCIÓN PARA CREAR USUARIO =====
async function handleCrearUsuario(e) {
    e.preventDefault();
    console.log('👤 Creando nuevo usuario...');
    
    // Obtener datos del formulario
    const formData = new FormData(e.target);
    const usuarioData = {
        username: formData.get('username'),
        email: formData.get('email'),
        tlf: formData.get('tlf') || null,
        pais: formData.get('pais') || null,
        ciudad: formData.get('ciudad') || null,
        calle: formData.get('calle') || null
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Usuario creado exitosamente con ID: ' + data.id_usuario);
            e.target.reset();
            loadUsuarios(); // Recargar lista de usuarios
        } else {
            showError('Error al crear usuario: ' + data.error);
        }
    } catch (error) {
        console.error('❌ Error al crear usuario:', error);
        showError('Error de conexión con el servidor');
    }
}

// ===== FUNCIÓN PARA CREAR SUCURSAL =====
async function handleCrearSucursal(e) {
    e.preventDefault();
    console.log('🏪 Creando nueva sucursal...');
    
    // Obtener datos del formulario
    const formData = new FormData(e.target);
    const sucursalData = {
        pais: formData.get('pais'),
        ciudad: formData.get('ciudad'),
        calle: formData.get('calle'),
        telefono: formData.get('telefono')
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/sucursales`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sucursalData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Sucursal creada exitosamente con ID: ' + data.id_sucursal);
            e.target.reset();
            loadSucursales(); // Recargar lista de sucursales
        } else {
            showError('Error al crear sucursal: ' + data.error);
        }
    } catch (error) {
        console.error('❌ Error al crear sucursal:', error);
        showError('Error de conexión con el servidor');
    }
}

// ===== FUNCIÓN PARA CARGAR SUCURSALES =====
async function loadSucursales() {
    console.log('🏪 Cargando sucursales...');
    
    showLoading('sucursales');
    
    try {
        const response = await fetch(`${API_BASE_URL}/sucursales`);
        const data = await response.json();
        
        if (data.success) {
            displaySucursales(data.data);
        } else {
            showError('Error al cargar sucursales: ' + data.error);
        }
    } catch (error) {
        console.error('❌ Error al cargar sucursales:', error);
        showError('Error de conexión con el servidor');
    } finally {
        hideLoading('sucursales');
    }
}

// ===== FUNCIÓN PARA MOSTRAR SUCURSALES =====
function displaySucursales(sucursales) {
    const container = document.getElementById('lista-sucursales');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (sucursales.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No hay sucursales registradas</p>';
        return;
    }
    
    sucursales.forEach(sucursal => {
        const sucursalElement = createSucursalCard(sucursal);
        container.appendChild(sucursalElement);
    });
    
    console.log(`✅ Mostradas ${sucursales.length} sucursales`);
}

// ===== FUNCIÓN PARA CREAR TARJETA DE SUCURSAL =====
function createSucursalCard(sucursal) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-item';
    
    cardDiv.innerHTML = `
        <h4>Sucursal #${sucursal.id_sucursal}</h4>
        <p><strong>País:</strong> ${sucursal.pais || 'Sin especificar'}</p>
        <p><strong>Ciudad:</strong> ${sucursal.ciudad || 'Sin especificar'}</p>
        <p><strong>Dirección:</strong> ${sucursal.calle || 'Sin especificar'}</p>
        <p><strong>Teléfono:</strong> ${sucursal.telefono || 'Sin teléfono'}</p>
    `;
    
    return cardDiv;
}

// ===== FUNCIONES DE UTILIDAD =====

// Función para mostrar loading
function showLoading(section) {
    const loadingElement = document.getElementById(`loading-${section}`);
    if (loadingElement) {
        loadingElement.style.display = 'block';
    }
}

// Función para ocultar loading
function hideLoading(section) {
    const loadingElement = document.getElementById(`loading-${section}`);
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

// Función para mostrar mensaje de éxito
function showSuccess(message) {
    console.log('✅ Éxito:', message);
    alert('✅ ' + message);
}

// Función para mostrar mensaje de error
function showError(message) {
    console.error('❌ Error:', message);
    alert('❌ ' + message);
} 