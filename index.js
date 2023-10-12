const express = require('express');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId; // Importa ObjectId

const url = 'mongodb+srv://halejandro1021:STMXivtDoIK5KPIc@cluster0.le2r9bl.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url);

app.use(express.json()); // Habilita el uso de JSON en las solicitudes

app.get('/', async (req, res) => {
    try {
        const db = client.db('proyecto');
        const collection = db.collection('task');
        const documentos = await collection.find().toArray();

        res.send(documentos);
    } catch (error) {
        console.log('Ocurrió un error en tu servidor', error);
        res.status(500).send("Ocurrió un error");
    }
});

app.post('/', async (req, res) => {
    const newtask = [{
            name: "Alex",
            task: "ir al cine"
        },
        {
            name: "Estefany",
            task: "ir a la playa"
        },
        {
            name: "katerin",
            task: "estudiar Química"
        }
    ];

    try {
        const db = client.db('proyecto');
        const collection = db.collection('task');
        const document = await collection.insertMany(newtask);

        res.send(document);
    } catch (error) {
        console.log('Error', error);
    }
});

app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const db = client.db('proyecto');
        const collection = db.collection('task');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            res.send(`Tarea c ${id} eliminada correctamente.`);
        } else {
            res.send(`La tarea ${id} no fue encontrada.`);
        }
    } catch (error) {
        console.log('Error', error);
        res.status(500).send('Error en el servidor.');
    }
});

app.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedTask = req.body;
    try {
        const db = client.db('proyecto');
        const collection = db.collection('task');
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedTask });

        if (result.matchedCount === 1) {
            res.send(`Tarea ${id} actualizada correctamente.`);
        } else {
            res.send(`La tarea ${id} no fue encontrada.`);
        }
    } catch (error) {
        console.log('Error', error);
        res.status(500).send('Error en el servidor.');
    }
});

app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});








/* mongodb+srv://canoluz2023:<password>@cluster0.bs5s07z.mongodb.net/?retryWrites=true&w=majority */