const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');  
const app = express();

app.use(express.json());
app.use(cors()); 

const dbConfig = {
    host: 
    port: 
    user: 
    password: 
    database: 
    timezone: 
};

async function createConnection() {
    return await mysql.createConnection(dbConfig);
}

const ratingCodes = {
    'Ótimo': 142,
    'Bom': 143,
    'Médio': 144,
    'Ruim': 145,
    'Péssimo': 146
};

app.post('/submit-feedback', async (req, res) => {
    const { rating } = req.body; 

    if (rating && ratingCodes[rating] !== undefined) {
        try {
            const connection = await createConnection();

            const [result] = await connection.execute(
                `INSERT INTO cpa_resposta (data_resposta, codigo_cpa_questao, codigo_cpa_opcao, codigo_inscricao, codigo_cpa_formulario)
                 VALUES (?, ?, ?, ?, ?)`,
                [new Date(Date.now()), 62, ratingCodes[rating], '000', 67]
            );

            await connection.end();

            res.json({ message: 'Feedback registrado com sucesso!' });
        } catch (error) {
            console.error('Erro ao registrar feedback:', error);
            res.status(500).json({ error: 'Erro ao registrar feedback' });
        }
    } else {
        res.status(400).json({ error: 'Avaliação inválida.' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
