
import React from 'react';

function FormularioContactanos  ({cerrarModal2})  {

    function enviarFormulario(e) {
        e.preventDefault();
        cerrarModal2();
        alert('Formulario enviado');
    }
    return (
        <section className="section_form">
            <form id="consultation-form" className="feed-form" action="#">
                <input required placeholder="Nombre" type="text" />
                <input name="phone" required placeholder="Telefono" />
                <input name="email" required placeholder="Correo" type="email" />
                <textarea
                    className="textArea"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Mensaje"
                ></textarea>
                <button
                    type="submit"
                    onClick={enviarFormulario}
                    className="botonFinal"
                >
                    Enviar
                </button>
            </form>
        </section>
    );
}

export default FormularioContactanos;
