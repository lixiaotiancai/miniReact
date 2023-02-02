import React, { Component } from './miniReact/react';

export class Counter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('💧', this.props);

        return (
            <div>啦啦啦我是counter哟， 1</div>
        )
    }
}