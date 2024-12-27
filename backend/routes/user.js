const express = require('express');
const Router = express.Router;
const userRouter = Router();
const { UserModel } = require("../models/user");
const Event = require("../models/event")
const { authenticateToken } = require("../middleware/auth")

userRouter.post("/register-event", authenticateToken, async (req, res) => {
    const id = req.body.id;
    const userId = req.user;
    try {
        const { events } = await UserModel.findOne({
            _id: userId
        })
        if (events.includes(id)) {
            res.status(403).json({ message: "Already registered" })
            return;
        }
        const response = await UserModel.updateOne(
            { _id: userId },
            { $push: { events: id } }
        )
        res.status(200).json({ message: "Registered for event" });
    } catch (e) {
        res.status(403).json({ message: "Unable to register " + e });
    }
})

userRouter.post("/deregister-event", authenticateToken, async (req, res) => {
    try {
        const eventId = req.body.eventId;
        const userId = req.user;

        const user = await UserModel.findOne({
            _id: userId
        })

        console.log(user.events.length)

        const events = user.events;

        if (events.includes(eventId)) {
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { $pull: { events: eventId } },
            );

            res.status(200).json({ message: "Deregistered from event successfully" });
        }


    } catch (error) {
        res.status(403).json({ message: "Unable to deregister "+error });
    }
});

userRouter.get("/my-events", authenticateToken, async (req, res) => {
    const userId = req.user;
    try {
        const { events } = await UserModel.findOne({
            _id: userId
        })
        const listEvents = [];
        for (let i=0;i<events.length; i++){
            const event = await Event.findOne({
                _id : events[i]
            })
            listEvents.push(event);
        }
      res.status(200).json({ events: listEvents });
    } catch (error) {
      res.status(403).json({ message: "Unable to fetch registered events: " + error });
    }
  });
  

module.exports = {
    userRouter: userRouter
}