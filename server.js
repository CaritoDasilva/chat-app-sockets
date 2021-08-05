
const express = require('express');
const app = express();
const port = 8000; 
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config()
console.log("🚀 ~ file: server.js ~ line 9 ~ process.env", process.env.SECRET_KEY)
require('./server/config/mongoose.config');

app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json(), express.urlencoded({extended: true}));

const userRoutes = require('./server/routes/user.routes');
userRoutes(app);

const server = app.listen(port, () => console.log(`Ey ninjas the server is running in the port ${port}`));

const socketsEvents = require('./server/controllers/sockets.controller');

socketsEvents.socketEvents(server, cors);