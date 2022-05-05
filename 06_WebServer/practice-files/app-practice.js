const http = require('http');

http.createServer((req, res) => {

    // res.writeHead(200 , { 'Content-Type': 'application/json' })
    // const person = {id: 1, name: 'fernando'}
    // res.write(JSON.stringify(person))
////////////////////////////////////////////////////////////////////////
    // res.setHeader('Content-Disposition', 'attachment; filename=list.csv')
    // res.writeHead(200 , { 'Content-Type': 'application/csv' })
    // res.write('id, name\n')
    // res.write('1, Fernando\n')
    // res.write('2, Jose\n')
    // res.write('3, Pablo\n')
    // res.write('4, Jimmy\n')


    res.write('hi world')
    res.end()
})

.listen(8080);
console.log('listen port ',8080)