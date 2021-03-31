import {React, useState} from 'react';
import ReactDOM from 'react-dom';

import OIS_MAIN_PAGE from './Pages/Main Page/main-page'
import OIS_TEST from './test'

import './index-style.scss';

import {
    renderTarget,
    useInteractionEvent,
    getSimVar,
    setSimVar,
    useUpdate
} from '../util.js';

function OIS_DISPLAY() {
    //Create enum simvar to define what page on the OIS to render.
    setSimVar('L:OIS_SELECTED_SCREEN', 0, 'enum');

    /*KEY FOR SELECTED SCREEN VALUES
        0 = OIS_MAIN_PAGE
    */

    let [oisState, setOisState] = useState(0);
    
    useUpdate(dt => {
        setOisState(getSimVar('L:OIS_SELECTED_SCREEN', 'enum'));
    });  
    
    if (oisState === 0) {
        return <OIS_MAIN_PAGE />;
    }
    else if (oisState === 1) {
        return <OIS_TEST />;
    }
    else {
        return <div><h1>null render</h1></div>;
    }
}

ReactDOM.render(<OIS_DISPLAY />, renderTarget);