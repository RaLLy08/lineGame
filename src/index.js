import LineAnimation from './animation';
import { store } from './storage';
import Page from './page';
import './style.less'

const init = () => {
    new LineAnimation(store, new Page()); 
}
init();