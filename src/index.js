import { el as m, mount, setChildren } from 'redom'
import 'minireset.css'
import './index.css'

const base64util = require('base64util')

function getDataFromSearch() {
  const s = window.location.search.substr(1)
  return s.length === 0 ? null : JSON.parse(base64util.decode(s))
}

function emitItemHeight(el) {
  return () => {
    window.parent.postMessage(el.offsetHeight, '*')
  }
}

function App() {
  const data = getDataFromSearch()
  if (data == null) return m('h1', 'Error')

  const wrapper = m('.h-100.center.mw5.flex.items-center.justify-center')
  const content = m(
    'a.flex.flex-column.br1.ma2.no-underline.card-1',
    { target: '_blank', rel: 'noopener noreferrer', href: data.url },
    [
      m('p', m('img', { src: data.image, onload: emitItemHeight(wrapper) })),
      m(
        '.pa3',
        m('h2.dark-gray.f3.mb3', data.title),
        m('p.gray.lh-copy.mb3', data.description),
        m('p.gray.lh-copy.ttu', data.domain)
      )
    ]
  )

  setChildren(wrapper, content)

  return wrapper
}

mount(document.body, App())
