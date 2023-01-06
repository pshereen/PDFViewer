const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const fs = require("fs").promises;

const app = express();
app.use(bodyparser.json());
app.use(cors());
app.use("/docs", express.static('public/Folder9/SamplePDF1.pdf'))

app.post("/openfolder", async (req, res) => {
  const folders = await fs.readdir(req.body.foldername);
  console.log(req.body.foldername)
  console.log(folders)
  res.send({
    folders
  });
});

app.get("/downloadfile", (req, res) => {
  const filename = req.query.link;
  res.download(filename);
});


app.listen(process.env.PORT || 8081);
