const Service = require("../models/service-model");

const services = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      // handle data when document was not found
      res.status(404).json({ msg: "No Service found" });
      return;
    }
    return res.status(200).json({ msg: response });
  } catch (error) {
    console.log(`services: ${error}`);
  }
};

module.exports = services;
