import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const parentDirPath = path.dirname(
  path.dirname(fileURLToPath(import.meta.url))
);

const sourceDirPath = parentDirPath + '/source';

const snippetsFile =  parentDirPath + '/react-bootstrap-snippets/snippets/snippets.code-snippets';


const files  = [];
const snippets = {};

(function searchDir(Directory)  {
    fs.readdirSync(Directory).forEach(File => {
        const Absolute = path.join(Directory, File);
        if (fs.statSync(Absolute).isDirectory()) return searchDir(Absolute);
        else return files.push(Absolute);
    });
})(sourceDirPath)


files.forEach(file => {

    const data = fs.readFileSync(file, {
        encoding: 'utf-8'
    });
   
        const fileName = path.basename(file, '.html');
       
         snippets[fileName] = {
             prefix : fileName,
             body : [data]
         };

})

fs.writeFile(snippetsFile, JSON.stringify(snippets, null, '\t'), (err)=> {
    if(err) throw err;
    console.log('Snippets Generated!');
})
