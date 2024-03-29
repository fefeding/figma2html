const fs = require('fs');
const path = require('path');
const Converter = require('../dist/index.js');

console.log(Converter);
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../example/bg.json'),'utf8'));
Converter.convert(data).then((res) => {
    const p = path.join(__dirname, '../example/bg_dom.json');
    fs.writeFileSync(p, JSON.stringify(res), 'utf8');
    console.log(res);
});
