import './PaginaRegistro.css'
import imgRegistro from '../assets/imagenRegistro.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
let apiUsuarios = "https://back-json-server-tuya.onrender.com/usuarios";
import { useNavigate } from 'react-router-dom';

function PaginaRegistro() {
const [nombre, setNombre] = useState("");
const [usuario, setUsuario] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
    function crearUsuario(e) {
        e.preventDefault();
        if (!nombre.trim() || !usuario.trim() || !password.trim()) {
            alert("Por favor, complete todos los campos sin espacios en blanco.");
            return;
        }
        let data ={
            id:crypto.randomUUID(),
            nombre:nombre,
            user:usuario,
            password:password
        }
        fetch(apiUsuarios, {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then (res => res.json())
        .then (data => navigate("/login"))
        .catch(error => console.log(error))
        ;
    }

    return (
        <div className="contenedorRegistro">
            <div className="formularioRegistro">
                <h1>Registrese</h1>

                <form className="formulario" action="">
                    <input onChange={(e) => setNombre(e.target.value)} type="text" placeholder="Nombre"  />
                    <input onChange={(e) => setUsuario(e.target.value)} type="text" placeholder="Usuario" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contrasena" />
                    <button  onClick={(e)=>crearUsuario(e)}>Registrarme</button>

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