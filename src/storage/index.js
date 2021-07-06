import LinesStorage from './line-storage'
import BariersStorage from './bariers-storage'

const Lines = LinesStorage;
const Bariers = BariersStorage;

export const store = {
    lines: new Lines(),
    bariers: new Bariers(),
};

