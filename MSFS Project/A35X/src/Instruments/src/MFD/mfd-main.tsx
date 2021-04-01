import ReactDOM from 'react-dom'
import React from 'react'
import './mfd-main-style.scss'
import { Dropdown } from './Components/dropdown'
import {
    renderTarget,
    useInteractionEvent,
    getSimVar,
    setSimVar,
    useUpdate
} from '../util.js';

export class MFD_BODY extends React.Component
{
    props: {
        side: string
    }
    state:{
        page: number
    }
    constructor(props)
    {
        super(props)
        this.state = {
            page: 1
        };
    }
    render()
    {
        return(
            <div id={this.props.side} className="mfd-body"> 
                <Dropdown items={[("FMS" + (this.props.side === "left" ? "1" : "2")), "ATC COM", "SURV", "C/L MENU", "FCU BKUP"]}></Dropdown>
            </div>
        );
    }
}

const MFD_SCREEN = () => {
    return(
        <body>
            <MFD_BODY side="left"/>
            <div id="mfd-splitter"></div>
            <MFD_BODY side="right"/>
        </body>
    )
}

ReactDOM.render(<MFD_SCREEN />, renderTarget)