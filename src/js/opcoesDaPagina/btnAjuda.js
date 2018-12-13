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

    //exemplo objeto javascript
    /*
    const escola = {
        nome: 'UFT',
        endereco: 'asdasd',
        numero: 2323,
        ensina: function(){
            return this.nome
        }
    }*/

    btnAjuda.addEventListener(`click`, function(){

        const conexaoApi = new XMLHttpRequest();

        conexaoApi.open('GET', 'https://ceep.herokuapp.com/cartoes/instrucoes');

        conexaoApi.responseType = 'json';

        conexaoApi.send();

        conexaoApi.addEventListener('load', function(){
           
            listaAjudas = this.response.instrucoes;

            const ajudas = document.querySelectorAll('.mural .cartao.ajuda')
    
            if(ajudas.length){
                
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

        }); //fim load

    }); //fim click

})()