import React, { Component } from './miniReact/react';

let lock = false;

export class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        }
    }

    render() {
        if (!lock) {
            lock = true;
            setInterval(() => {
                this.setState({
                    count: this.state.count + 1
                })
            }, 3000);
        }

        console.log('🌲', this.state.count);

        return (
            <div>啦啦啦我是counter哟 { this.state.count }</div>
        )
    }
}