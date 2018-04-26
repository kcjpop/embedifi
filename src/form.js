import m from 'mithril'
const base64util = require('base64util')

function App(vnode) {
  const oninit = () => {
    vnode.state = {
      frameSrc: null,
      frameCode: null,
      item: {
        url: 'https://hikerlust.com/mot-minh-lac-giua-seoul-6-ngay-5-dem-phan-1',
        domain: 'hikerlust.com',
        title: 'Một mình lạc giữa Seoul: 6 ngày 5 đêm mới tìm thấy lối ra (Phần 1)',
        description:
          'Dưới đây là lịch trình 6 ngày 5 đêm siêu chi tiết mà bạn hoàn toàn có thể tham khảo tuy nhiên chắc chắn một điều là thực tế sẽ còn phụ thuộc vào rất nhiều thứ như sở thích, thời tiết hay đơn giản là cái duyên.',
        image: 'https://res.cloudinary.com/hikerlust/image/upload/v1522940256/Gyeongbokgung-Palace-1-3_isfcvi.jpg'
      }
    }
  }

  const doUpdateInput = e => {
    vnode.state.item[e.currentTarget.name] = e.currentTarget.value
  }

  const buildIframe = () => {
    const payload = base64util.encode(JSON.stringify(vnode.state.item))
    const src = `https://embed.hikerlust.com/?${payload}`

    vnode.state.frameSrc = src
    vnode.state.frameCode = `<iframe frameborder="0" width="100%" height="490" src="${src}"></iframe>`
  }

  const doUpdateIframe = e => {
    e.preventDefault()
    buildIframe()
  }

  const doFetch = e => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    vnode.state.loading = true

    m
      .request({
        url: 'https://embedifi-zntjksgyzn.now.sh/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: { url: form.get('url') }
      })
      .then(data => (vnode.state = Object.assign({}, vnode.state, { item: data, loading: false })))
      .then(buildIframe)
  }

  const view = () => {
    const { frameSrc, frameCode, item } = vnode.state

    return m(
      '.mw8-ns.center.sans-serif',
      m(
        'form.flex.w-100.justify-between.items-center',
        { onsubmit: doFetch },
        m('input.mv2.pa3.br2.ba.b--moon-gray.w-100', {
          name: 'url',
          placeholder: 'e.g. https://hikerlust.com/am-thuc-hoi-an-nhung-mon-ngon-khong-the-choi-tu-noi-pho-hoi'
        }),
        m(
          '.ml3',
          m(
            'button.pa3.bg-dark-gray.gold.bn.ttu.tracked.pointer',
            { type: 'submit' },
            vnode.state.loading ? 'Loading...' : 'Fetch'
          )
        )
      ),
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
              value: item.url,
              required: false,
              placeholder: 'URL, e.g. https://hikerlust.com/song-sot-o-san-bay-quoc-te-kuala-lumpur-klia-malaysia/',
              oninput: doUpdateInput
            }),
            m('input.mv2.pa3.br2.ba.b--moon-gray', {
              name: 'domain',
              value: item.domain,
              required: false,
              placeholder: 'Domain, e.g. hikerlust.com',
              oninput: doUpdateInput
            }),
            m('input.mv2.pa3.br2.ba.b--moon-gray', {
              name: 'image',
              value: item.image,
              required: false,
              placeholder: 'URL to cover image',
              oninput: doUpdateInput
            }),
            m('input.mv2.pa3.br2.ba.b--moon-gray', {
              name: 'title',
              value: item.title,
              required: false,
              placeholder: 'Title, e.g. Tới Malaysia, đừng chỉ ở Kuala Lumpur mà hãy ghé Genting và Penang',
              oninput: doUpdateInput
            }),
            m('textarea.mv2.pa3.br2.ba.b--moon-gray', {
              rows: 5,
              name: 'description',
              value: item.description,
              required: false,
              placeholder: 'Summary',
              oninput: doUpdateInput
            }),
            m('button.pa3.bg-dark-gray.gold.bn.ttu.tracked.pointer', { type: 'submit' }, 'Get code')
          )
        ),
        m(
          '.w-50',
          m(
            'iframe',
            Object.assign({ width: '100%', frameborder: 0, height: 490 }, frameSrc != null ? { src: frameSrc } : {})
          )
        )
      ),
      m(
        'textarea.w-100.mv2.pa3.br2.ba.b--moon-gray.code',
        {
          rows: 10,
          placeholder: 'Embed code will appear here'
        },
        frameCode
      )
    )
  }

  return { view, oninit }
}

m.mount(document.body, App)
