require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const port = process.env.HTTP_PORT;
const app = express();
const router = require('./routes/route');
const cors = require('cors')
//swagerr
const swaggerUi = require('swagger-ui-express');
// const YAML = require('yamljs')
const swagerrJSON = require('./apiDocs.json')

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/images', express.static('images'))
app.use(morgan('dev'));     
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagerrJSON))



app.use(router)

app.listen(port, () => console.log('listening on port', port));