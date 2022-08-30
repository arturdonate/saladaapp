var db = openDatabase('saladasProntas-1.0', '1.0', 'Saladas', 2 * 1024 * 1024);

function criarTabelas(){

    db.transaction(function (tx) {
        //tx.executeSql('DROP TABLE saladas');
        tx.executeSql('CREATE TABLE IF NOT EXISTS saladas (id integer primary key, nome, ingredientes,valor,imagem)');
        
        //tx.executeSql('DROP TABLE usuarios');
        tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id integer primary key, nome, email, senha)');
        
        //tx.executeSql('DROP TABLE carrinho');
        tx.executeSql('CREATE TABLE IF NOT EXISTS carrinho (id integer primary key, iduser, idsalada,quantidade,valor,data)');
        
     
    });

}

//Funcões da tela index
function cadastrarSalada(pnome,pingred,pvalor,pimagem){
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM saladas where nome = ?', [pnome], function (tx, results) {
            var len = results.rows.length;
            
            if(len == 0){
                var sql = "Insert into saladas (nome, ingredientes,valor,imagem) values (?,?,?,?)";
                tx.executeSql(sql, [pnome,pingred,pvalor,pimagem]); 
            }
        })
    })
}

function listarSaladas(){
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM saladas', [], function (tx, results) {
            var len = results.rows.length, i;
            document.getElementById('listarSaladas').innerHTML = '';
            for (i = 0; i < len; i++) {
              document.getElementById('listarSaladas').innerHTML += `<div class="border-bottom p-2 salada" onclick="dadosSalada(${results.rows.item(i).id});">
              <div class="row p-2">
                  <div class="col-9">
                      <h6 class="m-0"><strong>${results.rows.item(i).nome}</strong></h6>
                      <div class="ingred m-0 w-100">
                      ${results.rows.item(i).ingredientes} 
                      </div>
                      <div class="valor">
                          R$${results.rows.item(i).valor}
                      </div>
                  </div>
                  <div class="col-3">
                      <img class="img1" src="img/${results.rows.item(i).imagem}" alt="">
                  </div>
              </div>
          </div>`;
            }
          });
    })
}

//Fim funçoes tela Index

//Funções da tela Login

function cadastrarUser(pnome,psobrenome, pdata_nasci, pemail,psenha){
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM usuarios where email = ?', [pemail], function (tx, results) {
            var len = results.rows.length;
            
            if(len == 0){
                var sql = "Insert into usuarios (nome, ,sobrenome,data_nasci, email,senha, ) values (?,?,?,?,?)";
                tx.executeSql(sql, [pnome,psobrenome, pdata_nasci,pemail,psenha]); 
            }
        })
    })
}

function fazerEntrar(pemail,psenha){
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM usuarios where email = ? And senha = ?', [pemail,psenha], function (tx, results) {
            var len = results.rows.length;
            if(len == 1){
                localStorage.setItem('idUsuario',results.rows.item(0).id);
                window.location.assign('home.html')
            } else {
                alert('Senha ou usuário inválido.')
            }
        })
    })
}

function detalhesSalada(id){

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM saladas where id = ?', [id], function (tx, results) {
            
            document.getElementById('imgSalada').src = 'img/'+results.rows.item(0).imagem;
            document.getElementById('nomeSalada').innerHTML = results.rows.item(0).nome;
            document.getElementById('valorSalada').innerHTML = results.rows.item(0).valor;

            var ingred = results.rows.item(0).ingredientes;

            var ingredMatriz = ingred.split(",");
            
            document.getElementById('lista').innerHTML = '';

            for(var i=0;i<ingredMatriz.length;i++){

                document.getElementById('lista').innerHTML += '<li>'+ingredMatriz[i]+'</li>';

            }

            localStorage.setItem('valorUnit',results.rows.item(0).valor);
            
        })
    })

}

function adicionarCarrinho(idUser,idSalada,quant,valorU){
    db.transaction(function (tx) {

        var data = new Date();
        let dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear(); 

        var sql = 'Insert into carrinho (iduser,idsalada,quantidade,valor,data) values (?,?,?,?,?)';
        tx.executeSql(sql, [idUser,idSalada,quant,valorU,dataFormatada]); 
        
        window.location.assign('carrinho.html');
    })

}

function listarItemCarrinho(){
    db.transaction(function (tx) {
        tx.executeSql('SELECT s.nome,s.imagem,c.* FROM carrinho c, saladas s where s.id = c.idsalada', [], function (tx, results) {
            var len = results.rows.length, i;
            document.getElementById('itensCarrinho').innerHTML = '';
            var totalGeral = 0;
            for (i = 0; i < len; i++) {
              
                var total = parseFloat(results.rows.item(i).valor)*parseInt(results.rows.item(i).quantidade);  
                totalGeral = totalGeral + total;

              document.getElementById('itensCarrinho').innerHTML += 
              `<div class="border-bottom p-2" id="divItem${results.rows.item(i).id}">
              <div class="row p-2 h-100">
                  <div class="col-2 py-1">
                      <img class="imgCarrinho rounded" src="img/${results.rows.item(i).imagem}" alt="">
                  </div>
                  <div class="col-6 p-0 py-1">
                      <h6 class="m-0"><strong>${results.rows.item(i).nome}</strong></h6>
                      <div class="valor">
                          R$ <span id="vTotalItem${results.rows.item(i).id}">${total.toFixed(2)}</span>
                      </div>
                  </div>
                  
                  <div class="col-4 d-flex align-items-center justify-content-center">
                      <div class="input-group input-group-sm">
                          <span class="input-group-text btn btn-success" onclick="btMenos(${results.rows.item(i).id},${results.rows.item(i).valor})"><strong>-</strong></span>
                          <input type="number" class="form-control text-center" value="${results.rows.item(i).quantidade}" min="1" max="99" id="qtdItem${results.rows.item(i).id}">
                          <span class="input-group-text btn btn-success" onclick="btMais(${results.rows.item(i).id},${results.rows.item(i).valor})"><strong>+</strong></span>
                      </div>
                  </div>
              </div>
          </div>`;
            }

            document.getElementById("tGeral").innerHTML = totalGeral.toFixed(2);
          });
    })
}

export default {
    criarTabelas: criarTabelas,
    cadastrarSalada: cadastrarSalada,
    listarSaladas: listarSaladas,
    cadastrarUser: cadastrarUser,
    fazerEntrar: fazerEntrar,
    detalhesSalada: detalhesSalada,
    adicionarCarrinho: adicionarCarrinho,
    listarItemCarrinho: listarItemCarrinho
}