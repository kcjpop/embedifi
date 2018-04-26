import { el as m, mount, setChildren, setAttr } from 'redom'
const base64util = require('base64util')

function App() {
  const state = {
    url: 'https://hikerlust.com/mot-minh-lac-giua-seoul-6-ngay-5-dem-phan-1',
    domain: 'hikerlust.com',
    title: 'Một mình lạc giữa Seoul: 6 ngày 5 đêm mới tìm thấy lối ra (Phần 1)',
    description:
      'Dưới đây là lịch trình 6 ngày 5 đêm siêu chi tiết mà bạn hoàn toàn có thể tham khảo tuy nhiên chắc chắn một điều là thực tế sẽ còn phụ thuộc vào rất nhiều thứ như sở thích, thời tiết hay đơn giản là cái duyên.',
    image: 'https://res.cloudinary.com/hikerlust/image/upload/v1522940256/Gyeongbokgung-Palace-1-3_isfcvi.jpg'
  }

  const iframe = m('iframe', { width: '100%', frameborder: 0, height: 490 })

  const code = m('textarea.w-100.mv2.pa3.br2.ba.b--moon-gray.code', {
    rows: 10,
    placeholder: 'Embed code will appear here'
  })

  const doUpdateInput = e => {
    state[e.currentTarget.name] = e.currentTarget.value
  }

  const doUpdateIframe = e => {
    e.preventDefault()
    const payload = base64util.encode(JSON.stringify(state))
    const src = `https://embed.hikerlust.com/?${payload}`
    setAttr(iframe, { src })
    setAttr(code, {
      value: `<iframe frameborder="0" width="100%" height="490" src="${src}"></iframe>`
    })
  }

  return m(
    '.mw8-ns.center.sans-serif',
    m('h1.f3.ttu', 'Embed form'),
    m(
      '.flex',
      m(
        '.w-50',
        m(
          'form.w-100.flex.flex-column',
          { onsubmit: doUpdateIframe },
          m('input.mv2.pa3.br2.ba.b--moon-gray', {
            name: 'url',
            value: state.url,
            required: false,
            placeholder: 'URL, e.g. https://hikerlust.com/song-sot-o-san-bay-quoc-te-kuala-lumpur-klia-malaysia/',
            oninput: doUpdateInput
          }),
          m('input.mv2.pa3.br2.ba.b--moon-gray', {
            name: 'domain',
            value: state.domain,
            required: false,
            placeholder: 'Domain, e.g. hikerlust.com',
            oninput: doUpdateInput
          }),
          m('input.mv2.pa3.br2.ba.b--moon-gray', {
            name: 'image',
            value: state.image,
            required: false,
            placeholder: 'URL to cover image',
            oninput: doUpdateInput
          }),
          m('input.mv2.pa3.br2.ba.b--moon-gray', {
            name: 'title',
            value: state.title,
            required: false,
            placeholder: 'Title, e.g. Tới Malaysia, đừng chỉ ở Kuala Lumpur mà hãy ghé Genting và Penang',
            oninput: doUpdateInput
          }),
          m('textarea.mv2.pa3.br2.ba.b--moon-gray', {
            rows: 5,
            name: 'description',
            value: state.description,
            required: false,
            placeholder: 'Summary',
            oninput: doUpdateInput
          }),
          m('button.pa3.bg-dark-gray.gold.bn.ttu.tracked.pointer', { type: 'submit' }, 'Get code')
        )
      ),
      m('.w-50', iframe)
    ),
    code
  )
}

mount(document.body, App())
