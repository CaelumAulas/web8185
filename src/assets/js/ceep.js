'use strict'
;(function(){

    let numeroCartao = 1;

    const criarCartaoInsereMural = function (dadosCartao) {
        const mural = document.querySelector('.mural'),
              cartao = document.createElement('article');

        cartao.id = 'cartao_' + numeroCartao;
        cartao.classList.add('cartao');
        cartao.tabIndex = 0;

        if(dadosCartao.ajuda)
            cartao.classList.add('ajuda')

        cartao.innerHTML = `
            <div class="opcoesDoCartao">
            <button class="opcoesDoCartao-remove opcoesDoCartao-opcao" tabindex="0">
                <svg><use xlink:href="#iconeRemover"></use></svg>
            </button>

            <input type="radio" name="corDoCartao${numeroCartao}" value="#EBEF40" id="corPadrão-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo">
            <label for="corPadrão-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #EBEF40;" tabindex="0">
                Padrão
            </label>

            <input type="radio" name="corDoCartao${numeroCartao}" value="#F05450" id="corImportante-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo">
            <label for="corImportante-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #F05450;" tabindex="0">
                Importante
            </label>

            <input type="radio" name="corDoCartao${numeroCartao}" value="#92C4EC" id="corTarefa-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo">
            <label for="corTarefa-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #92C4EC;" tabindex="0">
                Tarefa
            </label>

            <input type="radio" name="corDoCartao${numeroCartao}" value="#76EF40" id="corInspiração-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo">
            <label for="corInspiração-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #76EF40;" tabindex="0">
                Inspiração
            </label>
            </div>
            <p class="cartao-conteudo" contenteditable tabindex="0">${dadosCartao.conteudo}</p>            
            `

        cartao.addEventListener('focusin', function () {
            this.classList.add('cartao--focado')
        })

        cartao.addEventListener('focusout', function () {
            this.classList.remove('cartao--focado')
        })

        cartao.addEventListener('change', function (event) {

            const mudaCor = event.target.classList.contains('opcoesDoCartao-radioTipo')

            if (mudaCor) {
                this.style.backgroundColor = event.target.value;
            }
        })

        cartao.addEventListener('keyup', function (event) {

            const mudaCor = event.target.classList.contains('opcoesDoCartao-tipo')

            if (mudaCor && (event.code == 'Enter' || event.code == 'Space' || event.code == 'NumpadEnter')) {

                //this.style.backgroundColor = event.target.style.color;
                event.target.click();

            }

        })

        cartao.addEventListener('click', function (event) {
            if (event.target.classList.contains('opcoesDoCartao-remove')) {
                cartao.classList.add('cartao--some');

                cartao.addEventListener('transitionend', function () {
                    this.remove();
                })
            }
        })

        mural.insertAdjacentElement('afterbegin', cartao)

        const cartaoColorido = cartao.querySelector(`[value="${dadosCartao.cor}"]`);

        cartaoColorido
            ? cartaoColorido.click()
            : cartao.style.backgroundColor = dadosCartao.cor;
        
        numeroCartao++
    }

    //window.criarCartaoInsereMural = criarCartaoInsereMural;
    
    //protegendo uma funcionalidade global de ser sobreescrita:
    Object.defineProperties(window, {
        criarCartaoInsereMural: { 
            value: criarCartaoInsereMural, 
            writable: false 
        }
    });

})()
'use strict'
;(function(){
    
    const formulario = document.querySelector('.formNovoCartao');

    formulario.addEventListener('submit', function(event){
        event.preventDefault();

        const textarea = document.querySelector('.formNovoCartao-conteudo')

        if (textarea.value.trim()) {
            
            const cartao = { 
                conteudo: textarea.value.trim(),
                cor: '#EBEF40'
            }
            
            criarCartaoInsereMural(cartao);

            this.reset();
            textarea.focus();
        } 
        else {
            const temMsg = formulario.querySelector('.formNovoCartao-msg');

            if(!temMsg){

                const mensagem = document.createElement('p');
                mensagem.textContent = 'Digite alguma coisa!';
                mensagem.classList.add('formNovoCartao-msg');
                
                //this.insertBefore(mensagem,textarea);
                textarea.insertAdjacentElement('afterend', mensagem)
    
                mensagem.addEventListener('animationend', function(){
                    this.remove();
                })

            }
            
        }

        
    })
    
})()
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
'use strict'
;(function(){
    
    const dados = {
        usuario: 'vanessa'
    }

    $.ajax({
        url: 'https://ceep.herokuapp.com/cartoes/carregar',
        method: 'GET',
        data: dados ,
        dataType: 'jsonp',
        success: function(resposta){

            for (const dadosCartao of resposta.cartoes) {
                criarCartaoInsereMural(dadosCartao)
            }

        }
    })

    /*
    const conexao = new XMLHttpRequest();

    conexao.open('GET', 'https://ceep.herokuapp.com/cartoes/carregar');

    conexao.responseType = 'json';

    conexao.setRequestHeader('Content-Type', 'application/json');

    conexao.send(JSON.stringify(dados));

    conexao.addEventListener('load', function () {
        
        console.log(conexao.response);
        
    })
    */

})()
'use strict'
;(function(){

    const btnAjuda = document.querySelector('#btnAjuda');

    let listaAjudas = [
        {
            conteudo: "Bem vindo ao ceep",
            cor: "red",
            ajuda: true
        },
        {
            conteudo: "Use o campo de texto para criar um novo cartão",
            cor: "blue",
            ajuda: true
        },
        {
            conteudo: "Clique no botao sync para salvar seus cartoes",
            cor: "orange",
            ajuda: true
        },
        {
            conteudo: "No botão linhas vc altera o layout da lista de cartões",
            cor: "purple",
            ajuda: true
        },
        { 
            conteudo: "O Ceep é adaptado para dispositivos móveis!",
            cor:  "green",
            ajuda: true
        }
    ];

    const exibeAjudas =  function(listaAjudas){

        const ajudas = document.querySelectorAll('.mural .cartao.ajuda')

        if (ajudas.length) {

            //se eu quiser apagar
            // for (const ajuda of ajudas) {
            //     ajuda.querySelector('.opcoesDoCartao-remove').click();
            // }

            for (const ajuda of ajudas) {
                ajuda.classList.add('destaca')
            }

            setTimeout(() => {
                for (const ajuda of ajudas) {
                    ajuda.classList.remove('destaca')
                }
            }, 1000);

        } else {
            for (const ajuda of listaAjudas) {
                ajuda.ajuda = true;
                criarCartaoInsereMural(ajuda);
            }

        }
    }

    btnAjuda.addEventListener(`click`, function(){

        fetch('https://ceep.herokuapp.com/cartoes/instrucoes')
        .then(response => response.json())
        .then(body => exibeAjudas(body.instrucoes))
        

        /*
        const conexaoApi = new XMLHttpRequest();

        conexaoApi.open('GET', 'https://ceep.herokuapp.com/cartoes/instrucoes');

        conexaoApi.responseType = 'json';

        conexaoApi.send();

        conexaoApi.addEventListener('load', function(){
           
            exibeAjudas(conexaoApi.response.instrucoes)
            

        }); //fim load

        */

    }); //fim click

    

})()
'use strict'

