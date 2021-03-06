const express = require('express');
const override = require('method-override');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const db = require('./models');

let port = process.env.PORT || 8080;

const app = express();

app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(override('_method'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/', require('./controllers/burgers_controller.js'));
app.use('/customers', require('./controllers/customer_controller.js'));

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Listening on PORT ${port}`);
  });
});
