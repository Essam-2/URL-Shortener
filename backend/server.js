const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ShortUrl = require("./models/shortUrl");
const validator = require("validator");

const app = express();
const port = 5000;

const uri =
  "mongodb+srv://esamanwar2:url223311sh@url-shortener.kdo6nzj.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await client.close();
  console.log("MongoDB connection closed");
  process.exit(0);
});

connectToDatabase();

app.use(express.urlencoded());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const database = client.db("url-shortener");
    const collection = database.collection("shorturls");
    const shortUrls = await collection.find().toArray();
    res.json({ shortUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/shortUrl", async (req, res) => {
  // console.log("Request Body:", req.body);

  const { fullUrl } = req.body;

  if (!fullUrl || !validator.isURL(fullUrl)) {
    return res.status(400).json({ error: "Invalid URL!" });
  }

  try {
    const database = client.db("url-shortener");
    const collection = database.collection("shorturls");

    const newShortUrl = new ShortUrl({ fullUrl });
    await collection.insertOne(newShortUrl.toObject()); // Save the new instance to MongoDB

    res.status(201).json({ message: "URL created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
