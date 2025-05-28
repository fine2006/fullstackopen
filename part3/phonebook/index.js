const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
app.use(express.json());
morgan.token("body", function (req, res) {
  const body = JSON.stringify(req.body);
  return body || " ";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);
app.use(cors());

let contacts = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  return String(Math.floor(Math.random() * 10000000 + 5));
};

app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `Phonebook has info for ${contacts.length} people <div>${date.toString()}</div>`,
  );
});

app.get("/api/persons", (request, response) => {
  response.json(contacts);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) {
    response.status(404);
  }
  response.json(contact);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  contacts = contacts.filter((contact) => contact.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({ error: "name is required" }).end();
  } else if (!body.number) {
    return response.status(400).json({ error: "number is required" }).end();
  }
  const fltr = contacts.find((contact) => contact.name === body.name);
  if (fltr) {
    return response.status(400).json({ error: "name must be unique" }).end();
  }
  const contact = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  contacts = contacts.concat(contact);
  response.json(contact);
});

const PORT = process.env.port || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
