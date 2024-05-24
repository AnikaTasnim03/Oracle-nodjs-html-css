const express = require('express');
const cors=require('cors')
const app=express();
//const run=require('./database.js');
const bodyParser=require('body-parser')

const oracledb = require('oracledb');

const dbConfig = {
        user: 'sys',
        password: 'mist@cse',
        connectString: 'localhost:1521/orcl', // e.g., 'localhost:1521/ORCL'
        privilege: oracledb.SYSDBA
  };
  


app.use(cors());
app.use(bodyParser.json());




app.get('/items', async(req,res)=>{
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM item');
        res.json(result.rows);
        await connection.close();
      } catch (error) {
        res.status(500).json({ error: 'Error fetching items' });
      }
})


app.post('/items', async (req, res) => {
    try {
      const { name, description } = req.body;
      const connection = await oracledb.getConnection(dbConfig);
      await connection.execute('INSERT INTO Item (name, description) VALUES (:name, :description)', [name, description]);
      await connection.execute('commit');
      res.status(201).json({ message: 'Item created successfully' });
      await connection.close();
    } catch (error) {
      res.status(500).json({ error: 'Error creating item' });
    }
  });


app.listen(3000,()=>{
    console.log('Server is running at port 3000');

})
