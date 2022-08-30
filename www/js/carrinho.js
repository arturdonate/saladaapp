var db = openDatabase('saladasProntas-1.0', '1.0', 'Saladas', 2 * 1024 * 1024);

function btMenos(id,valorUnit){
    var qtdCampo = parseInt(document.getElementById("qtdItem"+id).value);
    var vtotalGeral = parseFloat(document.getElementById("tGeral").innerHTML);
    if(qtdCampo > 1){
        document.getElementById("qtdItem"+id).value = qtdCampo-1;
        var total = (qtdCampo-1)*parseFloat(valorUnit);
        document.getElementById("vTotalItem"+id).innerHTML = total.toFixed(2);
        vtotalGeral = vtotalGeral-parseFloat(valorUnit); 
        document.getElementById("tGeral").innerHTML = vtotalGeral.toFixed(2);
        //Função de Atualizar Qtde
        Atualizar(id,qtdCampo-1);
    } else {
        //Função de Deletar Registro
        vtotalGeral = vtotalGeral-parseFloat(valorUnit); 
        document.getElementById("tGeral").innerHTML = vtotalGeral.toFixed(2);
        
        Deletar(id);

        var pai = document.getElementById('itensCarrinho');
        var filho = document.getElementById('divItem'+id);

        pai.removeChild(filho);
        
    }
}  

function btMais(id,valorUnit){
    var qtdCampo = parseInt(document.getElementById("qtdItem"+id).value);
    document.getElementById("qtdItem"+id).value = qtdCampo+1;
    
    var total = (qtdCampo+1)*parseFloat(valorUnit);
    var vtotalGeral = parseFloat(document.getElementById("tGeral").innerHTML);
    
    document.getElementById("vTotalItem"+id).innerHTML = total.toFixed(2);
    vtotalGeral = vtotalGeral+parseFloat(valorUnit); 
    document.getElementById("tGeral").innerHTML = vtotalGeral.toFixed(2);
    //Função de Atualizar Qtde
    Atualizar(id,qtdCampo+1);

}   


function Atualizar(id,qtd){
    db.transaction(function (tx) {
        var sql = "UPDATE carrinho set quantidade = "+qtd+" where id = "+id;        
        
        tx.executeSql(sql);
        
     
    });
}


function Deletar(id){
    db.transaction(function (tx) {
        var sql = "DELETE FROM carrinho where id = "+id;        
        tx.executeSql(sql);
        
     
    });
}