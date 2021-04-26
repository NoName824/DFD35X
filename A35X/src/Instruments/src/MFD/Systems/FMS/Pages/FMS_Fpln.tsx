import React, { useEffect, useState } from "react";
import { Dropdown, DropdownType } from "../../../Components/dropdown";
import './Fpln.scss'
import { WaypointData } from '../../../Components/WaypointData'
import { MFD_StateManager } from "../../../MFD_StateManager";
import { FMS_Departure } from "./FMS_Departure";
import { FMS_Arrival } from "./FMS_Arrival";
import { FMCDataManager } from "../../../A35X_FMCDataManager";
import { Button } from "../../../Components/button";

type Fpln_Props =
{
    stateManager: MFD_StateManager,
    page: string,
    selectPage: (value: string) => void,
}
export const FMS_Fpln = (props: Fpln_Props ) =>
{
    const [scrollPosition, setScrollPosition] = useState(Number);

    //REMOVE THIS IF OTHER STATE OBJECTS APPEAR
    const [update, setUpdate] = useState(false);

    const [didLoad, setDidLoad] = useState(false);
    
    function scroll(down: boolean)
    { 
        var numWaypoints = props.stateManager.flightPlanManager.getWaypointsCount();
        console.log("Num of waypoints: " + numWaypoints);
        if(props.stateManager.flightPlanManager.getDepartureRunway())
        {
            numWaypoints -= 1;
        }
        if(props.stateManager.flightPlanManager.getApproachRunway())
        {
            numWaypoints -= 1;
        }
        if(down)
        {
            if(scrollPosition < Math.max(numWaypoints, 9) - 9)
                setScrollPosition(scrollPosition + 1);
        }
        else
        {
            if(scrollPosition > Math.min(numWaypoints, 9) - 9)
                setScrollPosition(scrollPosition - 1);
        }
    }

    useEffect(() => {
        if(!didLoad)
        {
            setDidLoad(true);
            if(props.stateManager.onUpdate.find(() => onUpdate()) == undefined)
                props.stateManager.onUpdate.push(() => onUpdate());
            onUpdate();
        }
    });

    function onUpdate()
    {
        props.stateManager.flightPlanManager.getWaypoints().forEach((element) =>
        {
            console.log(element.icao);
        });
        setUpdate(!update);
    }
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function getWaypoints()
    {
        var item_elements: Array<JSX.Element> = [];
        var waypoints: any[] = [];
        props.stateManager.flightPlanManager.getAllWaypoints().map((item, index) =>
        {
            if(index != 1)
                waypoints.push(item);
        });
        for (let index = scrollPosition; index < waypoints.length; index++) {
            const element = waypoints[index];
            var waypointName = element.ident;
            if(index == 0)
            {
                waypointName += FMCDataManager.runwayDesignatorUtil(props.stateManager.depRunway);   
            }
            else if(index == waypoints.length - 1)
            {
                waypointName += FMCDataManager.runwayDesignatorUtil(props.stateManager.arrRunway);
            }
            item_elements.push(<WaypointData afterLeg waypointIdent={waypointName} timePrediction={"08:90"} top={(index - scrollPosition) * 9 + 7 + "%"}left="0" speedPred="NAN" altitudePred="NAN" />)           
        }
        return(item_elements);
    }
    
    switch(props.page)
    {
        case("DEPARTURE"):
            return(<FMS_Departure stateManager={props.stateManager}/>);
        case("ARRIVAl"):
            return(<FMS_Arrival stateManager={props.stateManager}/>);
    }
    return(
        <div className="fms-page">
            <div className="fpln-header">
                <h3 style={{left: "2px", top: "4px"}}>FROM</h3>
                <h3 style={{left: "25%", top: "4px"}}>UTC</h3>
                <Dropdown offsetX={40} offsetY={0.25} width={"33%"} height={'4.7%'} onSelect={() => null} defaultIndex={0} items={["SPD        ALT    ", "EFOB   T.WIND"]} type={DropdownType.general}/>
                <h3  style={{left: "75%", top: "4px"}}>TRK DIST FPA</h3>
            </div>          
            <div className="fpln-body">
                {getWaypoints()}
            </div>
            <div style={{height: "10%"}} className="fpln-body">
                <Button posY={87} height="40px" width="100px" onClick={() => props.selectPage("ACTIVE/F-PLN/ARRIVAl")}>{props.stateManager.origin}</Button>

                <Button posY={87} posX={72} height="50px" width="50px" onClick={() => scroll(true)}><img src="" alt=""/></Button>
                <Button posY={87} posX={80} height="50px" width="50px" onClick={() => scroll(false)}><img src="" alt=""/></Button>
            </div>
        </div>
    );
}