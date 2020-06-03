export default class BariersStorage {
    constructor() {
        this._bariers = [];
    }
    
    getBariers = () => this._bariers;

    addBarier = (barier) => this._bariers.push(barier);

    clearAlBariers = () => this._bariers = [];
}