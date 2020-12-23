import React from 'react';
console.log('【user】');

class B {}
const b = new B();

console.log(b, B);

const User = () => {
  return <div>User</div>;
};

export default User;
