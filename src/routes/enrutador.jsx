import ContenedorPrincipal from "../pages/ContenedorPrincipal";
import PaginaLogin from "../pages/PaginaLogin";
import PaginaRegistro from "../pages/PaginaRegistro";

export let enrutador = [
    {
        path: '/registro',
        element: <PaginaRegistro />
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