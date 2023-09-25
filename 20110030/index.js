const express = require('express');
const app = express();
const PORT = 5000;

const {mygroup} = require('./models/models.friends');
const {getAllFriend} = require('./controllers/controllers.friendcontroller');
const {getFriendById} = require('./controllers/controllers.friendcontroller');
const friendReq = require('./routes/routes.friends');

app.use(express.json());


app.use((req,res,next)=> {
    console.log(`${req.method} ${req.url}`);
    next();
});


app.post('/friend',((req,res)=> {
    console.log(`${req.body}`);
    if (!req.body.name) {
        return res.status(400).json({
            error:'Must have username'
        });
    }
    const friend = {name: req.body.name,id:mygroup.length};
    mygroup.push(friend);
    res.status(200).json(friend);
}))


app.use('/', friendReq);
app.use('/message', friendReq);
app.use('/message/:friendID', friendReq);
app.use('/20110030/:friendID', friendReq);

app.listen(PORT);