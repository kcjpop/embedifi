import { el as m, mount, setChildren } from 'redom'
import 'minireset.css'
import './index.css'

const base64util = require('base64util')

const data = {
  url: 'https://tuoitre.vn/may-bay-no-dong-co-giua-khong-trung-hanh-khach-bi-hut-ra-cua-so-20180418091055045.htm',
  domain: 'tuoitre.vn',
  title: 'Máy bay nổ động cơ giữa không trung, hành khách bị hút ra cửa sổ',
  description:
    'TTO - Một hành khách đã bị hút nửa người ra khỏi cửa sổ và thiệt mạng sau khi động cơ máy bay của hãng Southwest Airlines bất ngờ nổ tung giữa trời ngày 17-4 (giờ Mỹ).',
  image: 'https://cdn.tuoitre.vn/thumb_w/1200/2018/4/18/photo1524017514129-15240175141291673641385.jpg'
}

console.log(base64util.encode(JSON.stringify(data)))

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

  const wrapper = m('.db.center.mw5')
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
