const Parser = require('rss-parser');
const parser = new Parser();

const regione = process.argv.slice(2);
const fields = ['modalita', 'data_fine', 'settore', 'rilevanza', 'regione', 'provincia', 'sindacati', 'categoria_interessata', 'data_proclamazione', 'data_ricezione'];
let arr = Array();
let obj = Object();

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

    if (regione == '') { //If no argument prints data for every region
        arr.forEach(elem => {
            console.log('Modalità: ' + elem.modalita)
            console.log('Data di fine: ' + elem.data_fine)
            console.log('Regione: ' + elem.regione)
            console.log('Provincia: ' + elem.provincia)
            console.log()
        })
    } else {
        arr.forEach(elem => { //If there is an argument prints data for region given as argument and nation wide strikes
            if (elem.regione.toLowerCase() == regione[0].toLowerCase() || elem.regione == 'Italia') {
                console.log('Modalità: ' + elem.modalita)
                console.log('Data di fine: ' + elem.data_fine)
                console.log('Regione: ' + elem.regione)
                console.log('Provincia: ' + elem.provincia)
                console.log()
            }
        })
    }
})();