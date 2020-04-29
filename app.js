const express = require("express");
const path = require("path");
const { v4 } = require("uuid");
const app = express();

let CONTACTS = [{ name: "Nikita", value: "Midth", id: v4(), marker: false }];

app.use(express.json());
app.get("/api/contacts", (req, res) => {
  res.status(200).json(CONTACTS);
});
app.post("/api/contacts", (req, res) => {
  console.log(req.body);
  const contact = { ...req.body, id: v4(), marker: false };
  CONTACTS.push(contact);
  res.status(201).json(CONTACTS);
});
app.delete("/api/contacts/:id", (req, res) => {
  CONTACTS = CONTACTS.filter((el) => el.id !== req.params.id);
  res.status(200).json({ messeage: "success delete" });
});
app.put("/api/contacts/:id", (req, res) => {
  const indx = CONTACTS.findIndex((el) => el.id === req.params.id);
  CONTACTS[indx] = req.body;
  res.status(200).json(CONTACTS[indx]);
});

app.use(express.static(path.resolve(__dirname, "client")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "clienSt", "index.html"));
});
app.listen(3000, () =>
  console.log("server has been started on port 3000 ... ")
);
