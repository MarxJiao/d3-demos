import './index.less';
import { files } from '../../files.js';


console.log(files);

const pages = document.getElementById('pages');

const ul = document.createElement('div');
ul.setAttribute('class', 'panel panel-default')

for (let file of files) {
    if (file === 'index') break;
    let li = document.createElement('div');
    li.setAttribute('class', 'panel-body')
    console.log(li)
    li.innerHTML = '<a href="' + file + '.html" target="_blank">' + file + '</a>';
    ul.appendChild(li);
}

pages.appendChild(ul);