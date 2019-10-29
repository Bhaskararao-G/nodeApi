const Profession = require('../models/profession');

module.exports = {
    getProfessions(req, res) {
        Profession.find({}).sort({"createdAt": -1}).exec((err, professions)=> {
            console.log('---- get professions');
            if (!err && professions.length > 0) {
                res.status(200).send({
                    success: true,
                    msg: "Professions fetched successfully",
                    professions: professions
                })
            }
        })
    },

    createProfession(req, res) {
        console.log('create profession---',req.body);
        let pro_data = req.body;

        Profession.findOne({name: pro_data.name}, (err, proExists)=> {
            if (!err && proExists != null) {
                res.send({
                   success: false,
                   msg: "Profession already exists" 
                })
            } else {
                Profession.create(req.body, (err, newPro)=> {
                    if (!err && newPro != null) {
                        res.status(200).send({
                            success: true,
                            msg: "Profession created successfully",
                            profession: newPro
                        })
                    }
                })
            }
        })
    },
    delProfession(req, res) {
        console.log('del profession---', req.body);
        let pro_data = req.body;

        Profession.findByIdAndDelete({_id: pro_data.id}, (err)=> {
            if (!err) {
                res.send({
                   success: true,
                   msg: "Profession deleted successfully" 
                })
            } else {
                res.send({
                    success: false,
                    msg: "Something went wrong"
                })
            }
        })
    },
    updateProf(req, res) {
        console.log('update prof---', req.body);
        let pro_data = req.body;

        Profession.update({_id: pro_data.id}, { color: pro_data.color }, (err)=> {
            if (!err) {
                res.send({
                   success: true,
                   msg: "Profession updated successfully" 
                })
            } else {
                res.send({
                    success: false,
                    msg: "Something went wrong"
                })
            }
        })
    }
}