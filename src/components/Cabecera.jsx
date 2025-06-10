import logo from '../assets/logo.png'
import login from '../assets/login.png'
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { useState } from 'react';
import FormularioContactanos from './FormularioContactanos';
import FormularioPublicar from './FormularioPublicar';

function Cabecera({ actualizarPropiedades }) {
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);

    // Obtener usuario actual desde localStorage
    const usuarioActual = JSON.parse(localStorage.getItem("usuario"));
    const esAdmin = usuarioActual && usuarioActual.username === "admin";
    const hayUsuarioLogueado = usuarioActual !== null; // Verificar si hay usuario logueado

    function cerrarSesion() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        // Opcional: recargar la página para actualizar el estado
        window.location.reload();
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
                <button onClick={() => setModal(!modal)}>Publicar</button>
                <Modal
                    estado={modal}
                    cambiarEstado={setModal}
                    titulo='Publica tu propiedad'>
                    <FormularioPublicar 
                        cerrarModal={() => setModal(false)} 
                        actualizarLista={actualizarPropiedades}>
                    </FormularioPublicar>
                </Modal>

                <button onClick={() => setModal2(!modal2)}>Contactanos</button>
                <Modal
                    estado={modal2}
                    cambiarEstado={setModal2}
                    titulo='Contactanos'>
                    <FormularioContactanos cerrarModal2={() => setModal2(false)}></FormularioContactanos>
                </Modal>
            </nav>
            
            <div className='seccionUsuario'>
                <div className='login'>
                    {hayUsuarioLogueado ? (
                        // Si hay usuario logueado, mostrar botón de cerrar sesión
                        <Link  onClick={cerrarSesion} className='cerrarSesion'>
                            Cerrar Sesión
                        </Link>
                    ) : (
                        // Si no hay usuario logueado, mostrar enlace de login
                        <Link className='login' to="/registro">
                            <img src={login} alt="Login" />
                        </Link>
                    )}
                </div>
                
                {esAdmin && (
                    <div className='gestionUsuarios'>
                        <Link to={"gestion"} className='botonGestion'>
                            Gestión de usuarios
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Cabecera;