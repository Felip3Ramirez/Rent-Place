import { useState } from 'react';
let apiReserva = "http://localhost:8080/reserva";
const apiPropiedad = "http://localhost:8080/propiedad";

import Modal from './Modal';

function Tarjeta({ info, idUsuario, idPropiedad, alEliminarPropiedad }) { // Agregar props de IDs
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFinal, setFechaFinal] = useState("");
    const [modal, setModal] = useState(false);

    // Obtener usuario actual desde localStorage
    const usuarioActual = JSON.parse(localStorage.getItem("usuario"));
    const esAdmin = usuarioActual && usuarioActual.username === "admin";

    function crearReserva(){
        if (fechaInicio === "" || fechaFinal === "") {
            alert("Ingrese una fecha de inicio y una fecha final");
        } else if (!idUsuario) {
            alert("Debe iniciar sesión para hacer una reserva");
        } else {
            let data = {
                fechaInicio: fechaInicio,
                fechaFin: fechaFinal,
                usuario: { id: idUsuario },
                propiedad: { id: idPropiedad }
            }
        
            fetch(apiReserva, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log("Reserva creada exitosamente:", data);
                alert("¡Reserva creada exitosamente!");
                setModal(false);
                // Limpiar los campos de fecha
                setFechaInicio("");
                setFechaFinal("");
            })
            .catch(error => {
                console.log("Error al crear reserva:", error);
                alert("Error al crear la reserva. Intente nuevamente.");
            });
        }
    }

    function eliminarPropiedad(id) {
        // Validar que el ID existe y es válido
        if (!id || id === undefined || id === null) {
            console.error("ID de propiedad inválido:", id);
            alert("Error: ID de propiedad no válido");
            return;
        }
    
        // Confirmar eliminación
        if (!confirm(`¿Está seguro de que desea eliminar la propiedad "${info.nombre}"?`)) {
            return;
        }
    
        console.log("Intentando eliminar propiedad con ID:", id);
        console.log("URL completa:", `${apiPropiedad}/${id}`);
    
        fetch(`${apiPropiedad}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // Si tu API requiere autenticación, agregar aquí
                // "Authorization": `Bearer ${token}`
            }
        })
        .then(res => {
            console.log("Respuesta del servidor:", res.status, res.statusText);
            
            if (res.ok) {
                console.log("Propiedad eliminada con éxito");
                alert("Propiedad eliminada exitosamente");
                setModal(false);
                // Llamar a la función callback para actualizar el componente padre
                if (alEliminarPropiedad) {
                    alEliminarPropiedad(id);
                }
            } else {
                // Intentar obtener más detalles del error
                return res.text().then(errorText => {
                    console.error("Error del servidor:", res.status, errorText);
                    
                    // Mensajes de error más específicos
                    switch(res.status) {
                        case 400:
                            alert("Error: Solicitud inválida. La propiedad podría tener reservas activas.");
                            break;
                        case 404:
                            alert("Error: Propiedad no encontrada.");
                            break;
                        case 403:
                            alert("Error: No tiene permisos para eliminar esta propiedad.");
                            break;
                        default:
                            alert(`Error al eliminar la propiedad: ${res.status} - ${errorText}`);
                    }
                });
            }
        })
        .catch(error => {
            console.error("Error de red al eliminar la propiedad:", error);
            alert("Error de conexión. Verifique su conexión a internet.");
        });
    }
    return (
        <div className="tarjeta">
            <div className="imagenPropiedad">
                <img src={info.foto} alt="Imagen" />
            </div>
            <div className="descripcionPropiedad">
                <h6 className="tituloPropiedad"> {info.nombre}</h6>
                <h6 className="ubicacionPropiedad">
                    {" "}
                    Ubicacion: {info.ubicacion} <span></span>
                </h6>

                <button onClick={() => setModal(!modal)} className="botonDetalles">
                    Ver detalles
                </button>

                <Modal estado={modal} cambiarEstado={setModal} titulo={info.nombre}>
                    <img className="imgModal" src={info.foto} alt="Imagen" />
                    <h6 className="ubicacionPropiedad">
                        {" "}
                        Ubicacion: {info.ubicacion} <span></span>
                    </h6>
                    <h6 className="precioPropiedad"> Precio: {info.precio}</h6>
                    <h6>Detalles: {info.detalles}</h6>
                    <div className='fechasReserva'>
                        <p>Inicio de reserva</p>
                        <input onChange={(e) => setFechaInicio(e.target.value)} className="fechaReserva" type="date" />
                        <p>Fin de reserva</p>
                        <input onChange={(e) => setFechaFinal(e.target.value)} className="fechaReserva" type="date" />
                    </div>

                    <button type='button' onClick={(e)=>crearReserva(e)} className="botonFinal">Reservar</button>
                    {/* Mostrar botones solo si es admin */}
                    {esAdmin && (
                        <div className="botonesAdmin">
                            <button className="botonDetalles" onClick={() => eliminarPropiedad(info.id)}>Eliminar</button>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
}

export default Tarjeta;