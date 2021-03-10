import Template from '@templates/Template.js';
import '@styles/main.css'; //se añade archivo a index.js

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
