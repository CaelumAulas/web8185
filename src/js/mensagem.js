'use strict'

const mensagem = function(mensagem){

    const mural = document.querySelector('.mural');

    const msgEl = document.createElement('p');
    msgEl.textContent = mensagem.conteudo;
    msgEl.classList.add('formNovoCartao-msg');

    msgEl.addEventListener('animationend', function () {
        this.remove();
    })

    mural.insertAdjacentElement('beforebegin', msgEl);

}