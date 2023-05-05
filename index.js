require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.get("/", async (req, res) => {
  try {
    const location = req.query.location;
    const price = req.query.price;
    console.log(location, price);
    if (!location || !price) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.yelp.com/v3/businesses/search?location=${location}&limit=10&price=${price}`,
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    };

    const data = await axios.request(config);
    let responseData = JSON.stringify(data.data);
    responseData = JSON.parse(responseData);

    return res.status(200).json({
      success: true,
      message: "Data Fetched",
      data: responseData["businesses"],
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      error,
      message: "You have entered some invalid data",
    });
  }
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Port Started");
});