var express = require('express'); //connects to other files
var partials = require('express-partials'); // https://github.com/publicclass/express-partials
var bodyParser = require('body-parser'); //connects to other files
var app = express(); //connects to other files
var fs = require('fs')

app.use(partials());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));

var articles = [
    { title: 'Bernie! Bernie!', body: '#feelthebern' },
    { title: 'Trump for change!', body: 'Make America Great Again' },
    { title: 'Brian Hague founds the Daily Planet', body: 'Wow! Amazing! Such good news!' }
];

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/articles', function(req, res) {
    res.render('articles/index', { articles: articles });
});

app.get('/articles/new', function(req, res) {
    res.render('articles/new');
});

app.get('/articles/:index', function(req, res) {
    var index = parseInt(req.params.index);
    if (index < articles.length && index >= 0) {
        res.render('articles/show', { article: articles[req.params.index] });
    } else {
        res.send('Error');
    }
});

app.post('/articles', function(req, res) {
    articles.push(req.body);
    res.redirect('/articles');
});

app.get('/about', function(req, res) {
    res.render('about');
});


app.delete('/articles/:idx', function(req, res) {
  var delIndex = req.params.idx;
  delIndex = parseInt(delIndex);
    articles.splice(delIndex,1);
  });

app.put('/animals/:idx/index', function(req, res) {
  var articleId = req.params.id;
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(animals);
  articles[articleId].h1 = req.body.h1;
  articles[articleId].p = req.body.p;
  console.log(animals);
  // Write the object back to the file
  fs.writeFileSync('./edit.ejs', JSON.stringify(articles));
  res.send({message: 'success'});
});


//locate the new text
//parse the new text
//add the new text



app.post('/articles/:idx', function(req, res) { //backend -- express route
    var articles = fs.readFileSync('./show.ejs'); //read animals file
    articles.push(req.params.idx); //push item to animals array //save animals to the data.json file //stringify is opposite of JSON.parse
    res.redirect('/articles/:index'); //redirect to the GET /animals route (index)
});



app.listen(3000, function() {
    console.log("You're listening to the smooth sounds of port 3000 in the morning");
});
