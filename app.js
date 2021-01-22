const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const indexRouter = require('./routes/index');

// config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('io', io);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/', indexRouter);

// server
var port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');
    io.emit('checkCount', { count: io.engine.clientsCount });
    socket.on('sendNote', (msg) => {
        io.emit('postNote', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(port, () => {
    console.log('listening on port: ' + toString(port));
});