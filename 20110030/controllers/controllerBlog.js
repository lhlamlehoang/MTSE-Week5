const {mygroup} = require('../models/models.friends');

function getAllFriend (req, res) {
    if (mygroup) {
        res.status(200).json(mygroup);
    }
    else {
        res.status(400).json({error:'Not valid'});
    }
}

function getFriendById (req, res) {
    const ID = String(req.params.friendID);
    if (isNaN(ID)) {
        // Check if the ID is not a valid number
        return res.status(400).json({ error: 'Not valid' });
    }

    const friend = mygroup.find((friend) => String(friend.id) === String(ID));
    if (friend) {
        res.status(200).json(friend);
    }
    else {
        res.status(400).json({error:'Not valid'});
    }
}

function addFriendById(req, res){
    const ID = String(req.params.friendID);
    const { name } = req.body;

    const existingFriend = mygroup.find((friend) => String(friend.id) === String(ID));

    if (existingFriend) {
        return res.status(400).json({ error: 'Not valid' });
    }

    const newFriend = 
        {
        id: String(ID),
        name: String(name)
        }
    ;

    if (newFriend) {
        mygroup.push(newFriend);
        res.status(200).json(newFriend);
    }
    else {
        res.status(400).json({error:'Not valid'});
    }
}

function getFriendByMessage(req, res){
    const message = generateMessageHtml(mygroup);
    if (mygroup) {
        res.status(200).end(message);
    }
    else {
        res.status(400).end('Not valid');
    }
}

function getFriendByMessageId(req, res){
    const ID = String(req.params.friendID);
    const friend = mygroup.find((friend) => friend.id === ID);
    if (friend) {
        const message = generateMessageHtml([friend]);
        res.status(200).end(message);
    }
    else {
        res.status(400).end('Not valid');
    }
}

// Function to generate <html> from JSON data
function generateMessageHtml(mygroup) {
    if (mygroup.length === 0) {
        return '<html><body>Not valid</body></html>';
    }
    
    const listItems = mygroup.map((friend) => `<li>${convertToUnicode(friend.name)}</li>`).join('');
    return `<html><body><ul>${listItems}</ul></body></html>`;
}
// Convert the data into unicode character
function convertToUnicode(input) {
    let unicodeString = '';
    for (let i = 0; i < input.length; i++) {
        const unicodeChar = input.charCodeAt(i).toString(16).toUpperCase();
        unicodeString += `&#x${unicodeChar};`;
    }
    return unicodeString;
}
        

module.exports = {
    getAllFriend,
    getFriendById,
    addFriendById,
    getFriendByMessage,
    getFriendByMessageId
}