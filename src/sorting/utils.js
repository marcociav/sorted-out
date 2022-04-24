export const sleep = ms => new Promise(r => setTimeout(r, ms));

export function randomIntFromRange(min, max) {
    // min included, max excluded
    return Math.floor(Math.random() * (max - min) + min);
}

export function shuffle(array) {
    var n = array.length, tmp, i;
  
    // While there remain elements to shuffle
    while (n) {

        // Pick a remaining element
        i = Math.floor(Math.random() * n--);

        // Swap it with the current element
        tmp = array[n];
        array[n] = array[i];
        array[i] = tmp;
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