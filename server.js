const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); 

const arquivo = 'inventario.json';

app.get('/equipamentos', (req, res) => {
    if (!fs.existsSync(arquivo)) return res.json([]);
    const dados = JSON.parse(fs.readFileSync(arquivo));
    res.json(dados);
});

app.post('/equipamentos', (req, res) => {
    const novoEquipamento = req.body;
    let dados = [];
    
    if (fs.existsSync(arquivo)) {
        dados = JSON.parse(fs.readFileSync(arquivo));
    }
    
    dados.push(novoEquipamento);
    fs.writeFileSync(arquivo, JSON.stringify(dados, null, 4)); 
    
    res.json({ status: 'sucesso' });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));