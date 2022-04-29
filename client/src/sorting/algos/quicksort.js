import { swap } from '../utils.js'


export function partitionStep(array, pivot, i, j) {
    while (array[i] < array[pivot]) {
        i++;
    }
    while (array[j] > array[pivot]) {
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
    var pivot = left,
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
    var pivot = items[left],
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