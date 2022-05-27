const hbs = require('hbs')
const express = require('express')
const app = express()
const port = 8080;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
//midleWare
// Serving static content
// this is executing
app.use(express.static('public'))

// this never is gonnna execute
// app.get('/', (req, res) => {
//     res.send('Home Page Welcome')
// })
// app.get('/', (req, res) => {
//     res.send('Hola cristian')
// })


app.get('/', (req, res) => {
    res.render('home', {
        name: 'CarlosUzcategui',
        tittle: 'Node Course'
    });
})
app.get('/elements', (req, res) => {
    res.render('elements', {
        name: 'CarlosUzcategui',
        tittle: 'Node Course'
    })
})
app.get('/generic', (req, res) => {
    res.render('generic', {
        name: 'CarlosUzcategui',
        tittle: 'Node Course'
    })
})
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})