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