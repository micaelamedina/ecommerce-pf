const axios = require("axios");

const optionsCategoriesList = {
  method: "GET",
  url: "https://apidojo-forever21-v1.p.rapidapi.com/categories/v2/list",
  headers: {
    "X-RapidAPI-Host": "apidojo-forever21-v1.p.rapidapi.com",
    "X-RapidAPI-Key": "324a0d5d1emshad70a2c958f1e4cp140a43jsn270daa51ceb2",
  },
};


module.exports = {
  optionsCategoriesList,
}
