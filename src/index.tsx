import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'antd/dist/antd.css';

// 局部热更新
if (module?.hot) {
  module.hot.accept();
}

ReactDOM.render(<App />, document.querySelector('#root'));
