const User = require('../models/users');
const Job = require('../models/job');
const jwt = require('jsonwebtoken');

module.exports = {
    getJobs(req, res) {
      Job.find({}).populate('user').populate('type').exec((err, jobs) => {
        if (!err) {
          res.send({
            success: true,
            msg: "Jobs fetched successfully",
            jobs
          })
        } else {
          res.send({
            success: false,
            msg: "Something went wrong"
          });
        }
      })
    },
    createJob(req, res) {
      Job.create(req.body, (err, new_job) => {
        if (!err) {
          var pop_job = new_job.populate('user').populate('type').execPopulate();
          pop_job.then(doc => {
            res.send({
              success: true,
              msg: "Job created successfully",
              job: doc
            })
          });
        } else {
          res.send({
            success: false,
            msg: "Something went wrong"
          });
        }
      })
    },
}