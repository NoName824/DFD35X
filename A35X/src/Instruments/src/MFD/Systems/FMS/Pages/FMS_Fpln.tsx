import React from "react";
import { Dropdown, DropdownType } from "../../../Components/dropdown";

export const FMS_Fpln = () =>
{
    return(
        <div className="fms-page">
            <div className="fpln-header">
                <h3>FROM</h3>
                <h3>UTC</h3>
                <Dropdown onSelect={() => null} items={["SPD   ALT"]} type={DropdownType.general}/>
                <h3>TRK</h3>
                <h3>DIST</h3>
                <h3>FPA</h3>
            </div>          
        </div>
    );
}