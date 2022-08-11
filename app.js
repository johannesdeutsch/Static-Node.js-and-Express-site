const express = require('express');
const { projects } = require('./data/data.json');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use('/static', express.static('public'));
// tells express to use pug
app.set('view engine', 'pug');


app.get('/', (req, res) => {
    res.render('index');
    res.locals = data.projects;
});

app.get('/about', (req, res) => {
    res.render('about');
    
});


app.post('/projects/:id', (req, res, next) => {
    const project = projects[req.params.id];
    if (project) {
        res.render('project', {
        project});
    } 
}); 

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    err.message = 'Sorry! The page does not exist unfortunately.'
    console.log(err.message);
    console.log(err.status);
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);

});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');

});