import { useState } from "react";



function FormularioPublicar(){
const [nombre , setNombre] = useState("");
const [ubicacion, setUbicacion] = useState("");
const [telefono , setTelefono] = useState("");
const [foto , setFoto] = useState("");
    

    return(
        <section className="section_form">
            <form id="consultation-form" className="feed-form" action="#">
                <input onChange={(e)=>setNombre(e.target.value)} required placeholder="Nombre Propiedad" type="text" />
                <input onChange={(e)=>setUbicacion(e.target.value)} name="ubicacion" required placeholder="Ubicacion" type="text"/>
                <input onChange={(e)=>setTelefono(e.target.value)} name="telefono" required placeholder="Telefono" type="text" />
                <input onChange={(e)=>setFoto(e.target.value)} name= "fotoPropiedad"type="file" required placeholder="Fotos de propiedad"  />
                
            </form>
        </section>
    )
}

export default FormularioPublicar;