const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { mockServer, addMockFunctionsToSchema } = require('graphql-tools');
const { formatError} = require('graphql');

const schema = fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8");

const server = mockServer(schema, {
    UUID: () => Date.now(),
    DateTime: () => Date.now()
});

function graphQLFetcher(graphQLParams) {
    let variables = {};
    try {
        variables = JSON.parse(graphQLParams.variables);
    } catch (e) {
        // do nothing
    }
    return server.query(
        graphQLParams.query,
        variables
    ).then((res) => {
        if (res.errors){
            res.errors = res.errors.map(formatError)
        }
        return res;
    });
}


const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/graphql', (req, res) => {
    graphQLFetcher(req.body).then(res.send.bind(res));
});

app.listen(process.env.PORT || 8080);
