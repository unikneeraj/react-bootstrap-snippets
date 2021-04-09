import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const parentDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const sourceDir = parentDir + '/source';

const snippetsFile =
  parentDir + '/react-bootstrap-snippets/snippets/snippets.code-snippets';

const files = [];
const snippets = {};

(function searchDir(Directory) {
  fs.readdirSync(Directory).forEach(File => {
    const Absolute = path.join(Directory, File);
    if (fs.statSync(Absolute).isDirectory()) return searchDir(Absolute);
    else return files.push(Absolute);
  });
})(sourceDir);

files.forEach(file => {
  const data = fs.readFileSync(file, {
    encoding: 'utf-8',
  });

  const fileName = path.basename(file, '.html');

  snippets[fileName] = {
    prefix: fileName,
    body: [data.replace('on-', 'on')],
  };
});

fs.writeFile(snippetsFile, JSON.stringify(snippets, null, '\t'), err => {
  if (err) throw err;
  console.log('Snippets Generated!');
});
