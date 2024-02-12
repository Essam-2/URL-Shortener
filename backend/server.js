const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { ObjectId } = require("mongodb");
const ShortUrl = require("./models/shortUrl");
const validator = require("validator");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors({ origin: "http://localhost:4200" }));

const uri = process.env.MONGODB_URI;

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

app.delete("/deleteShortUrl/:id", async (req, res) => {
  const database = client.db("url-shortener");
  const collection = database.collection("shorturls");

  const id = req.params.id;

  try {
    const objectId = new ObjectId(id);
    const result = await collection.deleteOne({ _id: objectId });
    if (result.deletedCount === 1) {
      return res
        .status(200)
        .json({ message: "Short URL deleted successfully" });
    } else {
      return res.status(404).json({ message: "Short URL not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/:shortUrl", async (req, res) => {
  const database = client.db("url-shortener");
  const collection = database.collection("shorturls");

  const shortUrl = req.params.shortUrl;
  try {
    const url = await collection.findOne({ shortUrl });
    if (url) {
      const updatedUrl = await collection.updateOne(
        { shortUrl },
        { $inc: { clicks: 1 } } // Increment clicks
      );
      if (updatedUrl.modifiedCount > 0) {
        return res.redirect(url.fullUrl);
      } else {
        return res
          .status(500)
          .json({ message: "Failed to update clicks count" });
      }
    } else {
      return res.status(404).json({ message: "Short URL not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
