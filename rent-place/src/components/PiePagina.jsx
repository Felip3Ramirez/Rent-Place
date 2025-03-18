import iconX from '../assets/icon_x.png'
import iconF from '../assets/icon_facebook.png'
import iconI from '../assets/icon_instagram.png'

function PiePagina (){
    return (
        <div className="piePagina">
            <h2>Renta Place</h2>
            <div className="redes">
                <img src={iconF} alt="" />
                <img src={iconX} alt="" />
                <img src={iconI} alt="" />

            </div>
        </div>
    )
}
export default PiePagina;