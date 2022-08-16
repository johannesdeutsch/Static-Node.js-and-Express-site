const express = require('express');
const { projects } = require('./data/data.json');

const app = express();

app.use('/static', express.static('public'));
// tells express to use pug
app.set('view engine', 'pug');


app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
    
});


app.post('/data/:id', (req, res, next) => {
    const project = data[req.params.id];
    if (project) {
        res.render('project', {
        project});
    } 
}); 






app.use((req, res, next) => {
    const err = new Error('Not Found');
    res.status(404);
    res.message = 'Sorry! The page does not exist unfortunately.'
    console.log(err.message);
    console.log(err.status);
    next(err);
});




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