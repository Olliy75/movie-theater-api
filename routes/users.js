const { Router } = require("express");
const userRouter = Router();
const {User, Show }= require("../models");

//GET all users
userRouter.get("/", async (req, res) => {
    res.send(await User.findAll())
});
//GET one user
///users/1
userRouter.get("/:id", async (req, res) => {
    res.send(await User.findByPk(req.params.id))
});
//GET all shows watched by a user (user id in req.params)
///users/2/shows
userRouter.get("/:inputId/shows", async (req, res) => {
    res.send(await Show.findAll({where:{userid: req.params.inputId}}))
});
//PUT update and add a show if a user has watched it
///users/2/shows/9
userRouter.put("/:userIdInput/shows/:showIdInput", async (req, res) => {
   const user =  await User.findByPk(req.params.userIdInput)
   user.addShows(req.params.showIdInput)
    res.send("show has been added to user")
});
//export router for use in other files
module.exports = userRouter;