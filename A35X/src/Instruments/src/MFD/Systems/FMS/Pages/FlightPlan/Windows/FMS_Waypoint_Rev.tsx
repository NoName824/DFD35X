import React from "react";
import { FplnWindowType } from "../FMS_Fpln";
import './WaypointRev.scss'
type FMS_Waypoint_Rev_Props =
{
    waypointName: string,
    selectPage: (page: string) => void,
    selectWindow: (window: FplnWindowType) => void,
    deleteWaypoint?: void;
}
type revision_props = {
    label?: string,
    onClick?: (e?: any) => any,
    disabled?: boolean,
}
const Revision_Item = (props: revision_props) =>
{
    return(
        <span onClick={props.onClick} className={"waypoint-rev-item " + (props.disabled ? "frnt-grey": "frnt-white")}>{props.label}</span>
    );
}
export const FMS_Waypoint_Rev = (props: FMS_Waypoint_Rev_Props) =>
{
    return(
        <div className="waypoint-rev-menu bck-dark-grey">
            <Revision_Item label="FROM P.POS DIR TO" disabled/>
            <Revision_Item onClick={() => props.selectWindow(FplnWindowType.nextWaypoint)} label="INSERT NEXT WPT"/>
            <Revision_Item onClick={() => props.deleteWaypoint} label="DELETE *"/>
            <Revision_Item label="DEPARTURE" disabled/>
            <Revision_Item label="ARRIVAL" disabled/>
            <Revision_Item label="OFFSET" disabled/>
            <Revision_Item label="OVERFLY *" disabled/>
            <Revision_Item label="HOLD" disabled/> 
            <Revision_Item label="AIRWAYS"/>
            <Revision_Item label="ENABLE ALTN *" disabled/>
            <Revision_Item label="NEW DEST" disabled/>
            <Revision_Item label="CONSTRAINTS" disabled/>
            <Revision_Item label="CMS" disabled/>
            <Revision_Item label="STEP ALTs" disabled/>
            <Revision_Item label="WIND" disabled/>
        </div>
    );

}