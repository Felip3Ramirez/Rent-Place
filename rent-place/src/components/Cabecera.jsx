import logo from '../assets/logo.png'
import login from '../assets/login.png'

function Cabecera (){
    return (
        <header className="cabecera">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="barraBusqueda">
                <input type="text" placeholder='Ubicacion' />
                <input type="text" placeholder='Precio Minimo'/>
                <input className='buscar' type="submit" value="Buscar"/>

            </div>
            <nav className="navegacion">
                <a href="">Publicar</a>
                <a href="">Contactanos</a>
            </nav>
            <div className='login'>
                <img src={login} alt="Login" />
            </div>
        </header>
    )
}
export default Cabecera;