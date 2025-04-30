import { useState } from 'react';
import imgPropiedad from '../assets/imagenPropiedad.png';
import Modal from './Modal';
function Tarjeta({ info }) {
    const [modal, setModal] = useState(false);
    
    return (
        <div className="tarjeta">
            <div className="imagenPropiedad">
                <img src={imgPropiedad} alt="Imagen" />
            </div>
            <div className="descripcionPropiedad" >
                <h6 className="tituloPropiedad"> {info.nombre}</h6>
                <h6 className="ubicacionPropiedad"> Ubicacion: {info.ubicacion} <span></span></h6>
                <h6 className="precioPropiedad"> Precio:{info.precio}    </h6>

                <button onClick={() => setModal(!modal)} className="botonDetalles">Ver detalles</button>
                <Modal
                    estado={modal}
                    cambiarEstado={setModal}
                    titulo={info.nombre}
                    
                >
                    <img src={imgPropiedad} alt="Imagen" />
                    <h6 className="ubicacionPropiedad"> Ubicacion: {info.ubicacion} <span></span></h6>
                    <h6 className="precioPropiedad"> Precio:{info.precio}</h6>
                    <button  className="botonFinal">Reservar</button>
                </Modal>

            </div>

        </div>

    )
}
export default Tarjeta;