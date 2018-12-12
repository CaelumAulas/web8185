;(function(){

    const btnAjuda = document.querySelector('#btnAjuda');

    const listaAjudas = [
        "Bem vindo ao ceep",
        "Use o campo de texto para criar um novo cartão",
        "Clique no botao sync para salvar seus cartoes",
        "No botão linhas vc altera o layout da lista de cartões",
        "O Ceep é adaptado para dispositivos móveis!"
    ];

    btnAjuda.addEventListener(`click`, function(){

        for (const ajuda of listaAjudas) {
            alert(ajuda);
        }

    } );

})()