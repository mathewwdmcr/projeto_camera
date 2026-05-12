// Declarações dos elementos usando DOM
const videoElemento = document.getElementById("video");
const botaoScanner= document.getElementById("bnt-texto");
const resultado = document.getElementById("resultado");
const canvas = document.getElementById("canvas");

// Função que habilita a camera

async function configurarcamera() {
    try{
        const midia = await navigator.mediaDevices.getUserMedia({
            video: {facingMode: "environment"},//aciona a camera traseira
            audio:false
        })
        //recebe a função midi para habilitar a camera
        videoElemento.srcObject = midia;
        //garante que o video comece
        videoElemento.onplay();
    }catch(erro){
        resultado.innerText="erro ao acessar a camera",erro
    }
}
//executa a função da camera
configurarcamera();

//função para ler o texto que a camera pega
botaoScanner.onclick = async ()=>{
    botaoScanner.disable=true;//habilita a camera
    resultado.innerText="Fazendo a leitura... aguarde";

    //preparandoo canvas para criar estrutura da camera
    const contexto = canvas.getContext("2d");

    //ajustar o tamanho do canvas
    canvas.width = videoElemento.videoWidth; //largura
    canvas.height = videoElemento.videoheigth; //largura

    //reset para garantir que a foto não saia invertida
    contexto.setTransform(1, 0, 0, 1, 0, 0);

    //filtro de contraste e escala de inza antes de tirar a foto
    //ajuda a evitar as letras aleatórias

    contexto.filter = 'contrast(1.2) grayscale(1)';
    try{
        const { data: { text }} = await Tesseract.recognize(
            canas,//aonde o texto vai aparecer
            'por' //indioma do texto
        );
        //remove espaços exessivos
        const textoFinal = text.trim();
        resultado.innerText= textoFinal.length > 0 ? textoFinal : "não foi possivel indentificar o texto";
    }catch(erro){
        console.error(erro);
        resultado.innerText="Erro ao processar",erro
    }
    finally{
        //desabilita a câmera para fazer nova captura
        botaoScanner.disable=false;
    }
}