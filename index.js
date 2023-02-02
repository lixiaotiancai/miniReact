import React from './miniReact/react';
import ReactDOM from './miniReact/reactDom';
import App from './App';

import './index.css';

ReactDOM.render(<App test={'我是App的props'} />, document.getElementById('root'));