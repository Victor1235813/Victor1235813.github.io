const { time } = require('console');
const fs = require('fs');
/* create a file */
function addVisitor(fileName, req) {
    let chunks = [];
    let d = new Date();
    // req is a readable stream, the data arrives in parts/chunks
    // with an 'data' envent before and an 'end' event after.
    // add chunk to chunks when 'data' event occurs.
    req.on('data', (chunk) => {
        chunks.push(chunk);
    });
    // log data when 'end' event occurs.
    const dataObject = {};
    req.on('end', () => {
        const data = Buffer.concat(chunks);
        const queryString = data.toString();
        console.log('input string:', queryString);
        const parsedData = new URLSearchParams(queryString);
        console.log('parsed data: ', parsedData);
        for (let pair of parsedData.entries()) {
            dataObject[pair[0]] = pair[1];
            console.log('entry: ', pair);
        }

        fs.appendFileSync(fileName, '\n' + d.toUTCString() + '\n', (err) => {if (err) throw err;});

        for (let key in dataObject) {
            let fileContent = key + ' : ' + dataObject[key] + '\n';
            fs.appendFileSync(fileName, fileContent, (err) => {
                if (err) throw err;
                console.log('new visitor information saved.');
            });
        }
    });
}

module.exports = {
    addVisitor
}
    