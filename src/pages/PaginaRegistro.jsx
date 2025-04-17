import './PaginaRegistro.css'
import imgRegistro from '../assets/imagenRegistro.png'
import { Link } from 'react-router-dom';
function PaginaRegistro() {
    return (
        <div className="contenedorRegistro">
            <div className="formularioRegistro">
                <h1>Registrese</h1>

                <form className="formulario" action="">
                    <input type="text" placeholder="Nombre" />
                    <input type="text" placeholder="Telefono" />
                    <input type="password" placeholder="Contrasena" />
                    <button>Registrarme</button>

                </form>
                <Link to="/">Cancelar</Link>
                <Link to="/login">Ya tienes cuenta? Inicia sesion !</Link>
            </div>
            <div className='imagenRegistro'>
                <img src={imgRegistro} alt="" />
            </div>
        </div>

    )
}
export default PaginaRegistro;