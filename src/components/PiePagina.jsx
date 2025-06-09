import iconX from '../assets/icon_x.png'
import iconF from '../assets/icon_facebook.png'
import iconI from '../assets/icon_instagram.png'

function PiePagina (){
    return (
        <div className="piePagina">
            <h2>Renta Place</h2>
            <div className="redes">
                <img src={iconF} alt="Facebook" />
                <img src={iconX} alt="X" />
                <img src={iconI} alt="Instagram" />

            </div>
        </div>
    )
}
export default PiePagina;