import style from './App.module.css';
import { Show, createSignal, onMount } from 'solid-js';

import Doc from './Doc';

const extractDate = (text) => {
  let e = document.createElement('html');
  e.innerHTML = text;
  const line = e.querySelector(".date");
  const date_zh = line.textContent.split(' ')[0];
  // convert date to format `yyyy-mm-dd`
  const date = date_zh.substring(0, 4) + '-' + date_zh.substring(5, 7) + '-' + date_zh.substring(8, 10)
  return date
}


const App = () => {

  const [rawHtml, setRawHtml] = createSignal('');

  onMount(() => {
    const today = new Date().toISOString().split('T')[0]
    const value = localStorage.getItem(today);
    if (value) {
      setRawHtml(value)
    } else {
      setRawHtml('')
    }
  });

  const updateFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      //const date = extractDate(content);
      //localStorage.setItem(date, content);
      const today = new Date().toISOString().split('T')[0]
      localStorage.setItem(today, content);
      setRawHtml(content)
    };
    reader.readAsText(e.target.files[0]);
  }

  return (
    <div class={style.App}>
      <input
        id="file-input"
        type="file"
        accept=".html,.htm"
        onChange={updateFile}
      />
      <Show
        when={rawHtml() !== ''}
      >
        <Doc raw={rawHtml()}></Doc>
      </Show>
    </div>
  );
};

export default App;
