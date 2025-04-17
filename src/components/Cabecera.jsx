import logo from '../assets/logo.png'
import login from '../assets/login.png'
import { Link } from 'react-router-dom';


function Cabecera() {
    function cerrarSesion() {
        localStorage.removeItem("token");
    }
    return (
        <header className="cabecera">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="barraBusqueda">
                <input type="text" placeholder='Ubicacion' />
                <input type="text" placeholder='Precio Minimo' />
                <input className='buscar' type="submit" value="Buscar" />

            </div>
            <nav className="navegacion">
                <a href="">Publicar</a>
                <a href="">Contactanos</a>
            </nav>
            <div className='login'>
                <Link onClick={cerrarSesion} to="/registro"> <img src={login} alt="Login" /></Link>

            </div>
        </header>
    )
}
export default Cabecera;