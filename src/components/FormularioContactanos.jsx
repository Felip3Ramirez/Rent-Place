
import React from 'react';

const FormularioContactanos = () => {
    return (
        <section className="section_form">
            <form id="consultation-form" className="feed-form" action="#">
                <input required placeholder="Nombre" type="text" />
                <input name="phone" required placeholder="Telefono" />
                <input name="email" required placeholder="Correo" type="email" />
                <textarea className='textArea' name="" id="" cols="30" rows="10" placeholder="Mensaje"></textarea>
                
            </form>
        </section>
    );
}

export default FormularioContactanos;
