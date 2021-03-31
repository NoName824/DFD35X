import {React, useState, useEffect} from 'react';
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
    /*KEY FOR SELECTED SCREEN VALUES
        0 = OIS_MAIN_PAGE
        1 = OIS_TEST
    */
    
        return <OIS_MAIN_PAGE />
}

ReactDOM.render(<OIS_DISPLAY />, renderTarget);