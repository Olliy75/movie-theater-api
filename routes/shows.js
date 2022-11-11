const { Router } = require("express");
const showRouter = Router();
const {User, Show }= require("../models");
const { param, body, validationResult } = require('express-validator')

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
showRouter.get("/genres/:input", async (req, res) => {
    res.send(await Show.findAll({where: {genre: req.params.input}}))
});
//PUT update rating of a show that has been watched
///shows/4/watched
showRouter.put("/:showInput/watched",
body("rating").isLength({min: 1}), 
async (req, res) => {
    const errors  = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).send({errors:errors.array()})
    }
    const toBeUpdated = await Show.findByPk(req.params.showInput)
    await toBeUpdated.update({rating: req.body.rating})
    res.send("rating has been updated")
});
//PUT update the status of a show
///shows/3/updates
showRouter.put("/:showInput/updates",
async (req, res) => {
    const showToUpdate = await Show.findByPk(req.params.showInput)
    if (showToUpdate.status === "cancelled"){
        showToUpdate.status = "on-going"
    }
    else
    {
        showToUpdate.update({status: "cancelled"})
    }
    res.send("status updated")
});
//DELETE a show
showRouter.delete("/:input", async (req, res) => {
    const showToDestroy = await Show.findByPk(req.params.input)
    showToDestroy.destroy()
    res.send("delete has been successfull")
});
//export router for use in other files
module.exports = showRouter;