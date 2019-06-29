const express = require('express');
const bodyparser = require('body-parser');
const route = require('./routes/routing');
const cors =  require('cors');

const app = express();

app.use(cors());
app.use(bodyparser.json());

const PORT = 3000;

app.use('/api', route);
app.get('/', (req,res) => {
    res.send('hello from server');
});

app.listen(PORT, ()=> console.log('server listening to localhost:'+PORT));

