import { useState } from "react";
let apiUsuarios = "https://back-json-server-tuya.onrender.com/propiedades";


function FormularioPublicar({ cerrarModal }) {
    const [nombre, setNombre] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [precio, setPrecio] = useState("");
    const [detalle, setDetalle] = useState("");
    const [foto, setFoto] = useState("");
    

    function crearPropiedad(e) {
        e.preventDefault();
        cerrarModal();
        if (!nombre.trim() || !precio.trim()) {
            alert("Por favor, complete todos los campos sin espacios en blanco.");
            return;
        }
        let data = {

            id: crypto.randomUUID(),
            nombre: nombre,
            ubicacion: ubicacion,
            precio: precio,
            detalles: detalle,
            foto:foto
        }
        fetch(apiUsuarios, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                cerrarModal()})
            .catch(error => console.log(error))
    }

    function handleOnChangeFile(e){
        const elemento = e.target;
        const file = elemento.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onloadend = function(){
            setFoto(reader.result.toString());
        }
    }
    return (
        <section className="section_form">
            <form id="consultation-form" className="feed-form" action="#">
                <input onChange={(e) => setNombre(e.target.value)} required placeholder="Nombre Propiedad" type="text" />
                <input onChange={(e) => setUbicacion(e.target.value)} name="ubicacion" required placeholder="Ubicacion" type="text" />
                <input onChange={(e) => setPrecio(e.target.value)} required placeholder="Precio por Dia" type="text" />
                <input onChange={(e) => setDetalle(e.target.value)} name="detalles" required placeholder="Detalles" type="text" />
                <input onChange={handleOnChangeFile} name="fotoPropiedad" type="file" required placeholder="Fotos de propiedad" />
                <button onClick={(e)=>crearPropiedad(e)} className="botonFinal">Publicar</button>

            </form>
        </section>
    )
}

export default FormularioPublicar;