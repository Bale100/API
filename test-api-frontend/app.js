fetch("http://127.0.0.1:3000/api/courses/")
.then((res)=> res.json())
  .then((data1) => {
    console.log(data1);
  })
  fetch("http://127.0.0.1:3000/api/users/")
.then((res)=> res.json())
  .then((data2) => {
    console.log(data2);
  })
