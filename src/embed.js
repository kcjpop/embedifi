{
  const current = document.currentScript
  function embedifi() {
    if (!current) return

    const iframe = document.createElement('iframe')
    iframe.src = `${current.src.replace('/embed.js', '')}/?${current.dataset.payload}`
    iframe.width = '100%'
    iframe.height = 400
    iframe.frameBorder = 0
    iframe.allowtransparency = true

    current.parentNode.insertBefore(iframe, current.nextSibling)

    window.addEventListener('message', e => {
      console.log(e, window.location.origin)
      if (e.origin !== window.location.origin) return
      iframe.height = e.data ? parseInt(e.data, 10) + 50 : 400
    })
  }

  setTimeout(embedifi, 5)
}
