import React from 'react';
import { Counter } from './Counter';

export default function App(props) {
    console.log('💧', props);

    return (
        <div>
            <p>123</p>
            <Counter test={'我是Counter的props'}/>
        </div>
    )
}