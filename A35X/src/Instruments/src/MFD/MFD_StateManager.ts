import { FlightPlanAsoboSync } from '../flightplanning/FlightPlanAsoboSync';
import { FlightPlanManager } from '../flightplanning/FlightPlanManager';
import { useSimVar } from '../Hooks/simVars';

export class MFD_StateManager
{

    onUpdate: (() => void)[];
    flightPlanManager: FlightPlanManager;
    
    flightNumber: string;

    origin: string;
    destination: string;
    alternate: string;

    depRunway: string;
    SID: string;
    depTransition: string;


    constructor(update:() => void, _flightPlanManager: FlightPlanManager)
    {
        this.onUpdate = [];
        this.onUpdate.push(() => update());
        this.flightPlanManager = _flightPlanManager;

        this.flightNumber = '';

        this.origin = '';
        this.destination = '';
        this.alternate = '';

        this.depRunway = '';
        this.SID = '';
        this.depTransition = '';
        
        this.flightNumber = SimVar.GetSimVarValue("ATC FLIGHT NUMBER", "string");
        FlightPlanAsoboSync.LoadFromGame(this.flightPlanManager).then(() => {
            if(this.flightPlanManager.getOrigin() != undefined && this.flightPlanManager.getDestination() != undefined)
            {
                this.origin = this.flightPlanManager.getOrigin().ident;
                this.destination = this.flightPlanManager.getDestination().ident;
                this.depRunway = this.flightPlanManager.getDepartureRunway().designation;
                var depProc = this.flightPlanManager.getOrigin().infos.departures[this.flightPlanManager.getDepartureProcIndex()]
                this.SID = depProc.name;
                if(this.SID != '')
                    this.depTransition = depProc.enRouteTransitions[this.flightPlanManager.getDepartureEnRouteTransitionIndex()].name;
                
                console.log("Dep Runway:" + this.depRunway);
                console.log("Departure Procedure: " + this.SID);
                console.log("Departure Transition: " + this.depTransition);
                this.updateAll();
            }
        });
    }    
    updateAll()
    {
        this.onUpdate.forEach(element => {
            element();
        });
    }
    updateOrigin(value: string)
    {
        this.origin = value
        this.destination = '';
        this.alternate = '';
        this.depRunway = '';
        this.SID = '';
        this.depTransition = '';
        this.updateAll();
    }
    updateDestination(value: string)
    {
        this.destination = value;
        this.updateAll();  
    }
    updateAlternate(value: string)
    {
        this.alternate = value;
        this.updateAll();  
    }
    updateFlightNum(value: string)
    {
        this.flightNumber = value;
        this.updateAll();
    }
    updateDepRunway(value: string)
    {
        this.depRunway = value;
        this.SID = '';
        this.depTransition = '';
        this.updateAll();
    }
    updateSID(value: string)
    {
        this.SID = value;
        this.depTransition = '';
        this.updateAll();
    }
    updateTrans(value: string)
    {
        this.depTransition = value;
        this.updateAll();
    }
}
 