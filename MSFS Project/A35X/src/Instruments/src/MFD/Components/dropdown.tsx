/*
 * A32NX
 * Copyright (C) 2020-2021 FlyByWire Simulations and its contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { List } from 'postcss/lib/list';
import React from 'react';
import './select.scss'

export class Dropdown extends React.Component
{
    props:
    {
        items: Array<string>
    }
    state:
    {
        open: boolean,
        selected: string
    }
    constructor(props)
    {
        super(props);
        this.state = {
            open: false,
            selected: props.items[0].toString()
        }
        this.selectItem = this.selectItem.bind(this);       
        this.toggleOpen = this.toggleOpen.bind(this);
    }
    toggleOpen()
    {
        this.setState({open: !this.state.open});
    }
    selectItem(index: number)
    {
        console.log("Item Index is " + index)
        this.setState({
            selected: this.props.items[index].toString()
        });
        this.toggleOpen();
    }
    render(){
        if(!this.state.open)
        { 
            return(
                <div className="fmc-dropdown-body">
                        <div onClick={() => this.toggleOpen()} className="drop-top"><div className="drop-top-inner"> {this.state.selected}</div></div>
                </div>
            );
        }
        else{
            var item_elements = [];
            this.props.items.map((item, index) => (
                item_elements.push(<span style={{top: (index * (100 / this.props.items.length)  + "%")}} onClick={() => this.selectItem(index)} className='drop-item'>{item}</span>)
            ));           
                
            return(
                <div className="fmc-dropdown-body">
                    <div onClick={() => this.toggleOpen()} className="drop-top"><div className="drop-top-inner"> {this.state.selected}</div></div>
                        <div style={{height: (this.props.items.length * 80 + "%")}}className="drop-lower-body"><div className="drop-lower-inner">                            
                            {item_elements}
                        </div>
                    </div>
                </div>
            );
        }
    }
}