import { useState } from "react";



function FormularioPublicar(){
const [nombre , setNombre] = useState("");
const [ubicacion, setUbicacion] = useState("");
const [precio , setPrecio] = useState("");
const [detalle , setDetalle] = useState("");
const [foto , setFoto] = useState("");
    

    return(
        <section className="section_form">
            <form id="consultation-form" className="feed-form" action="#">
                <input onChange={(e)=>setNombre(e.target.value)} required placeholder="Nombre Propiedad" type="text" />
                <input onChange={(e)=>setUbicacion(e.target.value)} name="ubicacion" required placeholder="Ubicacion" type="text"/>
                <input onChange={(e)=>setPrecio(e.target.value)} required placeholder="Precio por Dia" type="text" />
                <input onChange={(e)=>setDetalle(e.target.value)} name="detalles" required placeholder="Detalles" type="text" />
                <input onChange={(e)=>setFoto(e.target.value)} name= "fotoPropiedad"type="file" required placeholder="Fotos de propiedad"  />
                
            </form>
        </section>
    )
}

export default FormularioPublicar;