const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost/list");
app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use(express.static(`${__dirname }`));
const bodyParser = require("body-parser");
const userValidator = require("./server/validators/userValidator");
const reminderValidator = require("./server/validators/reminderValidator");
const utilities = require("./server/utilities");
const reminder = require("./server/models/reminder.js");
const reminderDAO = require("./server/dao/reminderDAO.js");
const user = require("./server/models/user.js");
const userDAO = require("./server/dao/userDAO.js");
const googlecalendar = require("./server/googlecalendar/googlecalendar.js");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

let portNumber = 80;
process.argv.forEach((val, index, array) => {
    if (val === "--port") {
        portNumber = array[index + 1];
    }
});

const server = app.listen(portNumber, () => {
    console.log(`Started on port ${ portNumber}`);
    const host = server.address().address;
    const port = server.address().port;
});

const io = require("socket.io")(server);
app.post("/getRemindersByDay", async (req, res) => {
    try {
        const payload = await getUserJWT(req.body.token);
        const reminders = await reminderDAO.getByDay(req.body.currentDay, payload._id);
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json(error.message || error);
    }
});
app.get("/getNum", async (req, res) => {
    res.status(200).json({message: "you successfully fetched a message!"});
});
app.post("/getById", async (req, res) => {
    try {
        const payload = await getUserJWT(req.body.token);
        const user = await userDAO.getById(payload._id);
        if (user) {
            user.clientSecret = null;
            user.password = null;
            res.status(200).json(user);
        } else {
            res.status(500).json("User by that id doesn't exist..");
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.post("/setById", async (req, res) => {
    try {
        const payload = await getUserJWT(req.body.token);
        const response = await userDAO.update(payload._id, req.body.user);
        io.emit("profile-updated", {});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error.message || error);
    }
});

app.post("/sendReminderImmediately", async (req, res) => {
    try {
        const payload = await getUserJWT(req.body.token);
        await reminderDAO.sendReminderImmediately(payload._id, req.body._id);
        io.emit("reminders-updated", {});
        res.status(200).json({});
    } catch (error) {
        res.status(500).json(error.message || error);
    }
});
app.post("/getReminder", async (req, res) => {
    try {
        const payload = await getUserJWT(req.body.token);
        const reminderObject = await reminderDAO.getReminder(req.body._id, payload._id);
        res.status(200).json(reminderObject);
    } catch (error) {
        res.status(500).json(error.message || error);
    }
});
app.post("/deleteReminder", async (req, res) => {
    try {
        const payload = await getUserJWT(req.body.token);
        await reminderDAO.deleteReminder(payload._id, req.body._id, true);
        io.emit("reminders-updated", {});
        res.status(200).json({});
    } catch (error) {
        res.status(500).json(error.message || error);
    }
});
app.post("/newReminder", async (req, res) => {
    try {
        const payload = await getUserJWT(req.body.token);
        const reminder = req.body;
        if (reminderValidator.validateNewReminder(reminder)) {
            await reminderDAO.newReminder(payload._id, req.body);
            io.emit("reminders-updated", {});
            res.status(200).json({});
        } else {
            throw new Error("Invalid reminder");
        }
    } catch (error) {
        res.status(500).json(error.message || error);
    }
});
app.post("/setReminder", async (req, res) => {
    try {
        const payload = await getUserJWT(req.body.token);
        const reminder = req.body;
        if (reminderValidator.validateNewReminder(reminder)) {
            await reminderDAO.setReminder(payload._id, req.body);
            io.emit("reminders-updated", {});
            res.status(200).json({});
        } else {
            throw new Error("Invalid reminder");
        }
    } catch (error) {
        res.status(500).json(error.message || error);
    }
});

app.post("/getReminders", async (req, res) => {
    try {
        const payload = await getUserJWT(req.body.token);
        const reminders = await reminderDAO.getReminders(payload._id);
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json(error.message || error);
    }
});

app.post("/signup", async (req, res) => {
    try {
        const token = await userDAO.signup(req.body.username, req.body.password);
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json(error.message || error);
    }
});
app.post("/login", async (req, res) => {
    try {
        const result = await userDAO.login(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(403).json(error.message || error);
    }
});


const getUserJWT = async (jwt) => {
    try {
        if (!jwt) {
            throw new Error("No jwt provided");
        }
        const payload = await user.verifyToken(jwt);
        return payload;
    } catch (error) {
        console.log("jwt tampered ", error);
        throw new Error("jwt tampered");
    }
};
