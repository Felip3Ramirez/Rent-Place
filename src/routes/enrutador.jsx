import ContenedorPrincipal from "../pages/ContenedorPrincipal";
import PaginaRegistroLogin from "../pages/PaginaRegistroLogin";

export let enrutador = [
    {
        path: '/login',
        element: <PaginaRegistroLogin />
    },
    {
        path: '/',
        element: <ContenedorPrincipal />
    }
]