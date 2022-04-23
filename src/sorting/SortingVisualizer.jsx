import React from 'react';
import './SortingVisualizer.css';
import { randomIntFromRange, isSorted } from './utils.js';
import { bogoSortStep } from './algos/bogosort.js'


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            isSorted: false,
            // highlighted: [],
            isSorting: false,
            sortAnimationSpeedMS: 100
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
        for (let i= 0; i < 200; i++) {
            array.push(randomIntFromRange(12, 1320));
        }
        this.setState({array: array, isSorted: false, /*highlighted: [],*/ isSorting: false});
    }

    quickSort() {

    }

    mergeSort() {

    }

    heapSort() {

    }

    bubbleSort() {

    }

    bogoSort() {
        this.setState({isSorting: true});
        if (isSorted(this.state.array) == true) {
            console.log(this.state);
            this.setState({isSorted: true, isSorting: false});
            console.log(this.state);
        }
        else {
            let step = bogoSortStep(this.state.array);
            while (this.state.isSorted === false && this.state.isSorting === true) {
                step = bogoSortStep(step.array);
                console.log(step);
                this.setState({array: step.array, isSorted: step.sorted /*, highlited: step.highlighted*/});
                console.log(this.state);
            }
            this.setState({isSorting: false, isSorted: true});
        }
        
    }

    stopSort() {
        this.setState({isSorting: false});
    }

    render() {
        const {array} = this.state;
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
                        <button>QuickSort [TODO]</button>
                        <br></br>
                        <button>MergeSort [TODO]</button>
                        <br></br>
                        <button>HeapSort [TODO]</button>
                        <br></br>
                        <button>BubbleSort [TODO]</button>
                        <br></br>
                        <button onClick={() => this.bogoSort()}>BogoSort! [TODO]</button>
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
                        array.map( 
                            (value, i) => (
                                    <div 
                                        className="array-bar" 
                                        key={i}
                                        style={{
                                            width: `${value}px`,
                                            // backgroundColor: 
                                                // this.isSorted === true ? 'green' :
                                                // (this.highlighted.includes(i) === true ? 'red': 'burlywood')
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