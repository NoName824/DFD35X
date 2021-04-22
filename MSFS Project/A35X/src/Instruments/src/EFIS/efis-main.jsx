import ReactDOM from 'react-dom'
import {useState} from 'react'
import './efis-main-style.scss'
import { render } from '../Hooks/index'
import {useUpdate} from '../Hooks/hooks'
import {useSimVar} from '../Hooks/simVars'
const EFIS_SCREEN = () => {
    const [pitchVar] = useSimVar('A:PLANE PITCH DEGREES', 'degrees')
    const [rollVar] = useSimVar('A:PLANE BANK DEGREES', 'degrees')
    const [IASVar] = useSimVar('A:AIRSPEED INDICATED', 'knots')
    const [altMSLVar] = useSimVar('A:INDICATED ALTITUDE', 'feet')

    let [pitch, setPitch] = useState(0)
    let [roll, setRoll] = useState(0)
    let [IAS, setIAS] = useState(0)
    let [altMSL, setAltMSL] = useState(0)
    
    useUpdate(dt => {
        setPitch(pitchVar)
        setRoll(rollVar)
        setIAS(IASVar)
        setAltMSL(altMSLVar)
    })
    
    let altitudeTapeArray = []
    for (const x of Array(84)) {
        altitudeTapeArray.push(x)
    }
    altitudeTapeArray.reverse()

    return(
        <div>
            <div id="background">
                <img src="/Pages/VCockpit/Instruments/generated/EFIS/EFIS_MASK.png"/>
            </div>

            <div id="static_overlay">
                <img src="/Pages/VCockpit/Instruments/generated/EFIS/staticoverlay.png"/>
            </div>

            <div id="horizon">
                <img src="/Pages/VCockpit/Instruments/generated/EFIS/EFIS_PFD_HORIZON.png" style={{
                    transformOrigin: `center ${2000 - (-pitch*7.4)}px`, 
                    transform: 'translateY( ' + (-pitch * 7.4).toString() + 
                    'px) rotate(' + roll.toString() + 'deg'
                }}/>
            </div>
            <div id="horizon_indicator">
                <img src="/Pages/VCockpit/Instruments/generated/EFIS/EFIS_PFD_HORIZON_disp.png"/>
            </div>

            <div id="airspeed_indicator">
                <img src="/Pages/VCockpit/Instruments/generated/EFIS/EFIS_PFD_AIRSPEED_INDICATOR.png" style={{
                    transform: IAS >= 30 ? 'translateY(' + ((IAS - 30) * 3.8).toString() + 'px)' : 'none'
                }}/>
            </div>
            <div id="airspeed_indicator_overlay">
                <img src="/Pages/VCockpit/Instruments/generated/EFIS/EFIS_PFD_AIRSPEED_INDICATOR_OVERLAY.png"/>
            </div>

            <div id="altitude_indicator">
                <ul>{altitudeTapeArray.map((number, i) => <li key={i}>{number}</li>)}</ul>
            </div>

            <div id="info">
                <h1>Airspeed: {Math.round(IAS)}</h1>
                <h1>Altitude MSL: {Math.round(altMSL)}</h1>
            </div>
        </div>
    )
}

render(<EFIS_SCREEN />)