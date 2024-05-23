async function buscaEndereco(cep){
    let mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
    let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    let consultaCEPConvertida = await consultaCEP.json();
    if (consultaCEPConvertida.erro) {
        throw Error('CEP não existente!');
    }
    let cidade = document.getElementById('cidade');
    let logradouro = document.getElementById('endereco');
    let bairro = document.getElementById('bairro')
    let estado = document.getElementById('estado');

    cidade.value = consultaCEPConvertida.localidade;
    logradouro.value = consultaCEPConvertida.logradouro;
    bairro.value = consultaCEPConvertida.bairro;
    estado.value = consultaCEPConvertida.uf;

    console.log(consultaCEPConvertida);
    return consultaCEPConvertida
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido! Tente Novamente.</p>`
        console.log(erro)
    }
}

let cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
