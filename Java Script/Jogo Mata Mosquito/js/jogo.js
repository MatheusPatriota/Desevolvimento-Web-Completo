// altura
var altura = 0;

// largura

var largura = 0;
var tempo = 5;
var vidas = 1;
var nivel = document.location.search;
var criaMosquitoTempo;
nivel = nivel.replace('?', '');

if (nivel === 'normal') {
    criaMosquitoTempo = 1500;
} else if (nivel === 'dificil') {
    criaMosquitoTempo = 1000;
} else if (nivel === 'chucknorris') {
    criaMosquitoTempo = 750;
}
function obterLarguraAltura() {
    altura = window.innerHeight;
    largura = window.innerWidth;

    console.log(altura, largura);
}

obterLarguraAltura();

var cronometro = setInterval(function () {
    tempo -= 1;
    if (tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criaMosca);
        window.location.href = 'winner.html';
    } else {
        document.getElementById('cronometro').innerHTML = tempo;
    }

}, 1000)

function posicaoRandomica() {
    if (document.getElementById('mosquito')) {

        if (vidas >= 3) {
            window.location.href = 'game-over.html';
        } else {
            document.getElementById('v' + vidas).src = 'images/coracao_vazio.png';
            vidas++;
        }
        document.getElementById('mosquito').remove();
    }
    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;
    console.log(posicaoX, posicaoY);
    // criar o elemento html
    var mosquito = document.createElement('img');
    mosquito.src = 'images/mosca.png';
    mosquito.className = tamanhoAleatorio() + ladoAleatorio();
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    mosquito.onclick = function () {
        this.remove()
    }
    document.body.appendChild(mosquito);
}


function tamanhoAleatorio() {
    var tamanho = Math.floor(Math.random() * 3);
    switch (tamanho) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}


function ladoAleatorio() {
    var tamanho = Math.floor(Math.random() * 2);
    switch (tamanho) {
        case 0:
            return ' ladoA'
        case 1:
            return ' ladoB'

    }
}


