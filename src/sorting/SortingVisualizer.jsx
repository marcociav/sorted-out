import React from 'react';
import './SortingVisualizer.css';
import { sleep, randomIntFromRange, isSorted } from './utils.js';
import { bogoSortStep } from './algos/bogosort.js'
import { partitionStep, Stack } from './algos/quicksort.js'


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            isSorted: false,
            highlighted: null,
            isSorting: false,
            arrayLength: 200,
            sortAnimationSpeedMS: 500
        };
        this.sidebarWidth = 300;
        this.background = '#3d3f42';
        
    }

    componentDidMount() {
        this.setRandomArray();
        document.body.style.background = this.background;
    }

    setRandomArray() {
        const array = [];
        for (let i= 0; i < this.state.arrayLength; i++) {
            array.push(randomIntFromRange(12, 1320));
        }
        this.setState(() => {return {array: array, isSorted: false, highlighted: null, isSorting: false}});
    }

    startSort() {
        this.setState(() => {return {isSorting: true}})
    }
    
    stopSort() {
        this.setState(() => {return {isSorting: false, highlighted: null}});
    }

    // iterative implementation to keep track of indexes in whole array
    async quickSort() {
        var left = 0, right = this.state.array.length - 1;
        let stack = new Stack(right - left + 1);
        stack.push(left);
        stack.push(right);

        var pivot;

        var array = this.state.array;
        var step;

        while (stack.top >= 0 && this.state.isSorting === true) {
            right = stack.pop();
            left = stack.pop();

            // partition phase
            pivot = Math.floor((left + right) / 2);
            let i = left,
                j = right;

            // first partition step to initialize step variable
            if (i <= j && this.state.isSorting === true) {
                step = partitionStep(array, pivot, i, j);
                this.setState(() => {return {array: step.array, highlighted: step.pivot}});
                i = step.i;
                j = step.j;
            }
            // iterate partition step
            while (i <= j && this.state.isSorting === true) {
                step = partitionStep(step.array, pivot, i, j);
                this.setState(() => {return {array: step.array, highlighted: step.pivot}});
                i = step.i;
                j = step.j;
            }

            if (left < i - 1) {
                stack.push(left);
                stack.push(i - 1);
            }

            if (right > i) {
                stack.push(i);
                stack.push(right);
            }

        }
        if (stack.top === -1) {
            this.setState(() => {return {isSorted: true}});
        }
        this.setState(() => {return {isSorting: false}});
    }

    mergeSort() {

    }

    heapSort() {

    }

    bubbleSort() {

    }

    async bogoSort() {
        if (isSorted(this.state.array) === true) {
            this.setState(() => {return {isSorted: true, isSorting: false}});
        }
        else {
            var array = this.state.array;
            var step = bogoSortStep(array);
            this.setState(() => {return {array: step.array, isSorted: step.sorted, highlighted: step.highlighted}});
            await sleep(this.state.sortAnimationSpeedMS);

            while (this.state.isSorted === false && this.state.isSorting === true) {
                step = bogoSortStep(step.array);
                this.setState(() => {
                    return {array: step.array, isSorted: step.sorted, highlighted: step.highlighted}
                });
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
                        <button onClick={() => {this.startSort(); this.quickSort()}}>QuickSort [TOTEST]</button>
                        <br></br>
                        <button>MergeSort [TODO]</button>
                        <br></br>
                        <button>HeapSort [TODO]</button>
                        <br></br>
                        <button>BubbleSort [TODO]</button>
                        <br></br>
                        <button onClick={() => {this.startSort(); this.bogoSort()}}>BogoSort!</button>
                        <br></br>
                        <br></br>
                        {stopSortingButton}
                    </ul>
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
                                                this.state.isSorted === true ? '#42f54e' :  // green
                                                (i === this.state.highlighted ? 'red': 'burlywood')
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