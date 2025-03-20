import './ContenedorPrincipal.css'
import Cabecera from "../components/Cabecera"
import Tarjeta from '../components/Tarjeta'
import PiePagina from '../components/PiePagina'
import { propiedades } from '../services/DataBase'

function ContenedorPrincipal(){
    return(
        <div className="contenedorPrincipal">
            <Cabecera></Cabecera>
            <main className='contenedorTarjetas'>
                <h1>Explora alojamientos cerca de ti</h1>
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