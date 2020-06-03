import LineAnimation from './animation';
import { store } from './storage';
import Page from './page';

const init = () => {
    new LineAnimation(store, new Page()); 
}
init();