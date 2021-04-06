import React from 'react'
import './FMS_init.scss'
import {Input} from '../../../Components/input'
import { Button } from '../../../Components/button';
import {Dropdown, DropdownType} from '../../../Components/dropdown'

import {
    renderTarget,
    useInteractionEvent,
    getSimVar,
    setSimVar,
    useUpdate
} from '../../../../util.js';
export enum ClimbMode
{
    Econ,
} 

type FMS_State = {
        flightNum: string,
        from: string,
        to: string
        altn: string,
        cpnyRte: string,
        altnRte: string,
        mode: ClimbMode,
}
export class FMS_Init extends React.Component<{}, FMS_State>
{

    execute()
    {
        
    }
    render()
    {
        var row1Y: number = 1.5
        var row2Y: number = 9
        var row3Y: number = 16
        var row4Y: number = 23
        var row5Y: number = 33
        var row6Y: number = 40
        var row7Y: number = 48
        var row8Y: number = 55
        return(
            <div className="fms-page">
                <h2 style={{top: row1Y +"%"}}>FLT NBR</h2>
                <Input onChange={(value) => setSimVar("ATC FLIGHT NUMBER", value, "string")} characterLimit={10} className="large-input" posX={18.5} posY={row1Y} type="text"></Input>
                <Button className="large-button" posX={50} posY={row1Y}>ACFT STATUS</Button>

                <Button disabled className="medium-tall-button" posX={77} posY={row1Y - 1}>CPNY F-PLN REQUEST</Button>

                <h2 style={{top: row2Y + "%"}}>FROM</h2>
                <Input onChange={(value) => this.setState({from: value})} characterLimit={4} className="small-input" posX={18.5} posY={row2Y} type="text"></Input>

                <h2 style={{top: row2Y + "%", right: "63%"}}>TO</h2>
                <Input onChange={(value) => this.setState({to: value})} characterLimit={4} className="small-input" posX={38} posY={row2Y} type="text"></Input>

                <h2 style={{top: row2Y + "%", right: "39%"}}>ALTN</h2>
                <Input disabled onChange={(value) => this.setState({altnRte: value})} characterLimit={4} className="small-input" posX={62} posY={row2Y} type="text"></Input>

                <h2 style={{top: row3Y + "%"}}>CPNY RTE</h2>
                <Input onChange={(value) => this.setState({cpnyRte: value})} characterLimit={10} className="large-input" posX={18.5} posY={row3Y} type="text"></Input>
                <Button disabled className="large-button" posX={50} posY={row3Y}>RTE SEL</Button>

                <h2 style={{top: row4Y + "%"}}>ALTN RTE</h2>
                <Input disabled onChange={(value) => this.setState({cpnyRte: value})} characterLimit={10} className="large-input" posX={18.5} posY={row4Y} type="text"></Input>
                <Button disabled className="large-button" posX={50} posY={row4Y}>ALTN RTE SEL</Button>

                <div style={{top: "31%"}} className="pagesplitter"></div>

                
                <h2 style={{top: row5Y + "%"}}>CRZ FL</h2>    
                <Input disabled onChange={(value) => this.setState({from: value})} characterLimit={5} className="medium-input" posX={18.5} posY={row5Y} type="text"></Input>
                <h2 style={{top: row5Y + "%", right: "38%"}}>CRZ TEMP</h2>    
                <Input disabled onChange={(value) => this.setState({from: value})} characterLimit={4} className="medium-input" posX={64} posY={row5Y} type="text"></Input>

                <h2 style={{top: row6Y + "%"}}>MODE</h2>    
                <Dropdown className="mode-dropdown" innerColor="$grey" offsetX={18.5} offseY={row6Y} type={DropdownType.system_select} onSelect={(index) => this.setState({mode: index})} items={["ECON"]}></Dropdown>
                <h2 style={{top: row6Y + "%", right: "38%"}}>TROPO</h2>    
                <Input onChange={(value) => this.setState({from: value})} characterLimit={5} value={36090} className="less-large-input" posX={64} posY={row6Y} type="text"></Input>


                <h2 style={{top: row7Y + "%"}}>CI</h2>
                <Input disabled onChange={(value) => this.setState({from: value})} characterLimit={3} className="small-input" posX={18.5} posY={row7Y} type="text"></Input>

                <h2 style={{top: row8Y + "%"}}>TRIP WIND</h2>
                <Input disabled onChange={(value) => this.setState({from: value})} characterLimit={5} className="medium-input" posX={18.5} posY={row8Y} type="text"></Input>
                <Button className="small-button" posX={48} posY={row8Y + 0.3}>WIND</Button>


                <div style={{top: "63%"}} className="pagesplitter"></div>

                <Button className="medium-button" posX={18.5} posY={67}>IRS</Button>
                <Button disabled className="medium-button" posX={18.5} posY={75}>DEPARTURE</Button>
                <Button className="large-button" posX={48} posY={75}>RTE SUMMARY</Button>

                <Button className="medium-button" posX={18.5} posY={83}>NAVAIDS</Button>
                <Button className="medium-button" posX={18.5} posY={91}>FUEL&LOAD</Button>

                <Button className="small-tall-button" posX={0} posY={100}>CLEAR<br/>Info</Button>
            </div>
        );
    }
}