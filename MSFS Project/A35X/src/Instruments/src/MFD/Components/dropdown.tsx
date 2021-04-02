import { List } from 'postcss/lib/list';
import React from 'react';
import './select.scss'

export enum DropdownType
{
    system_select,
    general_bar
}

export class Dropdown extends React.Component
{
    props:
    {
        items: Array<string>,
        type: DropdownType,
        onSelect?: (number) => void
        offsetX?: number,
        offseY?: number
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
        this.props.onSelect(index);
        this.setState({
            selected: this.props.items[index].toString()
        });
        this.toggleOpen();
    }
    render(){
        if(!this.state.open)
        { 
            switch(this.props.type)
            {
                case(DropdownType.system_select):
                    return(
                        <div style={{left: (this.props.offsetX + "%"), top: (this.props.offseY + "%")}} className="bck-blue-grey fmc-dropdown-body">
                            <div onClick={() => this.toggleOpen()} className="bck-grey drop-top">
                                <div className="bck-black drop-top-inner"> {this.state.selected}</div>
                            </div>
                        </div>
                    );
                case(DropdownType.general_bar):
                    return(
                        <div style={{left: (this.props.offsetX + "%"), top: (this.props.offseY + "%"), height: "5%", width: "25%"}} className="bck-white fmc-dropdown-body">
                            <div onClick={() => this.toggleOpen()} className="bck-grey drop-top">
                                {this.state.selected}
                            </div>
                        </div>
                    );
            }
        }
        else{
            var item_elements = [];
            this.props.items.map((item, index) => (
                item_elements.push(<span style={{top: (index * (100 / this.props.items.length)  + "%")}} onClick={() => this.selectItem(index)} className='drop-item'>{item}</span>)
            ));           
                
            switch(this.props.type)
            {
                case(DropdownType.system_select):
                    return(
                        <div style={{left: (this.props.offsetX + "%"), top: (this.props.offseY + "%")}} className="bck-blue-grey fmc-dropdown-body">
                            <div onClick={() => this.toggleOpen()} className="bck-grey drop-top"><div className="bck-black drop-top-inner"> {this.state.selected}</div></div>
                                <div style={{height: (this.props.items.length * 80 + "%")}}className="bck-blue-grey
                                drop-lower-body"><div className="bck-dark-grey drop-lower-inner">                            
                                    {item_elements}
                                </div>
                            </div>
                        </div>
                    );
                case(DropdownType.general_bar):
                return(
                    <div style={{left: (this.props.offsetX + "%"), top: (this.props.offseY + "%"), height: "5%", width: "25%"}} className="bck-white fmc-dropdown-body">
                        <div onClick={() => this.toggleOpen()} className="bck-grey drop-top">{this.state.selected}</div>
                            <div style={{height: (this.props.items.length * 80 + "%")}}className="bck-white
                            drop-lower-body"><div className="bck-dark-grey drop-lower-inner">                            
                                {item_elements}
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}