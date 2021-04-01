import ReactDOM from 'react-dom';
import './style.scss';
import {
    renderTarget,
} from '../util.js';

const April = () => {
    return(
        <div>
            <h1 id="text">April</h1>
        </div>
    )
}

ReactDOM.render(<April />, renderTarget)