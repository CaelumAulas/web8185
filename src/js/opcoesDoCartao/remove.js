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
