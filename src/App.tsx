import React, { useCallback, useEffect, useState } from 'react';
import style from './styles/index.less';
import img from './assets/images/product.jpg';
import User from './pages/User';
import Login from './pages/Login';

const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(123);
    }, 1000);
  });
};
console.log('【App】');

const handleClick = async () => {
  const res = await getData();
  // .then(getData)
  // .then((result) => console.log(result))
  // .catch((error) => console.log(error));
  console.log(res);
};

// interface IProperties {
//   data: any;
// }

const App: React.FC = (props) => {
  // const { data, wrongs } = properties;

  return (
    <div>
      <div className={style.img1} />
      <div className={style.box} />
      <button onClick={handleClick}>click me</button>
      <User />
      <Login />
    </div>
  );
};

export default App;
