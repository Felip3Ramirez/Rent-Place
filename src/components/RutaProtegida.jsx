import { Navigate } from "react-router-dom";

function RutaProtegida({proteger}){
    // Esta función se encarga de proteger la ruta y redirigir al login si no hay token
    const token = localStorage.getItem('token');
    return token ? proteger :<Navigate to="/" />;
    // if (!token) {
    //     window.location.href = '/';
    //     return null;
    // }
    // return (
    //     <div>
    //         {proteger}
    //     </div>
    // );
}
export default RutaProtegida;