import React, { useEffect, useState } from "react";
import { Dropdown, DropdownType } from "../../../Components/dropdown";
import { MFD_StateManager } from "../../../MFD_StateManager";
import './DepPage.scss'

type Departure_Props ={
    stateManager: MFD_StateManager
}
export const FMS_Departure = (props: Departure_Props) =>
{
    const [airport, setAirport] = useState(String);
    const [runway, setRunway] = useState(String);
    const [sid, setSid] = useState(String);
    const [trans, setTrans] = useState(String);

    const [didLoad, setDidLoad] = useState(false);

    useEffect(() => {
        if(!didLoad)
        {
            setDidLoad(true);
            if(props.stateManager.onUpdate.find(() => onUpdate()) == undefined)
                props.stateManager.onUpdate.push(() => onUpdate());
            onUpdate();
        }
    });
    function runwayDesignatorUtil(value: string): string
    {
        var regExp = /[a-zA-Z]/g;      
        if(value.length == 1 || (regExp.test(value) && value.length == 2))
        {
            return "0" + value;
        }
        else
            return value;
    }
    function onUpdate() {
        setAirport(props.stateManager.origin);
        setRunway(runwayDesignatorUtil(props.stateManager.depRunway))
        setSid(props.stateManager.SID);
        setTrans(props.stateManager.depTransition);
    }
    function getRunways(): string[]
    {
        return(props.stateManager.flightPlanManager.getOrigin().infos.oneWayRunways.map(a => `${runwayDesignatorUtil(a.designation)} ${Math.round(a.length)}M ILS`));
    }
    function getSIDs(): any[]
    {
        if(props.stateManager.depRunway == '')
            return [];
        var sids = props.stateManager.flightPlanManager.getOrigin().infos.departures;
        
        var correctSids: any = [];
        var selectedrwy = runwayDesignatorUtil(props.stateManager.depRunway);
        console.log("looking for SIDs with runway " + selectedrwy);
        for (let i = 0; i < sids.length; i++) {
            const element = sids[i];
            for (let j = 0; j < element.runwayTransitions.length; j++) {
                const trans = element.runwayTransitions[j];
                var transname = runwayDesignatorUtil(trans.name.slice(2));
                if (transname == selectedrwy)
                {
                    console.log(`${element.name} does link with ${selectedrwy}`);
                    correctSids.push(element);
                    break;
                }    
                console.log(`${element.name} does not link with ${selectedrwy}`);            
            }    
        }
        return(correctSids);
    }
    function getTransitions(): string[]
    {   
        console.log("Departure Index is " + props.stateManager.flightPlanManager.getDepartureProcIndex());
        if(props.stateManager.flightPlanManager.getDepartureProcIndex() > -1)
            return(props.stateManager.flightPlanManager.getOrigin().infos.departures[props.stateManager.flightPlanManager.getDepartureProcIndex()].enRouteTransitions.map(a => a.name));
        return([""])
    }
    function selectRunway(index: number)
    {
        props.stateManager.flightPlanManager.setOriginRunwayIndex(index);
        console.log("Selecting Runway " + props.stateManager.flightPlanManager.getOrigin().infos.oneWayRunways[index].designation);
        props.stateManager.flightPlanManager.setDepartureProcIndex(-1);
        props.stateManager.flightPlanManager.setDepartureEnRouteTransitionIndex(-1);


        props.stateManager.updateDepRunway(props.stateManager.flightPlanManager.getOrigin().infos.oneWayRunways[index].designation);
        props.stateManager.updateSID('');
        props.stateManager.updateTrans('');
    }
    function selectSID(index: number)
    {
        var num = props.stateManager.flightPlanManager.getOrigin().infos.departures.indexOf(getSIDs()[index])
        props.stateManager.flightPlanManager.setDepartureProcIndex(num);
        props.stateManager.flightPlanManager.setDepartureEnRouteTransitionIndex(-1);

        props.stateManager.updateSID(props.stateManager.flightPlanManager.getOrigin().infos.departures[num].name);
        props.stateManager.updateTrans('');
    }
    function selectTransition(index: number)
    {
        props.stateManager.flightPlanManager.setDepartureEnRouteTransitionIndex(index);
        props.stateManager.updateTrans(props.stateManager.flightPlanManager.getOrigin().infos.departures[props.stateManager.flightPlanManager.getDepartureProcIndex()].enRouteTransitions[index].name)
    }
    function ILSInfo(): string
    {
        //Incorrect Functionality Fix Later
        if(runway != '')
            return("ILS TG");
        return("");
    }
    return(
        <div>
            <div style={{width: "98%", height: "29%", top: "12%", left: "1%"}} className="border-box">
                <h3 style={{left: "6%", top: "-6%", backgroundColor: "black"}}>SELECTED DEPARTURE</h3>

                <h3 style={{left: "1%", top: "25%"}}>FROM</h3>
                <h3 style={{left: "13%", top: "23.5%"}} className="dep-info-text">{airport} {ILSInfo()}</h3>

                <h3 style={{left: "50%", top: "10%"}}>RWY</h3>
                <h3 style={{left: "50%", top: "30%"}} className="dep-info-text">{runway == '' ? '---' : runway}</h3>

                <h3 style={{left: "60%", top: "10%"}}>LENGTH</h3>
                <h3 style={{left: "60%", top: "30%"}} className="dep-info-text">{(props.stateManager.flightPlanManager.getDepartureRunway() && airport != '') ? `${Math.round(props.stateManager.flightPlanManager.getDepartureRunway().length)}m` : '----'}</h3>

                <h3 style={{left: "85%", top: "10%"}}>CRS</h3>
                <h3 style={{left: "85%", top: "30%"}} className="dep-info-text">{runway == '' ? '---' : Utils.leadingZeros(Math.round((props.stateManager.flightPlanManager.getDepartureRunway().direction)), 3)}</h3>

                <h3 style={{left: "1%", top: "65%"}}>EOSID</h3>  
                <h3 style={{left: "1%", top: "80%"}} className="dep-info-text">{runway == '' ? '------' : 'NONE'}</h3>

                <h3 style={{left: "25%", top: "65%"}}>FREQ/CHAN</h3>
                <h3 style={{left: "25%", top: "80%"}} className="dep-info-text">{/*runway == '' ? '---.--' : String(props.stateManager.flightPlanManager.getDepartureRunway().primaryILSFrequency)*/}---.--</h3>

                <h3 style={{left: "55%", top: "65%"}}>SID</h3>
                <h3 style={{left: "55%", top: "80%"}} className="dep-info-text">{sid == '' ? '------' : sid}</h3>

                <h3 style={{left: "80%", top: "65%"}}>TRANS</h3>
                <h3 style={{left: "80%", top: "80%"}} className="dep-info-text">{trans == '' ? '------' : trans}</h3>
            </div>
            <Dropdown disabled={airport == ''} height={"5%"} width="40%" offsetX={10} offseY={42} label="RWY" onSelect={(index: number) => selectRunway(index)} type={DropdownType.general} items={getRunways()}/>

            <Dropdown disabled={runway == ''} height={"5%"} width="20%" offsetX={55} offseY={42} label="SID" onSelect={(index: number) => selectSID(index)} type={DropdownType.general} items={getSIDs().map(a => a.name)}/>
            <Dropdown disabled={sid == '' || getTransitions().length == 0} height={"5%"} width="20%" offsetX={78} offseY={42} label="TRANS" onSelect={(index: number) => selectTransition(index)} type={DropdownType.general} items={getTransitions()}/>
        </div>
    );
}


