const express = require("express");
const router =new express.Router();
const controllers = require("../Controllers/userControllers");

// routes
router.post("/user/register", controllers.userpost);
router.get("/user/getAlluser",controllers.getUsers);
router.get("/user/singleuser/:id", controllers.getSingleUser)
router.delete("/user/deleteuser/:id",controllers.deleteuser);
router.put("/user/updateuser/:id",controllers.updateUser);




// *********************************
module.exports = router;