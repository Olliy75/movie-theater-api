const { Router } = require("express");
const showRouter = Router();
const {User, Show }= require("../models");

//GET all shows
showRouter.get("/", async (req, res) => {
    res.send(await Show.findAll())
});
//GET one show
///shows/5
showRouter.get("/:id", async (req, res) => {
    res.send(await Show.findByPk(req.params.id))
});
//GET shows of a particular genre (genre in req.params)
///shows/genres/Comedy
showRouter.get("/:input", async (req, res) => {
    res.send(await Show.findAll({where: {genre: req.params.input}}))
});
//PUT update rating of a show that has been watched
///shows/4/watched
showRouter.put("/", async(req, res) => {
    // await Show.addUser
    // res.send(await )
});
//PUT update the status of a show
///shows/3/updates
showRouter.put("/shows", async (req, res) => {
    // res.send(await )
});
//DELETE a show
showRouter.delete("/shows", (req, res) => {

});
//export router for use in other files
module.exports = showRouter;