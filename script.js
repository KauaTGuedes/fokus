//Tela
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')

//play pause
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon") 
const tempoNaTela = document.querySelector('#timer')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musicaCurtoInput = document.querySelector('#alternar-musica')
const musicaLongoInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause')


//Musicas
const musicaFoco = new Audio('/sons/NCTSong.mp3')
const musicaCurto = new Audio('/sons/ExoSong.mp3')
const musicaLongo = new Audio('/sons/GfriendSong.mp3')
const audioPlay = new Audio('/sons/play.wav');
const audioPausar = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')



let tempoDecorridoEmSegundos = 1800
let intervaloId = null

musicaFoco.loop = true
//musicaCurto.loop = true
//musicaLongo.loop = true

musicaLongoInput.addEventListener('change', () =>{
    if(musicaLongo.paused) {
        musicaLongo.play()
    } else {
        musicaLongo.pause()
    }
})


/*
musicaCurtoInput.addEventListener('change', () =>{
    if(musicaCurto.paused) {
        musicaCurto.play()
    } else {
        musicaCurto.pause()
    }
})

*/

/*
musicaLongoInput.addEventListener('change', () =>{
    if(musicaLongo.paused) {
        musicaLongo.play()
    } else {
        musicaLongo.pause()
    }
})

*/

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1800
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

// Contagem

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play() 
        alert('Tempo finalizado!!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        audioPausar.play();
        zerar()
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`)
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()