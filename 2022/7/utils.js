// Regexes
const CD_DOWN_REGEX = /cd ([a-z\/]+)/;
const CD_UP_REGEX = /cd (\.\.)/;
const FILE_REGEX = /([0-9]+) ([a-z.]+)/;
const DIR_REGEX = /dir ([a-z]+)/;

// construct data structure to traverse
function parseFileSys(input){
    const fileSys = {};
    let dirStack = [];
    for(cmd of input){
        // Get current directory and full path
        const currentDir = dirStack[dirStack.length-1] ? String(dirStack[dirStack.length-1]) : '';
        const currentPath = dirStack.join('/');
        if(currentDir !== '' && !fileSys[currentPath]) fileSys[currentPath] = {totalFileSize: 0, dirs: []};
    
        //Parse row
        const cdInMatch = cmd.match(CD_DOWN_REGEX);
        const cdOutMatch = cmd.match(CD_UP_REGEX);
        const fileMatch = cmd.match(FILE_REGEX);
        const dirMatch = cmd.match(DIR_REGEX);
        if(cdInMatch !== null) dirStack.push(cdInMatch[1]);
        else if(cdOutMatch) dirStack.pop();
        else if(fileMatch && currentDir !== ''){
            const currentFileSize = parseInt(fileMatch[1]);
            fileSys[currentPath].totalFileSize += currentFileSize;
        }
        else if(dirMatch && currentDir !== ''){
            fileSys[currentPath].dirs.push(dirStack.join('/') + '/' + dirMatch[1]);
        }
    }
    return fileSys;
}

module.exports = {
    parseFileSys,
};