const { mongoose } = require("mongoose");

const placeSchema = mongoose.Schema({//obj relational mapping
    name: {
        type: String,
        required: true
    },
    location_coord: {
        type: String,
        required: true
    },
    surface: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    apartment: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
  
});

const Place=mongoose.model("Place", placeSchema);
exports.Place=Place;//daca nu fac export nu pot sa fac import in alt loc