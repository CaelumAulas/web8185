let numeroCartao = 1;

const criarCartaoInsereMural = function(conteudo){
    const mural = document.querySelector('.mural');
    const cartao = document.createElement('article');

    cartao.id = 'cartao_' + numeroCartao;
    cartao.classList.add('cartao');
    cartao.tabIndex = 0;

    cartao.innerHTML = `
            <div class="opcoesDoCartao">
            <button class="opcoesDoCartao-remove opcoesDoCartao-opcao" tabindex="0">
                <svg><use xlink:href="#iconeRemover"></use></svg>
            </button>

            <input type="radio" name="corDoCartao${numeroCartao}" value="#EBEF40" id="corPadrão-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo" checked>
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
            <p class="cartao-conteudo" contenteditable tabindex="0">${conteudo}</p>            
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

    numeroCartao++    
}