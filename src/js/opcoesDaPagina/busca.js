'use strict';

(function () {

  const busca = document.querySelector('#busca');

  busca.addEventListener('input', function () {

    const cartoes = document.querySelectorAll('.cartao'),
          termoBusca = this.value.toLowerCase();

    for (const cartao of cartoes) {
      const conteudo = cartao.querySelector('p').textContent.toLowerCase();

        conteudo.includes(termoBusca)
          ? cartao.style.display = 'block'
          : cartao.style.display = 'none';
    }

  })

})()