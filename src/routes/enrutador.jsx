import GestionReservas from "../components/GestionReservas";
import GestionUsuarios from "../components/GestionUsuarios";
import ContenedorPrincipal from "../pages/ContenedorPrincipal";
import PaginaLogin from "../pages/PaginaLogin";
import PaginaRegistro from "../pages/PaginaRegistro";

export let enrutador = [
    {
        path: '/registro',
        element: <PaginaRegistro />
    },
    {
        path:'/gestion',
        element: <GestionUsuarios></GestionUsuarios>
    },
    {
        path:'/reserva',
        element: <GestionReservas></GestionReservas>
    },
    {
        path: '/login',
        element: <PaginaLogin />
    },
    {
        path: '/',
        element: <ContenedorPrincipal />
    }
]