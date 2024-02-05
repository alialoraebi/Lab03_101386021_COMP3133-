const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A restaurant must have a name'],
        unique: true
    },
    cuisine: {
        type: String,
        required: [true, 'A restaurant must have a cuisine']
    },
    city: {
        type: String,
        required: [true, 'A restaurant must have a city']
    },
    address: {
        building: {
            type: String,
        },
        street: {
            type: String,
            required: [true, 'A restaurant must have a street']
        },
        zipcode: {
            type: String,
        }
    },
    restaurant_id: {
        type: String,
        required: [true, 'A restaurant must have an id']
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updatedat: {
        type: Date,
        default: Date.now()
    }
});

restaurantSchema.methods.getRestaurant = function () {
    return this.name;
}

restaurantSchema.methods.getRestaurantCuisine = function () {
    return this.cuisine;
}

restaurantSchema.methods.getRestaurantLocation = function () {
    return this.location;
}

restaurantSchema.query.sortRestaurantByName = function () {
    return this.sort({'name': 1});
}

restaurantSchema.pre('save', (next) => {
    console.log("Before Save")
    let now = Date.now()
     
    this.updatedat = now
    if (!this.created) {
      this.created = now
    }
    next()
});

restaurantSchema.post('init', (doc) => {
   console.log('%s has been initialized from the db', doc._id);
});

restaurantSchema.post('validate', (doc) => {
    console.log('%s has been validated (but not saved yet)', doc._id);
});

restaurantSchema.post('save', (doc) => {
    console.log('%s has been saved', doc._id);
});

restaurantSchema.post('remove', (doc) => {
    console.log('%s has been removed', doc._id);
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;


