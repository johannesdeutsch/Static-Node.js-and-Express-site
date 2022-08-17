const express = require('express');
const { projects } = require('./data/data.json');

const app = express();

app.use('/static', express.static('public'));

// tells express to use pug
app.set('view engine', 'pug');


//index route

app.get('/', (req, res, next) => {
    res.render('index', { projects });
    next();
});


// about route

app.get('/views/about', (req, res, next) => {
    res.render('about');
    next();
});


// project route

app.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find(({id}) => id === +projectId);
    if (project) {
        res.render('project', {
        project});
    } else {
        const err = new Error();
        res.status(404);
        res.message = 'Sorry, this page does not exist unfortunately.'
        console.log(err.message);
        next(err);
    }
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