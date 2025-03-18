import imgPropiedad from '../assets/imagenPropiedad.png';

function Tarjeta (){
    return(
        <div className="tarjeta">
            <div className="imagenPropiedad">
            <img src={imgPropiedad} alt="Imagen" />
            </div>
            <div className="descripcionPropiedad" >
                <h6 className="tituloPropiedad"> Título de la Propiedad:</h6>
                
                <h6 className="ubicacionPropiedad"> Ubicación:</h6>
                
                <h6 className="precioPropiedad"> Precio:    </h6>
                
                <button className="botonDetalles">Ver detalles:</button>
            </div>

        </div>

    )
}
export default Tarjeta;