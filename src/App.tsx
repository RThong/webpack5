import React from 'react';
import style from './styles/index.less';
// import img from './assets/images/product.jpg';
console.log(style);

const App = () => {
  return (
    <div>
      <div className={style.img1} />

      {/* <img src={img} width="100" height="100" alt="" /> */}
    </div>
  );
};

export default App;
