import { el as m, mount } from 'redom'
import 'minireset.css'
import './index.css'

const data = {
  url: 'https://hikerlust.com/am-thuc-hoi-an-nhung-mon-ngon-khong-the-choi-tu-noi-pho-hoi',
  domain: 'hikerlust.com',
  title: 'Ẩm thực Hội An - những món ngon không thể chối từ nơi phố Hội',
  description:
    'Nên chăng, nếu có ghé qua Hội An thì đừng quên ghé lại những hàng quán nhỏ xinh để thưởng thức cho tới tận cùng. ',
  image:
    'https://res.cloudinary.com/hikerlust/image/upload/v1523636091/15138552_10209750781958219_5517654460475676022_o_d4jwuf.jpg'
}

function App(data) {
  return m(
    'a.flex.flex-column.br1.mw6.no-underline.card-3',
    { target: '_blank', rel: 'noopener noreferrer', href: data.url },
    [
      m('p', m('img', { src: data.image })),
      m(
        '.pa3',
        m('h2.dark-gray.f3.mb3', data.title),
        m('p.gray.lh-copy.mb3', data.description),
        m('p.gray.lh-copy.ttu', data.domain)
      )
    ]
  )
}

mount(document.body, App(data))
