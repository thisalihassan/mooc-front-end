/* MULTI COLOR
color options : 
	 'light.purple'		'dark.purple'
	 'light.blue'		  'dark.blue'
	 'light.green'		'dark.green'
	 'light.orange'		'dark.orange'
	 'light.red'		  'dark.red'

var color = 'light.purple';
if (localStorage.getItem('themeColor')) {
  color = localStorage.getItem('themeColor');
}

let render = () => {
  const css = import('./assets/css/sass/themes/gogo.' + color + '.scss').then(x => {
    const MainApp = require('./App');
  });

};
render();
*/

import "./assets/fonts/iconsmind/icomoon.ttf";
import "./assets/fonts/iconsmind/style.css";
import "./assets/fonts/simple-line-icons/css/simple-line-icons.css";
import "./assets/fonts/simple-line-icons/fonts/Simple-Line-Icons.ttf";
require("./App");
