class AppError extends Error { // AppError : class, constructor(a,b): main method, a,b : initial properties, after it normal methods, 
  constructor() { // extends: create a class as a child of another constructor
    super();   // A constructor can use the super keyword to call the constructor of the super class.
  }
  
  create(message, statusCode, statusText){ // create(): new function method
    this.message = message;
    this.statusCode = statusCode;
    this.statusText = statusText;
    return this;
  }
}
module.exports = new AppError(); // new AppError: to make new object