const nameInput = document.getElementById('nameInput');
const addNameBtn = document.getElementById('addNameBtn');
const nameList = document.getElementById('nameList');
const drawBtn = document.getElementById('drawBtn');
const resultDiv = document.getElementById('result');
// Adicione este código ao seu arquivo app.js

const btnSortear = document.getElementById('btn-sortear');
const resultadoDiv = document.getElementById('resultado');

let numerosSorteados = [];

// Função para sortear números
btnSortear.addEventListener('click', () => {
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const de = parseInt(document.getElementById('de').value);
    const ate = parseInt(document.getElementById('ate').value);

    // Limpa os resultados anteriores
    resultadoDiv.innerHTML = 'Números sorteados: nenhum até agora';
    numerosSorteados = [];

    // Validação de entrada
    if (isNaN(quantidade) || isNaN(de) || isNaN(ate) || quantidade <= 0 || de >= ate) {
        resultadoDiv.textContent = 'Por favor, insira valores válidos.';
        return;
    }

    // Gera a lista de números disponíveis
    const numerosDisponiveis = Array.from({ length: ate - de + 1 }, (_, i) => i + de);
    
    // Verifica se a quantidade de números a sortear não excede os disponíveis
    if (quantidade > numerosDisponiveis.length) {
        resultadoDiv.textContent = 'A quantidade de números sorteados não pode ser maior que a quantidade disponível.';
        return;
    }

    // Sorteia os números
    while (numerosSorteados.length < quantidade) {
        const numeroSorteado = numerosDisponiveis.splice(Math.floor(Math.random() * numerosDisponiveis.length), 1)[0];
        numerosSorteados.push(numeroSorteado);
    }

    // Exibe os resultados
    resultadoDiv.innerHTML = `<strong>Números sorteados:</strong> ${numerosSorteados.join(', ')}`;
});

let names = [];

// Função para adicionar nome
addNameBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        names.push(name);
        updateNameList();
        nameInput.value = '';
    }
});

// Função para atualizar a lista de nomes
function updateNameList() {
    nameList.innerHTML = '';
    names.forEach((name, index) => {
        const li = document.createElement('li');
        li.textContent = name;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.addEventListener('click', () => {
            names.splice(index, 1);
            updateNameList();
        });

        li.appendChild(deleteBtn);
        nameList.appendChild(li);
    });
}

// Função para sortear amigo secreto
drawBtn.addEventListener('click', () => {
    if (names.length < 2) {
        resultDiv.textContent = 'Adicione pelo menos 2 nomes para sortear.';
        return;
    }
    const shuffledNames = names.sort(() => 0.5 - Math.random());
    const pairs = shuffledNames.map((name, index) => {
        return `${name} -> ${shuffledNames[(index + 1) % shuffledNames.length]}`;
    });
    resultDiv.innerHTML = `<strong>Resultados:</strong><br>${pairs.join('<br>')}`;
});