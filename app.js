const express = require('express');
const { projects } = require('./data/data.json');

const app = express();

app.use('/static', express.static('public'));
// tells express to use pug
app.set('view engine', 'pug');


app.get('/', (req, res, next) => {
    res.render('index', { projects });
    next();
});

app.get('/views/about', (req, res, next) => {
    res.render('about');
    next();
});


app.post('/data/data/:projects/:project/:id', (req, res, next) => {
    const project = data[req.params.id];
    if (project) {
        res.render('project', {
        project});
    } 
    next();
}); 




//404 error handler

app.use((req, res, next) => {
    const err = new Error('Not Found');
    res.status(404);
    res.message = 'Sorry! The page does not exist unfortunately.'
    console.log(err.message);
    console.log(err.status);
    next(err);
});


//global error handler

app.use((err, req, res, next) => {
    if(err.status === 404) {
        res.status(404);
    } else {
        err.message = err.message || 'Oops!! Sorry, there is probably an issue with the server';
        res.status(err.status || 500);
    }
    console.log(err.message);
    console.log(err.status);
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');

});