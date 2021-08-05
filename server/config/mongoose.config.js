const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chat-app-bd', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('We are connecting with database, so so cool!'))
.catch(err => console.error('Ha fallado todo oh no!!!', err))