import React, { Component } from 'react';

class Counters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: [{ id: 1, value: 0 }, { id: 2, value: 0 }, { id: 3, value: 0 }, { id: 4, value: 0 }, { id: 5, value: 0 }],
            totalSum: 0,
            avrage: 0,
            maximum: 0,
            minimum: 0
        }
    }
    
    /**
     * 
     * @param {*} id :contains the id of the control
     * @param {*} fun :contains the type of functionality i.e increment or decrement 
     */
    maxOrMinFunction = (id,fun ) => {
        const index = this.state.counter.findIndex(count => {
            return count.id === id
        })

        const count = Object.assign({}, this.state.counter[index]);

        //if fun is 'inc' increment the value else decrement the value
        if(fun==="inc")
            count.value = count.value + 1;
        else     
            count.value = count.value - 1;

        const counter = Object.assign([], this.state.counter);
        counter[index] = count;

        this.setState(
            { counter },
            () => {
                this.utilFunction();
            }
        );
    }

    /**
     * this method is used to get the sum, max, min, avrage of the counter
     */
    utilFunction = () => {
        const sum = this.state.counter.map(p=> p.value).reduce((prev, next) => prev + next);
        const max = Math.max.apply(Math, this.state.counter.map(function(o) { return o.value; }))
        const min = Math.min.apply(Math, this.state.counter.map(p=> p.value))

        const avg = sum/5;

        this.setState({
            totalSum:sum,
            avrage:avg,
            maximum:max,
            minimum:min
        });
    }

    render() {
        return (
            <>
                  <ul style={{listStyleType:"none"}}>{
                    this.state.counter.map(item => {
                        return(
                            <li key={item.id}>
                                <button key={"inc" + item.id} onClick={() => { this.maxOrMinFunction(item.id,'inc') }}> + </button> &nbsp;
                                <button key={"dec" + item.id} onClick={() => { this.maxOrMinFunction(item.id,'dec') }}> - </button> &nbsp;
                                 <label key={"lbl" + item.id}> Counter-{item.id}: {item.value} </label> <br />
                            </li>
                        )
                    }
                    )
                }
                </ul>
                Total Sum:{this.state.totalSum} <br/>
                avrage:{this.state.avrage} <br/>
                Max: {this.state.maximum} <br/>
                Min:{this.state.minimum}
            </>
        );
    }
}

export default Counters;