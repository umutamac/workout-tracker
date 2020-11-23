const router = require("express").Router();
const Workout = require("../models/workoutModel");

router.get("/api/workouts", (req, res) => {
    Workout.find().then(workout => {
        console.log('workout==>>', workout)
        res.json(workout);
    }).catch(err => {
        console.log('err==>>', err)
    })
});

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body).then(workout => res.json(workout));
});

router.put("/api/workouts/:id", (req, res) => {
    let workoutID = req.params.id;
    Workout.findByIdAndUpdate({ _id: workoutID },
        {
            $set: {
                exercises: [{
                    type: req.body.type,
                    name: req.body.name,
                    distance: req.body.distance,
                    weight: req.body.weight,
                    sets: req.body.sets,
                    reps: req.body.reps,
                    duration: req.body.duration
                }]
            }
        })
        .then(workout => {
            res.json(workout);
        });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find().then(workout => {
        res.json(workout);
    })
})


module.exports = router;