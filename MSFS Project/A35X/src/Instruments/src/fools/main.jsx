import ReactDOM from 'react-dom'
import './style.scss';
import {
    renderTarget,
} from '../util.js';

const Fools = () => {
    return(
        <div>
            <h1 id="text">Fools</h1>
        </div>
    )
}

ReactDOM.render(<Fools />, renderTarget)