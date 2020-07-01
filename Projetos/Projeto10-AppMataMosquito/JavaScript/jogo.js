
var altura = 0 // Altura da tela
var largura = 0 // Largura da tela
var vidas = 1 // Vida atual
var tempo = 100 // Tempo de jogo restante

var moscas = 0 // Contador de mosquitos eliminados

var criaMosquitoTempo = 3000 // Tempo padrão de geração de mosquitos

// Dificuldade do jogo
var nivel = window.location.search 
nivel = nivel.replace("?",'')

if (nivel === "facil") {

	criaMosquitoTempo = 3000

} else if (nivel === "normal"){

	criaMosquitoTempo = 2000

} else if (nivel === "dificil"){

	criaMosquitoTempo = 1000

}

// Tempo de jogo
var cronometro = setInterval(
	function(){

		tempo = tempo - 1

		if (tempo < 0) {

			clearInterval(cronometro)
			clearInterval(criaMosquito)
			document.getElementById("contador").innerHTML = moscas
			window.location.href = 'vitoria.html'

		} else {

			document.getElementById("cronometro").innerHTML = tempo				

		}

		
	}, 1000)

//Verifica o tamanho da tela
function ajustaTamanhoPalcoJogo(){
	altura = window.innerHeight
	largura = window.innerWidth

	console.log(altura,largura)
}

ajustaTamanhoPalcoJogo()


// Gera um mosquito em uma posicao aleatoria
function posicaoRandomica(){

	document.getElementById("contador").innerHTML = moscas
	if(document.getElementById('mosquito')){
		document.getElementById('mosquito').remove()

		if(vidas > 3){
			document.getElementById("contador").innerHTML = moscas
			window.location.href = 'fim_de_jogo.html'
		} else {
			document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png'
			vidas++
		}
		
	}

	//Corrige posicoes dos mosquitos
	var posicaoX = Math.floor(Math.random() * largura) -100
	var posicaoY = Math.floor(Math.random() * altura) -100
	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	// Configurações do mosquito
	var mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosca.png'
	mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio()	
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'

	//Ao clicar no mosquito
	mosquito.onclick = function(){
		this.remove()		
		moscas++
		localStorage.setItem('moscas',moscas)
		document.getElementById("contador").innerHTML = moscas

	}

	// Insere o mosquito na página
	document.body.appendChild(mosquito)
	
}

// Escolhe aleatoriamente o tamanho do mosquito
function tamanhoAleatorio(){
	var classe = Math.floor(Math.random() * 3)

	switch(classe) {
		case 0:
			return 'mosquito1'
		case 1:
			return 'mosquito2'
		case 2:
			return 'mosquito3'
	}
	
}

// Escolhe aleatoriamente o lado para qual o mosquito estara olhando
function ladoAleatorio(){
	var classe = Math.floor(Math.random() * 2)

	switch(classe) {
		case 0:
			return 'ladoA'
		case 1:
			return 'ladoB'
	}
	
}
