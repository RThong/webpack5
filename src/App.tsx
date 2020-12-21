import React, { useCallback, useEffect, useState } from 'react';
import style from './styles/index.less';
import img from './assets/images/product.jpg';

const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(123);
    }, 1000);
  });
};

const handleClick = async () => {
  const res = await getData();
  // .then(getData)
  // .then((result) => console.log(result))
  // .catch((error) => console.log(error));
  console.log(res);
};

function App() {
  return (
    <div>
      <div className={style.img1} />
      <div className={style.box} />
      <button onClick={handleClick}>click me</button>
    </div>
  );
}

export default App;
