const express = require('express');
const request = require('request');

const app = express();
const router = express.Router();


const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
const dbContext = require("./data/databaseContext");

var bodyParser = require('body-parser');

var evento = [];
var finalString = "";

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/events', (req, res) => {

    async function run() {
      const events_ = await main();
      //console.log(events_); // will print your data
      res.json({ events_ });
    }
    run();


});

// app.post('/api/events', jsonParser, function(req, res) {
//   console.log(req.body);
//   res.send(req.body.name);
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/api/events", (req, res) => {
  console.log(req.body);
  res.send(req.body.name);
});

// router.post("/api/events", (req, res) => {
//   const actionname = req.body.actionname;
//   const address = req.body.address;
//   const description = req.body.description;
//   const mail = `<p>Name: ${actionname}</p>
//            <p>Email: ${address}</p>
//            <p>Message: ${description}</p>`;
//   window.alert(mail)
// });


async function postEvent()
{
  const { resource: createdItem } = await container.items.create(newItem);

}


async function main() {
  var events = [];
  var finalString = "";
  // <CreateClientObjectDatabaseContainer>
  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);
  // </CreateClientObjectDatabaseContainer>

  try {

    // <QueryItems>
    console.log(`Querying container: Items`);

    // query to return all items
    const querySpec = {
      query: "SELECT * from c"
    };

    // read all items in the Items container
    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();

    items.forEach(item => {
      var toString = JSON.stringify({
        actionid: item.actionid,
        actionname: item.actionname,
        address: item.address,
        description: item.description,
        creatoruserid: item.userid,
        contributionid: item.contributionid,
        coordinates: item.coordinates,
        attendees: item.attendees,
        communityid: item.community,
        isCommunal: item.isCommunal,
        isLocal: item.isLocal,
        isPrivate: item.isPrivate,
        isFlagged: item.isFlagged
      }, null, '\t');
      evento.push(toString);
      events.push(toString);
      finalString = events.join();

    //  console.log('events are ' + evento);
      //return events;
    });

    //return events;
    return items;
}



  catch (err) {
    console.log(err.message);
  }
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
