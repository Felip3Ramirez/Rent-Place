import { useState } from 'react';
let apiReserva = "http://localhost:8080/reserva";

import Modal from './Modal';
function Tarjeta({ info }) {
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFinal, setFechaFinal] = useState("");
    const [modal, setModal] = useState(false);
    
    function crearReserva(){
        if (fechaInicio === "" || fechaFinal === "") {
            alert("Ingrese una fecha de inicio y una fecha final");
        } else{
            let data = {
                fechaInicio: fechaInicio,
                fechaFin: fechaFinal,
            }
        
            fetch(apiReserva, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => setModal(false))
            .catch(error => console.log(error));
        }
        
        
        
    
        
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
                <div>
                    <p>Inicio de reserva</p>
                    <input onChange={(e) => setFechaInicio(e.target.value)} className="fechaReserva" type="date" />
                    <p>Fin de reserva</p>
                    <input onChange={(e) => setFechaFinal(e.target.value)} className="fechaReserva" type="date" />
                </div>

                <button type='button' onClick={(e)=>crearReserva(e)} className="botonFinal">Reservar</button>
            </Modal>
        </div>
    </div>
);
}
export default Tarjeta;