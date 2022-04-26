import React from 'react';
import './SortingVisualizer.css';
import { sleep, randomIntFromRange, isSorted, Stack} from './utils.js';
import { bogoSortStep } from './algos/bogosort.js';


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            isSorted: false,
            highlighted: {
                "c1": null,
                "c2": null,
                "c3": null,
                "c4": null
            },
            isSorting: false,
            arrayLength: 200,
            tmpArrayLength: 200,
            sortAnimationSpeedMS: 10
        };
        this.sidebarWidth = 300;
        this.background = '#3d3f42';

        this.handleArrayLengthChange = this.handleArrayLengthChange.bind(this);
        this.handleArrayLengthSubmit = this.handleArrayLengthSubmit.bind(this)
        
    }

    componentDidMount() {
        this.setRandomArray();
        document.body.style.background = this.background;
    }

    async setRandomArray() {
        const array = [];
        for (let i = 0; i < this.state.arrayLength; i++) {
            array.push(randomIntFromRange(12, 1320));
        }
        await this.unHighlightAll();
        this.setState(() => {return {array: array, isSorted: false, isSorting: false}});
    }

    async startSort() {
        await this.unHighlightAll();
        this.setState(() => {return {isSorting: true, isSorted: false}});
    }
    
    async stopSort() {
        await this.unHighlightAll();
        this.setState(() => {return {isSorting: false}});
    }

    async setArray(array) {
        this.setState(() => {return {array: array}});
    }

    async unHighlightAll() {
        var highlighted = this.state.highlighted;
        Object.keys(highlighted).forEach((c) => highlighted[c] = null);
        this.setState(() => {return {highlighted: highlighted}});
    }

    async highlight(key, value) {
        var highlighted = this.state.highlighted;
        highlighted[key] = value;
        this.setState(() => {return {highlighted: highlighted}});
        
    }

    async setArrayLength(length) {
        this.setState(() => {return {arrayLength: length}});
    }

    handleArrayLengthChange(event) {
        this.setState(() => {return {tmpArrayLength: parseInt(event.target.value)}});
    }

    async handleArrayLengthSubmit(event) {
        await this.stopSort();
        await this.setArrayLength(this.state.tmpArrayLength);
        await this.setRandomArray();
        event.preventDefault();
    }

    // iterative implementation to keep track of indexes in whole array
    async quickSort() {
        await this.startSort();
        if (this.state.array.length <= 1) {
            this.setState({isSorted: true, isSorting: false});
        }
        else {
            var left = 0, right = this.state.array.length - 1;
            let stack = new Stack(right - left + 1);
            stack.push(left);
            stack.push(right);

            var array = this.state.array;
            var i, j, pivot;
            var tmp;

            while (stack.top >= 0 && this.state.isSorting === true) {
                right = stack.pop();
                left = stack.pop();

                // Hoare's partition
                pivot = left;
                await this.highlight("c1", pivot);
                await this.highlight("c2", right);
                i = left;
                j = right;
                while (i <= j && this.state.isSorting === true) {

                    await this.highlight("c3", i);
                    while (array[i] < array[pivot] && this.state.isSorting === true) {
                        i++;
                        await this.highlight("c3", i);
                        await sleep(this.state.sortAnimationSpeedMS);
                    }

                    await this.highlight("c4", j);
                    while (array[j] > array[pivot] && this.state.isSorting === true) {
                        j--;
                        await this.highlight("c4", j);
                        await sleep(this.state.sortAnimationSpeedMS);
                    }

                    if (i <= j && this.state.isSorting === true) {
                        // swap
                        tmp = array[i];
                        array[i] = array[j];
                        await this.setArray(array);
                        array[j] = tmp;
                        await this.setArray(array);
                        i++;
                        j--;
                    }
                    await sleep(this.state.sortAnimationSpeedMS);
                }

                // are there elements on the left of the pivot? if so partition them
                if (left < i - 1) {
                    stack.push(left);
                    stack.push(i - 1);
                }
                
                // are there elements on the right of the pivot? if so partition them
                if (right > i) {
                    stack.push(i);
                    stack.push(right);
                }
                await sleep(this.state.sortAnimationSpeedMS);
            }
            if (this.state.isSorting === true) {
                this.setState(() => {return {isSorted: true}});
            }
            await this.unHighlightAll();
            this.setState(() => {return {isSorting: false}});
        }   
    }

    async mergeSort() {
        await this.startSort();
        var n = this.state.array.length;

        if (n <= 1) {
            this.setState({isSorted: true, isSorting: false});
        }
        else {

            var curr_size, mid;
            var left, right;

            var array = this.state.array;

            curr_size = 1;
            while (curr_size <= n - 1 && this.state.isSorting) {
                left = 0;
                while (left < n - 1 && this.state.isSorting) {
                    mid = Math.min(left + curr_size - 1, n - 1);
                    right = Math.min(left + 2 * curr_size - 1, n - 1);
                    await this.highlight("c3", mid);
                    await this.highlight("c1", left);
                    await this.highlight("c2", right);

                    /* merge */
                    var i, j, k;
                    var n_l = mid - left + 1;
                    var n_r = right - mid;
                    var L = Array(n_l).fill(0);
                    var R = Array(n_r).fill(0);

                    // create temp left and right arrays
                    i = 0;
                    j = 0;
                    while (i < n_l && j < n_r && this.state.isSorting) {
                        L[i] = array[left + i];
                        R[j] = array[mid + 1 + j];
                        i++;
                        j++;
                        await sleep(this.state.sortAnimationSpeedMS);
                    }
                    while (i < n_l && this.state.isSorting) {
                        L[i] = array[left + i];
                        i++;
                        await sleep(this.state.sortAnimationSpeedMS);
                    }
                    while(j < n_r && this.state.isSorting) {
                        R[j] = array[mid + 1 + j];
                        j++;
                        await sleep(this.state.sortAnimationSpeedMS);
                    }

                    i = 0;
                    j = 0;
                    k = left;
                    
                    // compare left and right array elements one by one
                    // set array = smallest val of comparison
                    // then increment temp array ind for array with smallest val found
                    while (i < n_l && j < n_r && this.state.isSorting) {
                        if (L[i] <= R[j]) {
                            array[k] = L[i];
                            i++;
                        }
                        else {
                            array[k] = R[j];
                            j++;
                        }                        
                        await this.setArray(array);
                        await sleep(this.state.sortAnimationSpeedMS);
                        k++;
                    }

                    // if there are any remaining elements in temp arrays after comparison phase
                    // add them to back of array
                    while (i < n_l && this.state.isSorting) {
                        array[k] = L[i];
                        i++;
                        k++;
                        await this.setArray(array);
                        await sleep(this.state.sortAnimationSpeedMS);
                    }
                    while (j < n_r && this.state.isSorting) {
                        array[k] = R[j];
                        j++;
                        k++;
                        await this.setArray(array);
                        await sleep(this.state.sortAnimationSpeedMS);
                    }
                    /* end merge */
                    await sleep(this.state.sortAnimationSpeedMS);
                    left += 2 * curr_size
                }
                await sleep(this.state.sortAnimationSpeedMS);
                curr_size *= 2;
            }
        }
        if (this.state.isSorting === true) {
            this.setState(() => {return {isSorted: true}});
        }
        await this.unHighlightAll();
        this.setState(() => {return {isSorting: false}});
    }

    heapSort() {

    }

    async bubbleSort() {
        await this.startSort();
        var n = this.state.array.length;
        if (n <= 1) {
            this.setState(() => {return {isSorted: true, isSorting: false}});
        }
        else {
            var array = this.state.array;
            var j, i = 0;
            var tmp;
            while (i < n && this.state.isSorting === true) {
                j = 0;
                await this.highlight("c1", j);
                while (j < n - i - 1 && this.state.isSorting === true) {
                    await this.highlight("c1", j + 1);
                    if (array[j] > array[j + 1]) {
                        tmp = array[j + 1];
                        array[j + 1] = array[j];
                        await this.setArray(array);
                        array[j] = tmp;
                        await this.setArray(array);
                    }
                    j++;
                    await sleep(this.state.sortAnimationSpeedMS);
                }
                i++;
                await this.highlight("c2", n - i);
                await sleep(this.state.sortAnimationSpeedMS);
            }
            if (this.state.isSorting === true) {
                this.setState(() => {return {isSorted: true}});
            }
            await this.unHighlightAll();
            this.setState(() => {return {isSorting: false}});
        }
    }

    async bogoSort() {
        await this.startSort();
        if (isSorted(this.state.array) === true) {
            this.setState(() => {return {isSorted: true, isSorting: false}});
        }
        else {
            var step = bogoSortStep(this.state.array);
            this.setState(() => {return {array: step.array, isSorted: step.sorted}});
            await this.highlight("c1", step.highlighted);
            await sleep(this.state.sortAnimationSpeedMS);

            while (this.state.isSorted === false && this.state.isSorting === true) {
                step = bogoSortStep(step.array);
                this.setState(() => {return {array: step.array, isSorted: step.sorted}});
                await this.highlight("c1", step.highlighted);
                await sleep(this.state.sortAnimationSpeedMS);
            }
            this.setState(() => {return {isSorting: false}});
        }
    }

    render() {
        let stopSortingButton;
        if (this.state.isSorting) {
            stopSortingButton = <button onClick={() => this.stopSort()}>Stop Sorting</button>;
        }
        return (
            <div className="container">
                
                <div 
                    className="sidebar-container" 
                    style={{width: `${this.sidebarWidth}px`}}
                >
                    <ul className="sidebar">
                        <h1>Sorted Out</h1>
                        <p>A Sorting Visualizer</p>
                        <br></br>
                        <button onClick={() => this.setRandomArray()}>Reset Array</button>
                        <br></br>
                        <br></br>
                        <button onClick={() => this.quickSort()}>QuickSort</button>
                        <br></br>
                        <button onClick={() => this.mergeSort()}>MergeSort</button>
                        <br></br>
                        <button>HeapSort [TODO]</button>
                        <br></br>
                        <button onClick={() => this.bubbleSort()}>BubbleSort</button>
                        <br></br>
                        <button onClick={() => this.bogoSort()}>BogoSort!</button>
                        <br></br>
                        <br></br>
                        {stopSortingButton}
                    </ul>
                </div>

                <div>
                    <form onSubmit={this.handleArrayLengthSubmit}>
                        <label>
                            Elements
                            <input 
                                type="number" min="1" max="200"
                                value={this.state.tmpArrayLength} onChange={this.handleArrayLengthChange} 
                            />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                
                <div 
                    className="array-container"
                    style={{left: `${this.sidebarWidth}px`}}
                >
                    {
                        this.state.array.map( 
                            (value, i) => (
                                    <div 
                                        className="array-bar" 
                                        key={i}
                                        style={{
                                            width: `${value}px`,
                                            backgroundColor: 
                                                (this.state.isSorted === true ? '#87Deb8' :     // green
                                                (i === this.state.highlighted.c1 ? '#DC143C':   // red
                                                (i === this.state.highlighted.c2 ? ' #87adde':  /* blue */ 
                                                (i === this.state.highlighted.c3 ? '#CF9FFF':   /* light violet */
                                                (i === this.state.highlighted.c4 ? '#FFFF99':   /* yellow */
                                                                                                'burlywood')))))
                                        }}
                                    >
                                    </div>
                            )
                        )
                    }
                </div>
            
            </div>
        );
    }
}
