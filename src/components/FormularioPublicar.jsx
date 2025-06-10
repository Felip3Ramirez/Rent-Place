import { useState } from "react";

const apiPropiedades = "http://localhost:8080/propiedad";

function FormularioPublicar({ cerrarModal, actualizarLista }) {
    const [nombre, setNombre] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [precio, setPrecio] = useState("");
    const [detalle, setDetalle] = useState("");
    const [foto, setFoto] = useState("");
    const [cargando, setCargando] = useState(false);

    function crearPropiedad(e) {
        e.preventDefault();

        // Validación mejorada
        if (!nombre.trim() || !ubicacion.trim() || !precio.trim() || !detalle.trim()) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        setCargando(true);

        
        const data = {
            nombre: nombre.trim(),
            ubicacion: ubicacion.trim(),
            precio: parseFloat(precio.trim()),
            detalles: detalle.trim(),
            foto: foto
        };


        fetch(apiPropiedades, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(data => {
            alert("Propiedad publicada exitosamente!");
            actualizarLista();
            cerrarModal();
        })
        .catch(error => {
            console.error("Error completo:", error);
            alert("Error al publicar propiedad: " + error.message);
        })
        .finally(() => {
            setCargando(false);
        });
    }

    function handleOnChangeFile(e) {
        const elemento = e.target;
        const file = elemento.files[0];
        
        if (!file) return;
        
        // Validar tipo de archivo (opcional)
        if (!file.type.startsWith('image/')) {
            alert("Por favor seleccione un archivo de imagen válido.");
            return;
        }
        

        
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function () {
            setFoto(reader.result.toString());
        };
        
        reader.onerror = function () {
            alert("Error al leer el archivo de imagen.");
        };
    }

    return (
        <section className="section_form">
            <form id="consultation-form" className="feed-form" onSubmit={crearPropiedad}>
                <input 
                    onChange={(e) => setNombre(e.target.value)} 
                    value={nombre}
                    required 
                    placeholder="Nombre Propiedad" 
                    type="text"
                    disabled={cargando}
                />
                <input 
                    onChange={(e) => setUbicacion(e.target.value)} 
                    value={ubicacion}
                    name="ubicacion" 
                    required 
                    placeholder="Ubicacion" 
                    type="text"
                    disabled={cargando}
                />
                <input 
                    onChange={(e) => setPrecio(e.target.value)} 
                    value={precio}
                    required 
                    placeholder="Precio por Dia" 
                    type="number"
                    min="0"
                    step="0.01"
                    disabled={cargando}
                />
                <input 
                    onChange={(e) => setDetalle(e.target.value)} 
                    value={detalle}
                    name="detalles" 
                    required 
                    placeholder="Detalles" 
                    type="text"
                    disabled={cargando}
                />
                <input 
                    onChange={handleOnChangeFile} 
                    name="fotoPropiedad" 
                    type="file" 
                    accept="image/*"
                    required 
                    placeholder="Fotos de propiedad"
                    disabled={cargando}
                />
                <button 
                    type="submit" 
                    className="botonFinal"
                    disabled={cargando}
                >
                    {cargando ? "Publicando..." : "Publicar"}
                </button>
            </form>
        </section>
    );
}

export default FormularioPublicar;