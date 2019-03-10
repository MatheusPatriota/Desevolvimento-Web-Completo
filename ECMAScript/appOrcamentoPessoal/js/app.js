class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados() {
        for (let element in this) {
            if (this[element] == undefined || this[element] == '' || this[element] == null) {
                return false;
            }
        }
        return true;
    }
}



function cadastraDespesa() {

    let bd = new Bd();
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');
    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);

    if (despesa.validarDados()) {
        bd.gravar(despesa);
        document.getElementById('titulo').innerHTML = 'Registro inserido com sucesso!';
        document.getElementById('corpo').innerHTML = ' Despesa foi cadastrada com sucesso!';
        document.getElementById('botao').innerHTML = 'Entendido';
        document.getElementById('cor-titulo').className = "modal-header text-success";
        document.getElementById('botao').className = "btn btn-success";
        ano.value = '';
        dia.value = '';
        mes.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';
        $('#modalRegistraDespesa').modal('show')
    } else {
        document.getElementById('titulo').innerHTML = 'Erro na Gravação';
        document.getElementById('corpo').innerHTML = 'Algum campo está vazio.';
        document.getElementById('botao').innerHTML = 'Voltar e Corrigir';
        document.getElementById('cor-titulo').className = "modal-header text-danger";
        document.getElementById('botao').className = "btn btn-danger";
        $('#modalRegistraDespesa').modal('show')
        ano.value = '';
        dia.value = '';
        mes.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';
    }


}

class Bd {
    constructor() {
        let id = localStorage.getItem('id')
        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }
    gravar(objeto) {
        let id = this.getProximoId();
        localStorage.setItem(id, JSON.stringify(objeto));
        localStorage.setItem('id', id);
    }

    recuperaTodosOsRegistros() {
        let despesas = Array();
        let id = localStorage.getItem('id');
        for (let index = 1; index <= id; index++) {

            let despesa = JSON.parse(localStorage.getItem(index));
            if (despesa === null) {
                continue;
            }
            despesa.id = index;
            despesas.push(despesa);
        }
        return despesas;
    }

    pesquisar(despesa) {
        let despesasFiltradas = Array();
        despesasFiltradas = this.recuperaTodosOsRegistros();
        if (despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
        }
        if (despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);
        }
        if (despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
        }
        if (despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);
        }
        if (despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
        }
        if (despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
        }
        return despesasFiltradas;
    }

    remover(id) {
        document.getElementById('tituloR').innerHTML = 'Você está prestes a excluir uma despesa!';
        document.getElementById('corpoR').innerHTML = 'Tem certeza que quer excluir essa despesa?';
        let btn = document.getElementById('botaoS');
        document.getElementById('botaoS').innerHTML = 'Sim';
        document.getElementById('botaoS').className = "btn btn-success";
        btn.onclick = function () {
            document.getElementById('tituloR').innerHTML = 'Despesa excluída com sucesso!';
            document.getElementById('corpoR').innerHTML = ' Sua despesa foi excluída com sucesso!';
            document.getElementById('botoes').innerHTML = '<button type="button" data-dismiss="modal" id="botao">Entendido </button>'
            document.getElementById('cor-tituloR').className = "modal-header text-success";
            document.getElementById('botao').className = "btn btn-success";
            localStorage.removeItem(id)
            $('#modalRemoveDespesa').modal('show')
            let refresh = false;
            document.getElementById('botao').onclick = function () {
                window.location.reload();
            }
        }
        document.getElementById('botaoN').innerHTML = 'Não';
        document.getElementById('cor-tituloR').className = "modal-header text-danger";
        document.getElementById('botaoN').className = "btn btn-danger";
        $('#modalRemoveDespesa').modal('show');
    }

}
let bd = new Bd();
function carregaListaDespesas(despesas = Array()) {
    if (despesas.length == 0) {
        despesas = bd.recuperaTodosOsRegistros();
    }

    let listaDespesas = document.getElementById('lista-despesas')
    listaDespesas.innerHTML = '';
    despesas.forEach(function (d) {

        let linha = listaDespesas.insertRow();

        linha.insertCell(0).innerHTML = d.dia + '/' + d.mes + '/' + d.ano;
        linha.insertCell(1).innerHTML = document.getElementById('tipo')[parseInt(d.tipo)].innerHTML;
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = d.valor;

        let btn = document.createElement("button");
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.id = `id_despesa_${d.id}`;
        btn.onclick = function () {
            let id = this.id.replace('id_despesa_', '');
            bd.remover(id);
        }
        linha.insertCell(4).append(btn);
    })
}


function pesquisarDespesas() {
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');
    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);
    console.log(despesa)
    let despesas = bd.pesquisar(despesa);
    console.log(despesas)
    this.carregaListaDespesas(despesas);

}