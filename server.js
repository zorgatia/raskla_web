const express = require('express');
const connectDB = require('./config/db')
const path = require('path')

const app = express();



connectDB();

app.use(express.json({ extended: false}));
app.use(function(req,res,next){
	
	res.header ("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X Requested-with, Content-Type,Accept");
	next();
})

app.use('/api/user',require('./routes/api/user'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/product',require('./routes/api/product'))
app.use('/api/vending',require('./routes/api/vending'))


app.use('/mob/auth',require('./routes/mob/auth'))
app.use('/mob/user',require('./routes/mob/user'))
app.use('/mob/data',require('./routes/mob/data'))
app.use('/mob/vending',require('./routes/mob/vending'))

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'))
    app.get('*',(req,res)=> {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT =  process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));

const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
});
