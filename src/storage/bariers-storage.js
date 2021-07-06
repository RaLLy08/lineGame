export default class BariersStorage {
    constructor() {
        this._bariers = [];
    }
    
    getBariers = () => this._bariers;

    addBarier = (barier) => this._bariers.push(barier);

    clearAllBariers = () => this._bariers = [];
}