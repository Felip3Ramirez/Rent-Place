import './ContenedorPrincipal.css'
import Cabecera from "../components/Cabecera"
import Tarjeta from '../components/Tarjeta'
import PiePagina from '../components/PiePagina'
import { useEffect, useState } from 'react';
let apiPropiedades = "https://back-json-server-tuya.onrender.com/propiedades";

function ContenedorPrincipal(){
    const [propiedades, setPropiedades] = useState([]);

    function buscarPropiedades() {
        fetch(apiPropiedades)
            .then((Response) => Response.json())
            .then((data) => setPropiedades(data))
            .catch((error) => console.log(error));

    }
    useEffect(() => {
        buscarPropiedades();
    }, []);

    
    return(
        <div className="contenedorPrincipal">
            <Cabecera></Cabecera>
            <main className='contenedorTarjetas'>
                <h1 onLoad={buscarPropiedades()} >Explora alojamientos cerca de ti</h1>
                {
                    propiedades.map ((propiedad)=>{
                        return <Tarjeta info={propiedad}></Tarjeta>
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