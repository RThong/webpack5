// import "./index.css";
import './index.less';
import './iconfont.css';
const a = 12;
const b = 1;

const aaa = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log('!!!!!!!!!!!!!!!!!');
      resolve();
    }, 3000);
  });

const main = async () => {
  await aaa();
  console.log('@@@@@@@@@@@');
};

main();

console.log(a + b);
