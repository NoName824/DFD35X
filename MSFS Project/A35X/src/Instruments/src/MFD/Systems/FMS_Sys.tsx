import React from 'react'
import {Dropdown, DropdownType} from '../Components/dropdown'
import './fms_style.scss'
export class FMS_Sys extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            currentPage: "ACTIVE/INIT"
        }
    }
    state:{
        currentPage: string
    }
    
    render()
    {
        return(
            <div className="SystemWindow">

                <Dropdown type={DropdownType.general_bar} items={["ACTIVE"]}/>
                <Dropdown offsetX={25} type={DropdownType.general_bar} items={["POSITION"]}/>
                <Dropdown offsetX={50} type={DropdownType.general_bar} items={["SEC INDEX"]}/>
                <Dropdown offsetX={75} type={DropdownType.general_bar} items={["DATA"]}/>
                

                <div id="fms-header" className="bck-white">{this.state.currentPage}</div>
            </div>
        );
    }
}