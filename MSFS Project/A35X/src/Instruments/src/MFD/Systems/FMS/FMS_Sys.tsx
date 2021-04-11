import React from 'react'
import {Dropdown, DropdownType} from '../../Components/dropdown'
import './fms_style.scss'
import {FMS_Init} from './Pages/FMS_Init'
import {FMS_Perf} from './Pages/FMS_Perf'

type FMS_Props =
{

}
export class FMS_Sys extends React.Component<FMS_Props>
{
    constructor(props : FMS_Props)
    {
        super(props)
        this.state = {
            currentPage: "ACTIVE/INIT"
        }
    }
    state:{
        currentPage: string
    }
    currentPage()
    {
        switch(this.state.currentPage)
        {
            case("ACTIVE/INIT"):
                return(<FMS_Init/>);
            case("ACTIVE/PERF"):
                return(<FMS_Perf/>);
        }
    }
    selectActivePage(index: number)
    {
        switch(index)
        {
            case(0):
                this.setState({currentPage: "ACTIVE/F-PLN"});
                break;
            case(1):
                this.setState({currentPage: "ACTIVE/PERF"});
                break;
            case(2):
                this.setState({currentPage: "ACTIVE/FUEL&LOAD"});
                break;
            case(3):
                this.setState({currentPage: "ACTIVE/WIND"});
                break;
            case(4):
                this.setState({currentPage: "ACTIVE/INIT"});
            break;
        }
    }
    render()
    {
        return(
            <div className="SystemWindow">               
                <Dropdown label="ACTIVE" onSelect={(i) => this.selectActivePage(i)} type={DropdownType.general_bar} items={["F-PLN", "PERF", "FUEL&LOAD", "WIND", "INIT"]}/>
                <Dropdown label="POSITION" onSelect={(i) => console.log("Selected " + i)} offsetX={25} type={DropdownType.general_bar} items={["POSITION"]}/>
                <Dropdown label="SEC INDEX" onSelect={(i) => console.log("Selected " + i)} offsetX={50} type={DropdownType.general_bar} items={["SEC INDEX"]}/>
                <Dropdown label="DATA" onSelect={(i) => console.log("Selected " + i)} offsetX={75} type={DropdownType.general_bar} items={["DATA"]}/>                              
                <div id="fms-header" className="bck-white frnt-grey"><h1>{this.state.currentPage}</h1></div>
                {this.currentPage()}             
            </div>
        );
    }
}