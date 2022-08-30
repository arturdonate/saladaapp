import dados from "./dados.js";

dados.criarTabelas();

if($("#principal").length == 1){
    dados.listarSaladas();
}

$("#entrar").click(function(){
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
   
    dados.fazerEntrar(email,senha);
})

if($("#dSalada").length == 1){
    
    dados.detalhesSalada(localStorage.getItem('idSalada'));
   
}

$("#btMais").click(function(){
    var qtd = parseInt(document.getElementById('qtdSalada').value);
    document.getElementById('qtdSalada').value = qtd+1;
    
    var Total = parseFloat(localStorage.getItem('valorUnit'))*(qtd+1);
    document.getElementById('valorSalada').innerHTML = Total.toFixed(2);
})

$("#btMenos").click(function(){
    var qtd = parseInt(document.getElementById('qtdSalada').value);
    if(qtd > 1){
        document.getElementById('qtdSalada').value = qtd-1;
        var Total = parseFloat(localStorage.getItem('valorUnit'))*(qtd-1);
        document.getElementById('valorSalada').innerHTML = Total.toFixed(2);
    }
})


$("#addCarrinho").click(function(){
    var idU = localStorage.getItem('idUsuario');
    var idS = localStorage.getItem('idSalada');
    var quantid = document.getElementById('qtdSalada').value;
    var vlrUnit = localStorage.getItem('valorUnit');

    dados.adicionarCarrinho(idU,idS,quantid,vlrUnit);

})

if($("#itensCarrinho").length == 1){
   dados.listarItemCarrinho(); 
}

$("#cadastrar").click(function(){
    var email = document.getElementById('email').value;
    var nome = document.getElementById('nome').value;
    var sobrenome = document.getElementById('sobrenome').value;
    var data_nasci = document.getElementById('data_nasci').value;
    var senha = document.getElementById('senha').value;
   
    dados.cadastrarUser(nome,sobrenome, data_nasci,email,senha);
})