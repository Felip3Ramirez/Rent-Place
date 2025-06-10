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
        fetch(apiPropiedad+"/"+id, {
            method: "DELETE",
        })
        .then(res => {
            if (res.ok) {
                console.log("Propiedad eliminada con éxito");
                setModal(false);
                // Llamar a la función callback para actualizar el componente padre
                if (alEliminarPropiedad) {
                    alEliminarPropiedad(id);
                }
            } else {
                console.error("Error al eliminar la propiedad:", res.status);
                alert("Error al eliminar la propiedad");
            }
        })
        .catch(error => {
            console.error("Error al eliminar la propiedad:", error);
            alert("Error al eliminar la propiedad");
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