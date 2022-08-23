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
    if (projects[req.params.id]) {
        res.render('project', {project: projects[req.params.id]
        });
    } else {
        next();
    }
})


//404 error handler

app.use((req, res, next) => {
    const err = new Error('Not Found');
    res.status = 404;
    err.message = 'Sorry! The page does not exist unfortunately.'
    console.error(err.message, err);
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
    console.log(err.message, err);
    next(err);
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});