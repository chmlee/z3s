import { onMount } from 'solid-js';

class Item {
  constructor(e) {
    const className = e.className;
    if (className == 'sub-title') {
      const item = Item.newSubtitle(e);
      return [item]
    } else if (className == 'content') {
      const nodes = Array.from(e.childNodes);
      const items = nodes.map(e => {
        if (e.localName === 'ol') {
          const lis = Array.from(e.querySelectorAll('li'));
          const items = lis.map(li => Item.newArticle(li))
          return items
        } else if (e.localName === 'h5') {
          const item = Item.newH5(e);
          return [item]
        } else {
          return []
        }
      })
      return items.flat()
    }
  }

  static newSubtitle(e) {
    const typ = 'subtitle';
    const props = { title: e.textContent };
    return { typ, props };
  }

  static newH5(e) {
    const typ = 'h5';
    const props = { title: e.innerText };
    return { typ, props };
  }

  static newArticle(e) {
    const typ = 'article';

    const id = e.className.match(/\d+/)[0]
    const ps = e.querySelectorAll('p')
    const a = ps[0].querySelector('strong>a');
    const title = a.innerText;
    const link = a.href;
    let summary = '';
    if (ps.length === 2) {
      summary = ps[1].innerText;
    }
    const props = {
      id,
      title,
      link,
      summary,
    }

    return { typ, props }

  }

};

export default function Doc(props) {


  onMount(() => {
    let doc = document.createElement('html');
    doc.innerHTML = props.raw;
    const elements = Array.from(doc.querySelectorAll('.container>div'));
    const items = elements
      .map(e => new Item(e))
      .flat()
      .filter(obj => Object.keys(obj).length > 0);
  })
}
