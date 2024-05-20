const appErorr = require("../utilities/appErorr");
const httpStatusText = require("../utilities/httpStatusText");
module.exports = (... roles)=>{ // ... thread operator: by7wl el params to array
  console.log("roles", roles)
  return (req, res, next)=>{
    if(!roles.includes(req.currentUser.role)){
      return next(appErorr.create("this role is not authorized", 401, httpStatusText.FAIL));
    }
    next();
  }
}