require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


/*Database Connection*/
let mongoose = require('mongoose')
let uri = 'mongodb+srv://Florence:wisdom123@cluster0.77xx5.mongodb.net/Florence?retryWrites=true&w=majority'

mongoose.connect(uri,
 {useNewUrlParser: true,useUnifiedTopology: true});

let urlSchema = new mongoose.Schema({
original : {type: String, required: true},
short: Number
})

let Url = mongoose.model('Url', urlSchema)

let responseObject = {}
let bodyParser = require('body-parser')
app.post('api/shorturl/new', app.use(bodyParser.urlencoded({ extended: false })), (request, response) => {
  let inputUrl = request.body['url']
  responseObject['original_url'] = inputUrl

response.json(responseObject)
})