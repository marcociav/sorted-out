export const sleep = ms => new Promise(r => setTimeout(r, ms));

export function randomIntFromRange(min, max) {
    // min included, max excluded
    return Math.floor(Math.random() * (max - min) + min);
}

export function swap(items, i, j){
    var tmp = items[i];
    items[i] = items[j];
    items[j] = tmp;
}

export function shuffle(array) {
    var n = array.length;
    var i;
  
    // While there remain elements to shuffle
    while (n > 0) {

        // Pick a remaining element
        i = Math.floor(Math.random() * n--);

        // Swap it with the current element
        swap(array, n, i);
    }
    return array;
  }

export function isSorted(array) {
    var n = array.length;
    for (let i = 1; i < n; i++) {
        if (array[i] < array[i - 1]) {
            return false;
        }
    }
    return true;
}

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