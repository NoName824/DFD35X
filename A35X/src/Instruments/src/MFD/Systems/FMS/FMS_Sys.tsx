
import React, { useState } from 'react'
import {Dropdown, DropdownType} from '../../Components/dropdown'
import './fms_style.scss'
import {FMS_Init} from './Pages/FMS_Init'
import {FMS_Perf} from './Pages/FMS_Perf'
import { FlightPlanManager } from '../../../flightplanning/FlightPlanManager'
import { FMCDataManager } from '../../A35X_FMCDataManager'
import { MFD_StateManager } from '../../MFD_StateManager'
import { FMS_Fpln } from './Pages/FlightPlan/FMS_Fpln'
import { FMS_Departure } from './Pages/FlightPlan/FMS_Departure'
import { FMS_Arrival } from './Pages/FlightPlan/FMS_Arrival'

type FMS_Props =
{
    dataManager: FMCDataManager,
    stateManager: MFD_StateManager
}
export const FMS_Sys =(props: FMS_Props) =>
{
    const [currentPage, setCurrentPage] = useState(String)
    
    function getPage()
    {
        if(currentPage.includes("ACTIVE/INIT"))
                return(<FMS_Init selectPage={(value: string) => setCurrentPage(value)} stateManager={props.stateManager} dataManager={props.dataManager}/>);
        else if(currentPage.includes("ACTIVE/PERF"))
                return(<FMS_Perf/>);
        else if(currentPage.includes("ACTIVE/F-PLN"))
                return(<FMS_Fpln selectPage={(value: string) => setCurrentPage(value)} page={currentPage.substr(13, currentPage.length - 13)} stateManager={props.stateManager}/>);
    }
    //Select Page within the ACTIVE dropdown
    function selectActivePage(index: number)
    {
        switch(index)
        {
            case(0):
                setCurrentPage("ACTIVE/F-PLN");
                break;
            case(1):
                setCurrentPage("ACTIVE/PERF");
            break;
            case(2):
                setCurrentPage("ACTIVE/FUEL&LOAD");
                break;
            case(3):
                setCurrentPage("ACTIVE/WIND");
                break;
            case(4):
                setCurrentPage("ACTIVE/INIT");
                break;
        }
    }
    return(
        <div className="SystemWindow">               
            <Dropdown label="ACTIVE" onSelect={(i) => selectActivePage(i)} type={DropdownType.general} items={["F-PLN", "PERF", "FUEL&LOAD", "WIND", "INIT"]}/>
            <Dropdown label="POSITION" onSelect={(i) => console.log("Selected " + i)} offsetX={25} type={DropdownType.general} items={["POSITION"]}/>
            <Dropdown label="SEC INDEX" onSelect={(i) => console.log("Selected " + i)} offsetX={50} type={DropdownType.general} items={["SEC INDEX"]}/>
            <Dropdown label="DATA" onSelect={(i) => console.log("Selected " + i)} offsetX={75} type={DropdownType.general} items={["DATA"]}/>                              
            <div id="fms-header" className="bck-white frnt-grey"><h1>{currentPage}</h1></div>
            {getPage()}   
            <div id="fms-footer"></div>          
        </div>
    );
    
}