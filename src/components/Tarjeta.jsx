import imgPropiedad from '../assets/imagenPropiedad.png';

function Tarjeta ({info}){
    return(
        <div className="tarjeta">
            <div className="imagenPropiedad">
            <img src={imgPropiedad} alt="Imagen" />
            </div>
            <div className="descripcionPropiedad" >
                <h6 className="tituloPropiedad"> {info.nombre}</h6>
                <h6 className="ubicacionPropiedad"> Ubicacion: {info.ubicacion} <span></span></h6>
                <h6 className="precioPropiedad"> Precio:{info.precio}    </h6>
                
                <button className="botonDetalles">Ver detalles</button>
            </div>

        </div>

    )
}
export default Tarjeta;