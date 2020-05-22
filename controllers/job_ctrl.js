const User = require('../models/users');
const Job = require('../models/job');
const jwt = require('jsonwebtoken');
const multer = require('multer');
var path = require('path')

var DIR = './uploads';

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, DIR);
	},
	filename: function (req, file, cb) {  
		cb(null, 'lj-' + file.originalname);
	}
})

// let upload = multer({ storage: storage }).single('image');
const upload = multer({ storage: storage }).array('images', 4);

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
      upload(req, res, function (err) {
        var images = [], image = "";
        if (req.files) {
          req.files.forEach(elm => {
            images.push(elm.filename);
          });
        } else {
          image = req.file.filename;
        }
        if (err) {
          return res.status(422).send("Error in image upload")
        }
        var job = new Job({
          title: req.body.title,
          description: req.body.description,
          type: req.body.type,
          user: req.body.user,
          location: req.body.location,
          images: req.files ? images.toString() : image
        });

        job.save(req.body, (err, new_job) => {
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
      }) 
    },
    jobDetails(req, res) {
      Job.findOne({ _id: req.params.job_id }, (err, job) => {
        if (!err) {
          var pop_job = job.populate('user').populate('type').execPopulate();
          pop_job.then(doc => {
            res.send({
              success: true,
              msg: "Job details",
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
    }
}