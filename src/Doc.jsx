import { onMount, createSignal } from 'solid-js';
import { SortableList } from './SortableList.jsx';

import style from './Doc.module.css';

class Node {
  constructor(typ, id, props) {
    this.typ = typ;
    this.id = id;
    this.props = props;
  }

  static from(e) {
    const className = e.className;
    if (className == 'sub-title') {
      const node = Node.newSubtitle(e);
      return [node]
    } else if (className == 'content') {
      const children = Array.from(e.childNodes);
      const nodes = children.map(e => {
        if (e.localName === 'ol') {
          const lis = Array.from(e.querySelectorAll('li'));
          const nodes = lis.map(li => Node.newArticle(li))
          return nodes
        } else if (e.localName === 'h5') {
          const node = Node.newH5(e);
          return [node]
        } else {
          return [null]
        }
      })
      return nodes.flat()
    }
  }

  toNode() {
    return (
      <div>{this.typ}</div>
    )
  };

  static newSubtitle(e) {
    const typ = 'subtitle';
    const id = e.textContent;
    const props = { title: e.textContent };
    const node = new Node(typ, id, props)
    return node;
  }

  static newH5(e) {
    const typ = 'h5';
    const id = e.innerText;
    const props = { title: e.innerText };
    const node = new Node(typ, id, props)
    return node;
  }

  static newArticle(e) {
    const typ = 'article';
    const id = e.className.match(/\d+/)[0]
    const ps = e.querySelectorAll('p')
    const a = ps[0].querySelector('strong>a');
    const title = a.innerText;
    const allText = ps[0].innerText
    const media = allText.substring(title.length)
    const link = a.href;
    let summary = '';
    if (ps.length === 2) {
      summary = ps[1].innerText;
    }
    const props = {
      id,
      title,
      media,
      link,
      summary,
    }
    const node = new Node(typ, id, props)

    return node 
  }

  toDom() {
    if (this.typ === 'h5') {
      return (
        <h5 className="itemRoot">
          <strong>
            {this.props.title}
          </strong>
        </h5>
      )
    } else if (this.typ === 'article') {
      return (
        <div className="itemRoot">
          <li>
            <p className={style.title}>
              <strong>
                <a href={this.props.link} style={{color: "black"}}>
                  {this.props.title}
                </a>
                {this.props.media}
              </strong>
            </p>
          </li>
          <p className={style.summary}>
            {this.props.summary}
          </p>
        </div>
      )
    } else if (this.typ === 'subtitle') {
      return <div className={`itemRoot ${style.subtitle}`}>{this.props.title}</div>
    }
  }

};

export default function Doc(props) {

  const [ nodes, setNodes ] = createSignal([]);

  onMount(() => {
    let doc = document.createElement('html');
    doc.innerHTML = props.raw;
    const elements = Array.from(doc.querySelectorAll('.container>div'));
    const newNodes = elements
      .map(e => Node.from(e))
      .flat()
      .filter(node => true && node)
    setNodes(newNodes)
  })

  return (
    <ul>
      <SortableList items={nodes()}/>  
    </ul>
  )
}
