import React from 'react'
import './FMS_init.scss'
import {Input} from '../../../Components/input'
import { Button } from '../../../Components/button';


type FMS_State = {
        flightNum: string,
        from: string,
        to: string
}
export class FMS_Init extends React.Component<{}, FMS_State>
{

    execute()
    {

    }
    render()
    {
        return(
            <div className="fms-page">
                <h2 style={{top:"3.5%"}}>FLT NBR</h2>
                <Input onChange={(value) => this.setState({flightNum: value})} characterLimit={14} className="large-input" posX={18.5} posY={3.5} type="text"></Input>
                <Button className="large-input" posX={50} posY={3.5}>ACFT STATUS</Button>
                <h2 style={{top:"13%"}}>FROM</h2>
                <Input onChange={(value) => this.setState({from: value})} characterLimit={4} className="small-input" posX={18.5} posY={13} type="text"></Input>
                <h2 style={{top:"13%", right: "65%"}}>TO</h2>
                <Input onChange={(value) => this.setState({to: value})} characterLimit={4} className="small-input" posX={37} posY={13} type="text"></Input>
                <h2 style={{top:"13%", right: "41%"}}>ALTN</h2>
                <h2 style={{top:"20.5%"}}>CPNY RTE</h2>
                <Input onChange={(value) => this.setState({flightNum: value})} characterLimit={14} className="large-input" posX={18.5} posY={3.5} type="text"></Input>
                <h2 style={{top:"28%"}}>ALTN RTE</h2>
            </div>
        );
    }
}