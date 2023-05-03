const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const name = req.body.name.replace(/\s+/g, "-").toLowerCase();
    const uploadPath = path.join("uploads", name);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  const { name, phone, email, description } = req.body;
  const image = req.file;

  try {
    const nameSlug = name.replace(/\s+/g, "-").toLowerCase();
    const uploadPath = path.join("uploads", nameSlug);
    const descriptionPath = path.join(uploadPath, "description.txt");
    const content = `Név: ${name}\nTelefonszám: ${phone}\nE-mail cím: ${email}\nLeírás: ${description}`;
    fs.writeFileSync(descriptionPath, content);

    res.send("Kép és adatok sikeresen mentve.");
  } catch (error) {
    console.error("Hiba a kép és adatok mentése közben:", error);
    res.status(500).send("Hiba történt a kép és adatok mentése közben.");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
