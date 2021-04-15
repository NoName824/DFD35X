import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import './mfd-main-style.scss'
import { Dropdown, DropdownType } from './Components/dropdown'
import { FMS_Sys } from './Systems/FMS/FMS_Sys'
import { ATC_COM_Sys } from './Systems/ATC_COM_Sys'
import { SURV_Sys } from './Systems/SURV_Sys'
import { Checklist_Sys } from './Systems/Checklist_Sys'
import { FCU_BKUP_Sys } from './Systems/FCU_BKUP_Sys'
import { FlightPlanManager } from '../wtsdk/src/flightplanning/FlightPlanManager'
import {
    renderTarget,
    useInteractionEvent,
    getSimVar,
    setSimVar,
    useUpdate
} from '../util.js';

type MFD_Props = {
    side: string,
    flightPlanManager: FlightPlanManager,
}
type MFD_State = {
    page: number,
}
export const MFD_Body = (props: MFD_Props) => 
{
    const [page, setPage] = useState(Number);

    function currentPage()
    {
        switch(page)
        {
            case 0: 
                return(<FMS_Sys flightPlanManager={props.flightPlanManager}/>);
            case 1:
                return(<ATC_COM_Sys/>);
            case 2:
                return(<SURV_Sys/>);
            case 3:
                return(<Checklist_Sys/>);
            case 4:
                return(<FCU_BKUP_Sys/>);
        }
    }
    return(
        <div id={props.side} className="mfd-body"> 
            <Dropdown type={DropdownType.system_select} onSelect={(index) => setPage(index)} items={[("FMS" + (props.side === "left" ? "1" : "2")), "ATC COM", "SURV", "C/L MENU", "FCU BKUP"]}></Dropdown>
            <span id="flight-num">{getSimVar("ATC FLIGHT NUMBER", "string")}</span>
            {currentPage()}
        </div>
    );
}

export const MFD_SCREEN = () => {
    const [instrument] = useState(new A35X_MFD_Logic());
    const [flightPlanManager] = useState(() => new FlightPlanManager(instrument))
    return(
        <body>
            <MFD_Body side="left" flightPlanManager={flightPlanManager}/>
            <div className="bck-grey" id="mfd-splitter"></div>
            <MFD_Body side="right" flightPlanManager={flightPlanManager}/>
        </body>
    );
}

ReactDOM.render(<MFD_SCREEN />, renderTarget)