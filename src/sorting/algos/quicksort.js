import { swap } from '../utils.js'


export class Stack {
    constructor(dim) {
        this.items = new Array(dim);
        this.items.fill(0);
        this.top = -1;
    }

    push(value) {
        this.items[++this.top] = value;
    }

    pop() {
        return this.items[this.top--];
    }
}


export function partitionStep(array, pivot, i, j) {
    while (array[i] < pivot) {
        i++;
    }
    while (array[j] > pivot) {
        j--;
    }
    if (i <= j) {
        swap(array, i, j);
        i++;
        j--;
    }
    return {
        'array': array,
        'pivot': pivot,
        'i': i,
        'j': j
    }
}


function partition(array, left, right) {
    var pivot = array[Math.floor((right + left) / 2)],
        i = left,
        j = right,
        step;

    while (i <= j) {
        step = partitionStep(array, pivot, i, j);
        array = step.array;
        pivot = step.pivot;
        i = step.i;
        j = step.j;
    }
    return i;
}


function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); 
        if (left < index - 1) { 
            quickSort(items, left, index - 1);
        }
        if (index < right) { 
            quickSort(items, index, right);
        }
    }
    return items;
}


function partitionNatural(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)],
        i = left,
        j = right;

    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}


function quickSortNatural(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partitionNatural(items, left, right); 
        if (left < index - 1) { 
            quickSortNatural(items, left, index - 1);
        }
        if (index < right) { 
            quickSortNatural(items, index, right);
        }
    }
    return items;
}