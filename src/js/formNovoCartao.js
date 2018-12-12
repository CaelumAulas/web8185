;(function(){
    
    const formulario = document.querySelector('.formNovoCartao');

    formulario.addEventListener('submit', function(event){
        event.preventDefault();

        const textarea = document.querySelector('.formNovoCartao-conteudo')

        if (textarea.value.trim()) {
            
            const cartao = { 
                conteudo: textarea.value.trim() 
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