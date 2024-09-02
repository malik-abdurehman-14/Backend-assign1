const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

let item = [
  {
    id: 1,
    name: "Item 1",
    description: "This is the first item.",
  },
  {
    id: 2,
    name: "Item 2",
    description: "This is the second item.",
  },
];

app.post("/items", (req, res) => {
  fs.readFile("item.json", (error, data) => {
    if (error) {
      console.log("error in reading file!!");
    }
    if (data) {
      item = JSON.parse(data);
    }
    item.push(req.body);

    fs.writeFile("item.json", JSON.stringify(item), (error) => {
      if (error) {
        console.log("error while creating file");
      } else {
        console.log(`File created successfully!`, item);
        res.send(item);
      }
    });
  });
});

app.get("/items", (req, res) => {
  fs.readFile("item.json", (error, data) => {
    if (error) {
      console.log("error in reading file!!!");
    } else {
      const readData = JSON.parse(data);
      console.log("reading file...", readData);
      res.send(readData);
    }
  });
});

app.get("/itemById/:id", (req, res) => {
  fs.readFile("item.json", (error, data) => {
    if (error) {
      console.log("error in reading itemById!!!");
    } else {
      const readById = JSON.parse(data);
      const itemById = readById.find((i) => {
        return i.id == parseInt(req.params.id);
      });
      console.log("Item By Id: ", itemById);
      res.send(itemById);
    }
  });
});

app.patch("/itemUpdate/:id", (req, res) => {
  fs.readFile("item.json", (error, data) => {
    if (error) {
      console.log("Error in reading to update file!!");
    } else {
      const itemList = JSON.parse(data);
      const updateIndex = itemList.findIndex((i) => {
        return i.id == parseInt(req.params.id);
      });
      itemList[updateIndex] = { ...itemList[updateIndex], ...req.body };

      fs.writeFile("item.json", JSON.stringify(itemList), (error) => {
        if (error) {
          console.log("error in writing file after updation!!");
        } else {
          console.log("file after updation: ", itemList);
          res.send(itemList);
        }
      });
    }
  });
});

app.delete("/itemDel/:id", (req, res) => {
  fs.readFile("item.json", (error, data) => {
    if (error) {
      console.log("error in reading file to delete item!!!");
    } else {
      const itemList = JSON.parse(data);
      const del = itemList.filter((i) => {
        return i.id !== parseInt(req.params.id);
      });
      fs.writeFile("item.json", JSON.stringify(del), (error) => {
        if (error) {
          console.log("error in writing in file after deletion!!!");
        } else {
          console.log("Items after deletion: ", del);
          res.send(del);
        }
      });
    }
  });
});
const port = 3000;
app.listen(port, () => {
  console.log(`yoho server running on ${port} port!!!`);
});
