const express = require('express');
const connectDB = require('./config/db')

const app = express();

connectDB();

app.use(express.json({ extended: false}));


const auth_admin = require('./middleware/auth_admin')

app.use('/api/user',auth_admin,require('./routes/api/user'))
app.use('/api/auth',auth_admin,require('./routes/api/auth'))
app.use('/api/product',auth_admin,require('./routes/api/product'))


app.use('/mob/auth',require('./routes/mob/auth'))
app.use('/mob/user',require('./routes/mob/user'))

app.use('/mob/data',require('./routes/mob/data'))

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'))
    app.get('*',(req,res)=> {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}



const PORT =  process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));