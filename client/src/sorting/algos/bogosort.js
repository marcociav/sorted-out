import { shuffle, isSorted } from '../utils.js'


export function bogoSortStep(array) {
    array = shuffle(array);
    let sorted = isSorted(array);
    let highlighted = Math.floor(Math.random() * array.length);

    return {
        'array': array,
        'sorted': sorted,
        'highlighted': highlighted
    };
}

function bogoSort(array) {
    if (isSorted(array)) {
        return array;
    }
    let step = bogoSortStep(array)
    while (step.sorted === false) {
        step = bogoSortStep(step.array);
    }
    return array;
}

function bogoSortNatural(array) {
    while(isSorted(array) === false) {
        array = shuffle(array)
    }
    return array;
}