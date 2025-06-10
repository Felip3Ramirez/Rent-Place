import './ContenedorPrincipal.css'
import Cabecera from "../components/Cabecera"
import Tarjeta from '../components/Tarjeta'
import PiePagina from '../components/PiePagina'
import { useEffect, useState } from 'react';
import FormularioPublicar from '../components/FormularioPublicar';
let apiPropiedades = "http://localhost:8080/propiedad";

function ContenedorPrincipal(){
    const [propiedades, setPropiedades] = useState([]);
    
    function buscarPropiedades() {
        fetch(apiPropiedades)
            .then((Response) => Response.json())
            .then((data) => setPropiedades(data))
            .catch((error) => console.log(error));
    }

    // Función para manejar cuando se elimina una propiedad
    function manejarPropiedadEliminada(idEliminado) {
        // Opción 1: Filtrar la propiedad eliminada de la lista actual
        setPropiedades(propiedades.filter(prop => prop.id !== idEliminado));
        
        // Opción 2: O recargar todas las propiedades desde el servidor
        // buscarPropiedades();
    }

    useEffect(() => {
        buscarPropiedades();
    }, []);
    
    return(
        <div className="contenedorPrincipal">
            <Cabecera actualizarPropiedades={buscarPropiedades}></Cabecera>
            <main className='contenedorTarjetas'>
                <h1>Explora alojamientos cerca de ti</h1>
                {
                    propiedades.map((propiedad) => {
                        // Obtener el usuario actual
                        const usuarioActual = JSON.parse(localStorage.getItem("usuario"));
                        const idUsuario = usuarioActual ? usuarioActual.id : null;
                        
                        return (
                            <Tarjeta 
                                key={propiedad.id}
                                info={propiedad}
                                idUsuario={idUsuario}
                                idPropiedad={propiedad.id}
                                alEliminarPropiedad={manejarPropiedadEliminada}
                            />
                        )
                    })
                }
            </main>
            <footer>
                <PiePagina></PiePagina>
            </footer>
        </div>
    )
}

export default ContenedorPrincipal