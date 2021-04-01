import ReactDOM from 'react-dom';
import './style.scss';
import {
    renderTarget,
} from '../util.js';

const Lol = () => {
    return(
        <div>
            <h1 id="text">lol</h1>
        </div>
    )
}

ReactDOM.render(<Lol />, renderTarget)