const btn = document.querySelector('#btnMudaLayout');
const mural = document.querySelector('.mural');

function mudaLayout() {
    mural.classList.toggle('mural--linha');
}

btn.addEventListener('click', mudaLayout);

function mudaTexto() {
    if (mural.classList.contains('mural--linha')) {
        btn.textContent = 'Blocos'
    }
    else {
        btn.textContent = 'Linhas'
    }
}

btn.addEventListener('click', mudaTexto);

'use strict'
;(function(){
    
    const btnSync = document.querySelector('#btnSync');
    
    btnSync.addEventListener('click', function(){

        this.classList.add('botaoSync--esperando');
        this.classList.remove('botaoSync--sincronizado');

        const listaElCartao = document.querySelectorAll('.cartao:not(.ajuda)');
        const listaObjCartao = [];

        for (const cartao of listaElCartao) {

            listaObjCartao.push({
                conteudo: cartao.querySelector('.cartao-conteudo').textContent,
                cor: cartao.querySelector('.opcoesDoCartao-radioTipo:checked').value
            })
        }

        const dados = {
            usuario: 'vanessa',
            cartoes: listaObjCartao
        }

        const conexao = new XMLHttpRequest();

        conexao.open('POST', 'https://ceep.herokuapp.com/cartoes/salvar/');
        
        conexao.setRequestHeader('Content-Type','application/json');

        conexao.send(JSON.stringify(dados));

        conexao.addEventListener('load', function(){

            const resposta = JSON.parse(conexao.response);

            mensagem({
                conteudo: `${resposta.quantidade} cartão(ões) salvos com sucesso para o usuário ${resposta.usuario} 🎉`
            })
            
            btnSync.classList.remove('botaoSync--esperando');
            btnSync.classList.add('botaoSync--sincronizado');
            
        });

        conexao.addEventListener('error', function () {
            mensagem({
                conteudo: `Deu ruim, tente mais tarde 👍`
            })

            btnSync.classList.remove('botaoSync--esperando');
            btnSync.classList.add('botaoSync--deuRuim');

            throw('Erro! Tem alguma info errada na sua request');

        })

        conexao.addEventListener('timeout', function(){
            mensagem({
                conteudo: `Ish, demorou demais! Tente novamente ⏱`
            })
            
            btnSync.classList.remove('botaoSync--esperando');
            btnSync.classList.add('botaoSync--deuRuim');

            throw ('Timeout! ⏱')
            
        })
    })
})()
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
'use strict'
;(function(){

    const cartoes = document.querySelectorAll('.cartao');

    for(let cartao of cartoes) {
        
        cartao.addEventListener('focusin', function(){
            this.classList.add('cartao--focado')
        })

        cartao.addEventListener('focusout', function(){
            this.classList.remove('cartao--focado')
        })

        cartao.addEventListener('change', function(event){

            const mudaCor = event.target.classList.contains('opcoesDoCartao-radioTipo')
            
            if(mudaCor){
                this.style.backgroundColor = event.target.value;
            }
        })

        cartao.addEventListener('keyup', function(event){

            const mudaCor = event.target.classList.contains('opcoesDoCartao-tipo')
            
            if (mudaCor && (event.code == 'Enter' || event.code == 'Space' || event.code == 'NumpadEnter')){
                
                //this.style.backgroundColor = event.target.style.color;

                event.target.click();

            }
            
        })

        cartao.addEventListener('click', function (event) {
            if (event.target.classList.contains('opcoesDoCartao-remove')){
                cartao.classList.add('cartao--some');

                cartao.addEventListener('transitionend', function(){
                    this.remove();
                })
            }
        })
        
    }

})()
'use strict'
//IIFE - immediately invoked function expression
;(function(){

    const btnList = document.querySelectorAll('.opcoesDoCartao-remove');

    for (let i = 0; btnList.length > i; i++) {

        const btn = btnList[i];

        btn.addEventListener('click', function () {

            const cartao = this.parentElement.parentElement;

            cartao.classList.add('cartao--some');

            cartao.addEventListener('transitionend', function () {
                this.remove();
            });
        });
    }

    // btnList.forEach(function(btn){

    //     btn.addEventListener('click', function(){

    //         const cartao = this.parentElement.parentElement;

    //         cartao.classList.add('cartao--some');

    //         cartao.addEventListener('transitionend', function(){
    //             this.remove();
    //         });

    //     });

    // });
    
})()
