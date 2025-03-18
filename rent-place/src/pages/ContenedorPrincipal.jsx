import './ContenedorPrincipal.css'
import Cabecera from "../components/Cabecera"
import Tarjeta from '../components/Tarjeta'
import PiePagina from '../components/PiePagina'

function ContenedorPrincipal(){
    return(
        <div className="contenedorPrincipal">
            <Cabecera></Cabecera>
            <main className='contenedorTarjetas'>
                <h1>Explora alojamientos cerca de ti</h1>
                <Tarjeta></Tarjeta>
                <Tarjeta></Tarjeta>
                <Tarjeta></Tarjeta>
                <Tarjeta></Tarjeta>
                <Tarjeta></Tarjeta>
                <Tarjeta></Tarjeta>
            </main>
            <footer>
                <PiePagina></PiePagina>
            </footer>
        </div>
    )
}
export default ContenedorPrincipal