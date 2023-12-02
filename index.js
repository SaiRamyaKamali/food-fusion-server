require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();


app.use(cors());
app.get("/", async (req, res) => {
  try {
    const location = req.query.location;
    const price = req.query.price;
    const cuisine = req.query.cuisine;
    if (!location || !price) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    console.log('before config')
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.yelp.com/v3/businesses/search?location=${location}&limit=10&price=${price}&categories=${cuisine}&attributes=${cuisine}&term=${cuisine}&sort_by=best_match`,
      headers: {
        Authorization: `Bearer 6EmflDRbvXYX2nzlobfnoCUq8ikSBU45eDOQuYhiNhhyTO5hg0c2HBd0JxUadfm93o1xQLO7Q8E5v_xPww3sKNh91i4YrIQe5rf5tlpQmwv2PFV23BYkOu9oRwNUZHYx`,
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
  console.log(`Port Started ${port}`);
});