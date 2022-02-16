const express = require('express')
const app = express()
const port = process.env.PORT || 80 //If a port is specified by the host (Heroku, Glitch...) use that, otherwise use 80. Will use 80 if ran locally

const Parser = require('rss-parser');
const parser = new Parser();

const fields = ['modalita', 'data_fine', 'settore', 'rilevanza', 'regione', 'provincia', 'sindacati', 'categoria_interessata', 'data_proclamazione', 'data_ricezione'];
let arr = Array();
let obj = Object();

app.get('/', (req, res) => { //Entire feed: every region + nation wide
    (async() => {
        let feed = await parser.parseURL('http://scioperi.mit.gov.it/mit2/public/scioperi/rss') //Requesting Ministry's dataset

        feed.items.forEach(instance => { //For each RSS entry (every entry is a strike)
            obj = {}
            instance.content.split('<br/>').forEach((field, j) => { //For each row in the 'content' field
                let temp = field.split(':', 1)
                let out = field.replace(temp, '').substring(2) //Purge field title, just keep the data
                if (out[0] == ' ') out = out.substring(1) //Purge any extra spaces before the data

                obj[fields[j]] = out //Save current row in object, with the corresponding title
            })
            arr.push(obj) //Push object in object array
        });

        console.log(`Answering request for entire feed.`)
        res.send(arr)
        arr = []
    })();
})

app.get('/:arg([a-zA-Z]+)', (req, res) => { //Regional feed: specific region + nation wide
    (async() => {
        let feed = await parser.parseURL('http://scioperi.mit.gov.it/mit2/public/scioperi/rss') //Requesting Ministry's dataset

        feed.items.forEach(instance => { //For each RSS entry (every entry is a strike)
            obj = {}
            instance.content.split('<br/>').forEach((field, j) => { //For each row in the 'content' field
                let temp = field.split(':', 1)
                let out = field.replace(temp, '').substring(2) //Purge field title, just keep the data
                if (out[0] == ' ') out = out.substring(1) //Purge any extra spaces before the data

                obj[fields[j]] = out //Save current row in object, with the corresponding title
            })
            if (obj.regione.toLowerCase() == req.params.arg.toLowerCase() || obj.regione == 'Italia') //If current strike takes place in requested region...
                arr.push(obj) //Push object in object array
        });

        console.log(`Answering request for ${req.params.arg}.`)
        res.send(arr)
        arr = []
    })();
})

app.get('/:arg([!][a-zA-Z]+)', (req, res) => { //Strict regional feed: specific region only (does NOT include nation wide)
    (async() => {
        let feed = await parser.parseURL('http://scioperi.mit.gov.it/mit2/public/scioperi/rss') //Requesting Ministry's dataset

        feed.items.forEach(instance => { //For each RSS entry (every entry is a strike)
            obj = {}
            instance.content.split('<br/>').forEach((field, j) => { //For each row in the 'content' field
                let temp = field.split(':', 1)
                let out = field.replace(temp, '').substring(2) //Purge field title, just keep the data
                if (out[0] == ' ') out = out.substring(1) //Purge any extra spaces before the data

                obj[fields[j]] = out //Save current row in object, with the corresponding title
            })
            if (obj.regione.toLowerCase() == req.params.arg.slice(1).toLowerCase()) //If current strike takes place in requested region...
                arr.push(obj) //Push object in object array
        });

        console.log(`Answering request for ${req.params.arg.slice(1)} strictly.`)
        res.send(arr)
        arr = []
    })();
})

app.listen(port)