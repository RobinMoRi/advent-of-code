const path = require('path');
const fs = require('fs');

function syncReadFile(filename) {
    return fs.readFileSync(filename, 'utf8')
            .toString()
            .trim()
            .split('\n')
}

module.exports = {
	syncReadFile,
};