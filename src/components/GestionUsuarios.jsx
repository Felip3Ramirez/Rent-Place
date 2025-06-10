import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const apiUsuario = "http://localhost:8080/usuario";

function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const [modal, setModal] = useState(false);
    const [editandoUsuario, setEditandoUsuario] = useState(false);
    const [usuarioActual, setUsuarioActual] = useState({
        username:'',
        nombre: '',
        password: ''
    });
    const [terminoBusqueda, setTerminoBusqueda] = useState('');

    // Cargar usuarios al montar el componente
    useEffect(() => {
        cargarUsuarios();
    }, []);

    // Filtrar usuarios cuando cambia el término de búsqueda
    useEffect(() => {
        if (terminoBusqueda === '') {
            setUsuariosFiltrados(usuarios);
        } else {
            const filtrados = usuarios.filter(usuario =>
                usuario.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                usuario.email.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                usuario.rol.toLowerCase().includes(terminoBusqueda.toLowerCase())
            );
            setUsuariosFiltrados(filtrados);
        }
    }, [terminoBusqueda, usuarios]);

    function cargarUsuarios() {
        fetch(apiUsuario)
            .then(res => res.json())
            .then(data => {
                setUsuarios(data);
                setUsuariosFiltrados(data);
            })
            .catch(error => {
                console.error("Error al cargar usuarios:", error);
                alert("Error al cargar los usuarios");
            });
    }

    

    function abrirModalEditar(usuario) {
        setEditandoUsuario(true);
        setUsuarioActual({
            ...usuario,
            password: '' // No mostrar la contraseña actual
        });
        setModal(true);
    }

    function guardarUsuario() {
        // Validaciones
        if (!usuarioActual.nombre) {
            alert("Por favor complete todos los campos obligatorios");
            return;
        }

        if (!editandoUsuario && !usuarioActual.password) {
            alert("La contraseña es obligatoria para usuarios nuevos");
            return;
        }

        const datosUsuario = {
            nombre: usuarioActual.nombre,
            username: usuarioActual.username
        };

        // Solo incluir password si se está editando y se proporcionó una nueva
        if (!editandoUsuario || usuarioActual.password) {
            datosUsuario.password = usuarioActual.password;
        }

        if (editandoUsuario) {
            // Actualizar usuario existente
            fetch(`${apiUsuario}/${usuarioActual.id}`, {
                method: "PUT",
                body: JSON.stringify(datosUsuario),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Error al actualizar usuario');
                }
            })
            .then(data => {
                alert("¡Usuario actualizado exitosamente!");
                setModal(false);
                cargarUsuarios();
            })
            .catch(error => {
                console.error("Error al actualizar usuario:", error);
                alert("Error al actualizar el usuario. Intente nuevamente.");
            });
        } else {
            // Crear nuevo usuario
            fetch(apiUsuario, {
                method: "POST",
                body: JSON.stringify(datosUsuario),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Error al crear usuario');
                }
            })
            .then(data => {
                
                alert("¡Usuario creado exitosamente!")
                setModal(false);
                cargarUsuarios();
            })
            .catch(error => {
                console.error("Error al crear usuario:", error);
                alert("Error al crear el usuario. Intente nuevamente.");
            });
        }   
    }

    function eliminarUsuario(id) {
            fetch(apiUsuario+'/'+id, {
                method: "DELETE",
            })
            .then(res => {
                if (res.ok) {
                    console.log("Usuario eliminado con éxito");
                    alert("Usuario eliminado exitosamente");
                    cargarUsuarios();
                } else {
                    console.error("Error al eliminar el usuario:", res.status);
                    alert("Error al eliminar el usuario");
                }
            })
            .catch(error => {
                console.error("Error al eliminar el usuario:", error);
                alert("Error al eliminar el usuario");
            });
        
    }

    function cambiarCampo(campo, valor) {
        setUsuarioActual(prev => ({
            ...prev,
            [campo]: valor
        }));
    }

    return (
        <div className="contenedorGestion">
            {/* Cabecera */}
            <div className="cabeceraGestion">
                <div className="tituloSistema">
                    <h2>Sistema de Gestión</h2>
                </div>
                <div className="navegacionGestion">
                    <Link className='button' to={"/"}>Inicio</Link>
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="contenidoPrincipal">
                <h1 className="tituloGestion">
                    Gestión de Usuarios
                </h1>

                {/* Tabla de Usuarios */}
                <div className="tablaUsuarios">
                    <div className="encabezadoTabla">
                        <div>Nombre</div>
                        <div>Acciones</div>
                    </div>
                    
                    <div className="cuerpoTabla">
                        {usuariosFiltrados.length === 0 ? (
                            <div className="mensajeVacio">
                                {terminoBusqueda ? 'No se encontraron usuarios' : 'No hay usuarios registrados'}
                            </div>
                        ) : (
                            usuariosFiltrados.map(usuario => (
                                <div key={usuario.id} className="filaUsuario">
                                    <div className="celdaUsuario">{usuario.nombre}</div>
                                    
                                    
                                    <div className="accionesUsuario">
                                        <button
                                            onClick={() => abrirModalEditar(usuario)}
                                            className="botonEditar"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => eliminarUsuario(usuario.id)}
                                            className="botonEliminar"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modal && (
                <div className="fondoModal">
                    <div className="modalUsuarios">
                        <button
                            onClick={() => setModal(false)}
                            className="botonCerrar"
                        >
                            ×
                        </button>
                        
                        <div className="encabezadoModalUsuarios">
                            <h3 className="tituloModal">
                                {editandoUsuario ? 'Editar Usuario' : 'Agregar Usuario'}
                            </h3>
                        </div>

                        <div className="formularioUsuario">
                            <input
                                type="text"
                                placeholder="Nombre completo"
                                value={usuarioActual.nombre}
                                onChange={(e) => cambiarCampo('nombre', e.target.value)}
                                className="inputFormulario"
                            />
                            <input
                                type="text"
                                placeholder="Username nuevo"
                                value={usuarioActual.username}
                                onChange={(e) => cambiarCampo('username', e.target.value)}
                                className="inputFormulario"
                            />
                            
                            
                            
                            <input
                                type="password"
                                placeholder={editandoUsuario ? "Nueva contraseña (opcional)" : "Contraseña"}
                                value={usuarioActual.password}
                                onChange={(e) => cambiarCampo('password', e.target.value)}
                                className="inputFormulario"
                            />
                            
                            
                        </div>

                        <div className="botonesModal">
                            <button
                                onClick={guardarUsuario}
                                className="botonGuardar"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={() => setModal(false)}
                                className="botonCancelar"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GestionUsuarios;