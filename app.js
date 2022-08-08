const express = require('express');
const { projects } = require('../data.json');

const app = express();

// tells express to use pug
app.set('view engine', 'pug');


app.use((req, res, next) => {
    console.log('One');
    next();
});


app.get('/', (req, res) => {
    res.render('index');
    res.locals = data.projects;
});

app.get('/about', (req, res) => {
    res.render('about');
    
});


router.get('/project', (req, res) => {
    res.render('project', {
        project: projects[req.params.id]
    })
});




app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');

});