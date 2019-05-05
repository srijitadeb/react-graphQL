const express = require ('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
//const schema = require ('./schema/schema_1');
const schema = require('./schema/schema');
//const path = require('')

const app = express();

app.use(cors());
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

//app.use(express.static('public'));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })

app.listen(4000, () => {
    console.log("now port is 4000");
})