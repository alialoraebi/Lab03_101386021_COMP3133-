const express = require('express');
const restaurantModel = require('../models/restaurantModel.js');
const app = express();
const router = express.Router();

app.use(express.json());

module.exports = router;

// All restaurant details
// http://localhost:3000/restaurants
router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await restaurantModel.find();
        res.status(200).json({
            status: 'success',
            results: restaurants.length,
            data: {
                restaurants
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

// All restaurant details by cuisine
// http://localhost:3000/restaurants/cuisine/Italian
// router.get('/restaurants/cuisine/:cuisine', async (req, res) => {
//     try {
//         const restaurants = await restaurantModel.find({ cuisine: req.params.cuisine });
//         res.status(200).json({
//             status: 'success',
//             results: restaurants.length,
//             data: {
//                 restaurants
//             }
//         });
//     } catch (err) {
//         res.status(404).json({
//             status: 'fail',
//             message: err
//         });
//     }
// });

// All restaurant details by id, name, cusine, location
// http://localhost:3000/restaurants/:id
router.get('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await restaurantModel.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                restaurant
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

// Sort by restaurant id in ascending order or descending order based on parameters passed (cusine, location, name)
// http://localhost:3000/restaurants/sort/:sort
router.get('/restaurants/sort/:sort', async (req, res) => {
    try {
        const restaurants = await restaurantModel.find().sort({ [req.params.sort]: 1 });
        res.status(200).json({
            status: 'success',
            results: restaurants.length,
            data: {
                restaurants
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

// Restaurants with cuisine 'Delicatessen' and city not 'Brooklyn'
// http://localhost:3000/restaurants/cuisine/Delicatessen
router.get('/restaurants/cuisine/Delicatessen', async (req, res) => {
    try {
        const restaurants = await restaurantModel.find(
            { 
                cuisine: 'Delicatessen', 
                city: { $ne: 'Brooklyn' } 
            },
            { _id: 0, name: 1, city: 1, cuisine: 1 } // Exclude restaurant_id from the results
        ).sort({ name: 1 }); // Sort by name in ascending order

        res.status(200).json({
            status: 'success',
            results: restaurants.length,
            data: {
                restaurants
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});


// Add a new restaurant
// http://localhost:3000/restaurants
router.post('/restaurants', async (req, res) => {
    try {
        const newRestaurant = await restaurantModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: newRestaurant
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});

//update restaurant details
// http://localhost:3000/restaurants/:id
router.patch('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await restaurantModel.findByIdAndUpdate
            (req.params.id, req.body, {
                new: true,
                runValidators: true
            });
        res.status(200).json({
            status: 'success',
            data: {
                restaurant
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

// Delete restaurant details by id
// http://localhost:3000/restaurants/:id
router.delete('/restaurants/:id', async (req, res) => {
    try {
        await restaurantModel.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});

// delete all restaurants
// http://localhost:3000/restaurants
router.delete('/restaurants', async (req, res) => {
    try {
        await restaurantModel.deleteMany();
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});