import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const apiReserva = "http://localhost:8080/reserva";

function GestionReservas() {
    const [reservas, setReservas] = useState([]);
    const [reservasFiltradas, setReservasFiltradas] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Cargar reservas al montar el componente
    useEffect(() => {
        cargarReservas();
    }, []);

    

    function cargarReservas() {
        
        
        setCargando(true);
        fetch(apiReserva)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Error al cargar reservas');
                }
            })
            .then(data => {
                setReservas(data);
                setReservasFiltradas(data);
                setCargando(false);
            })
            .catch(error => {
                alert("Error al cargar las reservas");
                setCargando(false);
            });
    }

    function eliminarReserva(id) {
        fetch(`${apiReserva}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.ok) {
                alert("Reserva eliminada exitosamente");
                cargarReservas(); // Recargar la lista
            } else {
                // Intentar obtener más detalles del error
                return res.text().then(errorText => {
                    
                    
                    switch(res.status) {
                        case 400:
                            alert("Error: Solicitud inválida. No se puede eliminar la reserva.");
                            break;
                        case 404:
                            alert("Error: Reserva no encontrada.");
                            break;
                        case 403:
                            alert("Error: No tiene permisos para eliminar esta reserva.");
                            break;
                        default:
                            alert(`Error al eliminar la reserva: ${res.status} - ${errorText}`);
                    }
                });
            }
        })
        .catch(error => {
            alert("Error de conexión. Verifique su conexión a internet.");
        });
    }

    function formatearFecha(fecha) {
        if (!fecha) return 'N/A';
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString('es-ES');
    }

    if (cargando) {
        return (
            <div className="contenedorGestion">
                <div className="cabeceraGestion">
                    <div className="tituloSistema">
                        <h2>Sistema de Gestión</h2>
                    </div>
                    <div className="navegacionGestion">
                        <Link className='button' to={"/"}>Inicio</Link>
                        <Link className='button' to={"/gestion"}>Gestión Usuarios</Link>
                    </div>
                </div>
                <div className="contenidoPrincipal">
                    <div className="cargandoReservas">
                        <p>Cargando reservas...</p>
                    </div>
                </div>
            </div>
        );
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
                    <Link className='button' to={"/gestion"}>Gestión Usuarios</Link>
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="contenidoPrincipal">
                <h1 className="tituloGestion">
                    Gestión de Reservas
                </h1>

                

                {/* Tabla de Reservas */}
                <div className="tablaReservas">
                    <div className="encabezadoTablaReservas">
                        <div>Usuario</div>
                        <div>Propiedad</div>
                        <div>Fecha Inicio</div>
                        <div>Fecha Fin</div>
                        
                    </div>
                    
                    <div className="cuerpoTabla">
                        {reservasFiltradas.length === 0 ? (
                            <div className="mensajeVacioReservas">
                                {terminoBusqueda ? 'No se encontraron reservas que coincidan con la búsqueda' : 'No hay reservas registradas'}
                            </div>
                        ) : (
                            reservasFiltradas.map(reserva => (
                                <div key={reserva.id} className="filaReserva">
                                    <div className="celdaReserva">
                                    {reserva.usuario?.nombre || reserva.usuario?.email || 'Usuario no disponible'}
                                    </div>
                                    <div className="celdaReserva">
                                    {reserva.propiedad?.titulo || reserva.propiedad?.nombre || 'Propiedad no disponible'}
                                    </div>
                                    <div className="celdaReserva">
                                        {formatearFecha(reserva.fechaInicio)}
                                    </div>
                                    <div className="celdaReserva">
                                        {formatearFecha(reserva.fechaFin)}
                                    </div>
                                    <div className="celdaReserva">
                                        <span className={
                                            new Date(reserva.fechaFin) < new Date() 
                                                ? 'estadoReservaFinalizada' 
                                                : 'estadoReservaActiva'
                                        }>
                                            {new Date(reserva.fechaFin) < new Date() ? 'Finalizada' : 'Activa'}
                                        </span>
                                    </div>
                                    <div className="accionesReserva">
                                        <button
                                            onClick={() => eliminarReserva(reserva.id)}
                                            className="botonEliminarReserva"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Resumen */}
                
            </div>
        </div>
    );
}

export default GestionReservas;