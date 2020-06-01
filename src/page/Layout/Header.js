import { createWrapper } from "./createWrapper"
import './style.less';

export class Header { 
    constructor() {
        this.headerWrapper = createWrapper('wrapper__header'); 

        return this.headerWrapper;
    }
}