import './PaginaRegistroLogin.css'
import imgRegistro from '../assets/imagenRegistro.png'
function PaginaRegistroLogin() {
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
                <a href="">Cancelar</a>
                <a href="">Ya tienes cuenta? Inicia sesion</a>
            </div>
            <div className='imagenRegistro'>
                <img src={imgRegistro} alt="" />
            </div>
        </div>

    )
}
export default PaginaRegistroLogin;