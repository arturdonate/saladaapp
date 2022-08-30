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

$("#salvar").click(function(){
    
    var nome =  document.getElementById('nome').value;
    var email =  document.getElementById('email').value;
    var senha =  document.getElementById('senha').value;
    var confsenha =  document.getElementById('confsenha').value;
    
    if(nome.length > 0 && email.length > 0 && senha.length >0){
        if(senha == confsenha){
            dados.cadastrarUser(nome, email, senha);
            window.location.assign("login.html");
        }else{
            alert ("As senhas não estão iguais")
        }
    }else{
        alert("Todos os campos devem ser preenchidos");
    }
})