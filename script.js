const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    const clicouNoMenu = sidebar.contains(e.target);
    const clicouNoBotao = menuToggle.contains(e.target);

    if (!clicouNoMenu && !clicouNoBotao) {
        sidebar.classList.remove('active');
    }
});

const formCadastro = document.getElementById('formCadastro');
const listaEquipamentos = document.getElementById('listaEquipamentos');

// 1. Função que Pede os dados para o Node.js e mostra na tela
function carregarEquipamentos() {
    fetch('http://localhost:3000/equipamentos')
        .then(res => res.json())
        .then(equipamentos => {
            listaEquipamentos.innerHTML = ''; 
            equipamentos.forEach(eq => {
                const div = document.createElement('div');
                div.classList.add('item-equipamento');
                div.innerHTML = `
                    <p>${eq.id}</p>
                    <p>${eq.tipo}</p>
                    <p>${eq.modelo}</p>
                    <p class="ocultosMobile">${eq.colaborador}</p>
                    <p class="ocultosMobile">${eq.setor}</p>
                    <p class="ocultosMobile">Salvo no JSON</p>
                `;
                listaEquipamentos.appendChild(div);
            });
        })
        .catch(() => console.log('Aguardando dados ou servidor offline.'));
}

// 2. Evento que Envia os dados digitados para o Node.js salvar no arquivo
formCadastro.addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const tipo = document.getElementById('tipo').value;
    const modelo = document.getElementById('modelo').value;
    const colaborador = document.getElementById('colaborador').value;
    const setor = document.getElementById('setor').value;

    if(!id || !tipo || !modelo) return alert("Preencha ID, Tipo e Modelo!");

    const novoEquipamento = { id, tipo, modelo, colaborador, setor };

    fetch('http://localhost:3000/equipamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Avisa o Node que é um JSON
        },
        body: JSON.stringify(novoEquipamento)
    })
    .then(() => {
        formCadastro.reset();
        carregarEquipamentos(); // Recarrega a lista atualizada
    });
});

// Chama a função para carregar a lista assim que a página abre
carregarEquipamentos();