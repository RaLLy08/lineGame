export default class LinesStorage {
    constructor() {
        this._lines = [];
    }
    
    getLines = () => this._lines;

    addLine = (line) => this._lines.push(line);

    clearAlLlines = () => this._lines = [];
}
/*
export class Lines {
    constructor() {
        this._lines = [];
    }
    
    getAllLine= () => this._lines;

    getLineById = (id) => this._lines[id];

    //getLastLine = (id) => this._lines[id][this._lines.length - 1];

    addLine = (line) => this._lines.push([line]);

    addLineById = (id, line) => this._lines[id].push(line)

    clearAlLlines = () => this._lines = [];
}
*/