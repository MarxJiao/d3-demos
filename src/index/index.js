import './index.less';
import { files } from '../../files.js';


console.log(files);

const pages = document.getElementById('pages');

const ul = document.createElement('ul');

for (let file of files) {
    if (file === 'index') break;
    let li = document.createElement('li');
    console.log(li)
    li.innerHTML = '<a href="' + file + '.html">' + file + '</a>';
    ul.appendChild(li);
}

pages.appendChild(ul);