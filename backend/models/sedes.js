const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let SedesSchema = Schema ({
    name: { type: String, required: true, max: 100 },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true, max: 100 },
    address: { type: String, required: true, max: 100 },
    zipcode: { type: String, required: true, max: 100 },
    owners: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    active: { type: Boolean, required: true }
});

module.exports = mongoose.model('Sede', SedesSchema);
