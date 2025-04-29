import './PaginaLogin.css'
import imgLogin from '../assets/imagenLogin.png'
import { Link, useNavigate } from 'react-router-dom';
import { alertaGenerica, alertaRedireccion, generarToken } from "../helpers/funciones";
import { useState, useEffect } from 'react';
let apiUsuarios = "https://back-json-server-tuya.onrender.com/usuarios";
function PaginaLogin() {
    const [usuarios, setUsuarios] = useState([]);
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    let redireccion = useNavigate()

    function getUsuarios() {
        fetch(apiUsuarios)
            .then((Response) => Response.json())
            .then((data) => setUsuarios(data))
            .catch((error) => console.log(error));

    }
    

    useEffect(() => {
        getUsuarios();
    }, []);

    function buscarUsuario() {
        let user = usuarios.find((item) => name == item.user && password == item.password);
        return user;
    }

    function iniciarSesion(e) {
        e.preventDefault();
        if (buscarUsuario()) {
            let tokenAcceso = generarToken();
            localStorage.setItem("token", tokenAcceso);
            alertaRedireccion(redireccion, "Bienvenido", "Sera redieccionado a la pagina principal", "success", "/");
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
                    <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Usuario" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contrasena" />
                    <button type='button'  onClick={(e) => iniciarSesion(e)}>Iniciar Sesion</button>

                </form>
                <Link to="/">Cancelar</Link>
                <Link to="/registro">No tienes cuenta? Registrate !</Link>
            </div>
        </div>
    )
}
export default PaginaLogin;