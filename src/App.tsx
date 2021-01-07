import React from 'react';
import User from './pages/User';
import Login from './pages/Login';

import style from './styles/index.less';

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

      <User />
      <Login />
    </div>
  );
};

export default App;
