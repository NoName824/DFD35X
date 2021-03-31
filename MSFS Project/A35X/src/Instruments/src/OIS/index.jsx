import {React, useState} from 'react';
import ReactDOM from 'react-dom';

import OIS_MAIN_PAGE from './main-page'

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

    useUpdate(dt => {
        const selectedScreen = getSimVar('L:OIS_SELECTED_SCREEN', 'enum');

        if (selectedScreen === 0) {
            return <OIS_MAIN_PAGE />;
        }
    });
}

ReactDOM.render(<OIS_DISPLAY />, renderTarget);