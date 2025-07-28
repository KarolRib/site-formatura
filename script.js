// O "DOMContentLoaded" é um evento que espera toda a página HTML carregar
// para só então executar o código JavaScript. Isso evita erros.
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. CONECTANDO O JS COM OS ELEMENTOS DO HTML ---
    // Guardamos em "variáveis" cada elemento do HTML que vamos manipular.
    // É como dar um apelido para cada pedaço da página.
    const interesseBaileSelect = document.getElementById('interesse_baile');
    const areaDePagamentoDiv = document.getElementById('area-de-pagamento');
    const formaPagamentoSelect = document.getElementById('forma_pagamento');
    const areaCalculadoraDiv = document.getElementById('area-calculadora');
    const infoPixDinheiroDiv = document.getElementById('info-pix-dinheiro');
    const parcelasSelect = document.getElementById('parcelas');
    const resultadoParcelaSpan = document.getElementById('resultado-parcela');

    // --- 2. AS TAXAS E VALORES DO PARCELAMENTO ---
    // Criamos uma "tabela" de taxas para cada opção de parcelamento.
    const taxas = {
        1: 3.15, 2: 5.39, 3: 6.12, 4: 6.85, 5: 7.57, 6: 8.28,
        7: 8.99, 8: 9.69, 9: 10.38, 10: 11.06, 11: 11.74, 12: 12.40
    };
    // Valor base do convite que você quer receber.
    const valorLiquidoDesejado = 500;

    // --- 3. FUNÇÕES (OS "CÉREBROS" DA PÁGINA) ---

    // Função responsável por calcular o valor da parcela.
    function calcularParcela() {
        const numeroDeParcelas = parseInt(parcelasSelect.value);
        const taxaPercentual = taxas[numeroDeParcelas];
        const taxaDecimal = taxaPercentual / 100;

        // [ALTERAÇÃO] Usamos a fórmula corrigida: Valor líquido / (1 - Taxa)
        const valorCobradoDoCliente = valorLiquidoDesejado / (1 - taxaDecimal);
        const valorDaParcela = valorCobradoDoCliente / numeroDeParcelas;

        // Mostra o resultado na tela, formatado como moeda (R$ XX,XX).
        resultadoParcelaSpan.textContent = valorDaParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Função que decide se mostra a calculadora ou a informação de PIX.
    function mostrarDetalhesPagamento() {
        const metodoEscolhido = formaPagamentoSelect.value;

        if (metodoEscolhido === 'Cartao de Credito') {
            areaCalculadoraDiv.style.display = 'block'; // 'block' significa 'mostrar'
            infoPixDinheiroDiv.style.display = 'none';  // 'none' significa 'esconder'
            calcularParcela(); // Já calcula o valor inicial
        } else if (metodoEscolhido === 'Pix ou Dinheiro') {
            areaCalculadoraDiv.style.display = 'none';
            infoPixDinheiroDiv.style.display = 'block';
        } else {
            // Esconde tudo se o usuário não selecionar uma opção válida.
            areaCalculadoraDiv.style.display = 'none';
            infoPixDinheiroDiv.style.display = 'none';
        }
    }

    // Função principal que mostra ou esconde toda a área de pagamento.
    function mostrarAreaDePagamento() {
        if (interesseBaileSelect.value === 'Sim') {
            areaDePagamentoDiv.style.display = 'block';
        } else {
            areaDePagamentoDiv.style.display = 'none';
            // Garante que, ao esconder, as sub-áreas também sumam.
            areaCalculadoraDiv.style.display = 'none';
            infoPixDinheiroDiv.style.display = 'none';
        }
    }

    // --- 4. "OUVINTES DE EVENTOS" (COLOCANDO AS FUNÇÕES PARA TRABALHAR) ---
    // Aqui, o código fica "escutando" as ações do usuário.
    // Quando o usuário muda uma opção no menu, a função correspondente é chamada.
    interesseBaileSelect.addEventListener('change', mostrarAreaDePagamento);
    formaPagamentoSelect.addEventListener('change', mostrarDetalhesPagamento);
    parcelasSelect.addEventListener('change', calcularParcela);

});