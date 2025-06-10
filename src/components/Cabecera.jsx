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
                <button onClick={()=>setModal(!modal)} >Publicar</button>
                <Modal
                estado={modal}
                cambiarEstado={setModal}
                titulo='Publica tu propiedad'>
                <FormularioPublicar cerrarModal={() => setModal(false) }actualizarLista={actualizarPropiedades}></FormularioPublicar>
                </Modal>


                <button onClick={()=>setModal2(!modal2)} >Contactanos</button>
                <Modal
                estado={modal2}
                cambiarEstado={setModal2}
                titulo='Contactanos'>
                    <FormularioContactanos cerrarModal={() => setModal(false)}></FormularioContactanos>
                </Modal>
            </nav>
            <div className='login'>
                <Link onClick={cerrarSesion} to="/registro"> <img src={login} alt="Login" /></Link>

            </div>
        </header>
    )
}
export default Cabecera;