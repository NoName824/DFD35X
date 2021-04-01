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