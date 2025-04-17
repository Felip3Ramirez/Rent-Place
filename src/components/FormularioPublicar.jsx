function FormularioPublicar(){
    return(
        <section className="section_form">
            <form id="consultation-form" className="feed-form" action="#">
                <input required placeholder="Nombre Propiedad" type="text" />
                <input name="phone" required placeholder="Ubicacion" />
                <input name="email" required placeholder="Telefono" type="email" />
                <input type="file" required placeholder="Fotos de propiedad"  />
                
            </form>
        </section>
    )
}
export default FormularioPublicar;