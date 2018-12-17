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