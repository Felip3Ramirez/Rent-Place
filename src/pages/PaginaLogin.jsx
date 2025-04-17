import './PaginaLogin.css'
import imgLogin from '../assets/imagenLogin.png'
import { Link,useNavigate } from 'react-router-dom';
import { alertaGenerica, alertaRedireccion, generarToken } from "../helpers/funciones";
import { useState } from 'react';
function PaginaLogin() {
    const [telefono, setTelefono] = useState("")
    const [password, setPassword] = useState("")
    const [getHoraLogin, setHoraLogin] = useState("")

    let redireccion = useNavigate()

    function iniciarSesion(telefono, password) {
        if (telefono === "313013" && password === "123456") {
            setHoraLogin(new Date().toLocaleDateString())
            let horaInicio = new Date();
            console.log(horaInicio);
            let tokenAcceso = generarToken();
            localStorage.setItem("token", tokenAcceso);
            alertaRedireccion( redireccion,"Bienvenido", "Sera redieccionado a la pagina principal", "success","/");
        } else {
            alertaGenerica("Error", "Usuario o contraseña incorrectos", "error");
        }

    }
    return (
        <div className="contenedorLogin">
            <div className='imagenLogin'>
                <img src={imgLogin} alt="" />
            </div>
            <div className="formularioLogin">
                <h1>Inicio Sesion</h1>

                <form className="formulario" action="">
                    <input onChange={(e) => setTelefono(e.target.value)} type="text" placeholder="Telefono" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contrasena" />
                    <button type='button' onClick={()=>iniciarSesion(telefono,password)}>Iniciar Sesion</button>

                </form>
                <Link to="/">Cancelar</Link>
                <Link to="/registro">No tienes cuenta? Registrate !</Link>
            </div>
        </div>
    )
}
export default PaginaLogin;