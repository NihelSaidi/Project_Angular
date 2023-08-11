//import express
const express = require('express');
//import mongoose
const mongoose = require('mongoose');
//importation de model user
const User = require('./models/user');
const Plat = require('./models/plat');




const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');

const multer = require("multer");
const path= require ("path");
const plat = require('./models/plat');

//creation de l'app express
const app = express();

//Integration bodyParser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//accés fichier
app.use('/images', express.static(path.join('backend/images')));



//Connect to database
mongoose.connect('mongodb://localhost:27017/meanFev22', { useNewUrlParser: true, useUnifiedTopology: true });

// Security Configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

//multer config *****************************************************

const MIME_TYPE ={
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg',
}

//******************************************************************** */

// Create User
app.post("/api/users", (req, res) => {

    console.log("here in create user", req.body); // bch yokhrejli fi serveur mta3 back

    let user = {};
    User.findOne({ email: req.body.email }).then(
        (resultEmail) => {

            if (resultEmail) {
                res.status(200).json({
                    message: "that email has already registered ,please use a different email"
                });
            }

            else {

                bcrypt.hash(req.body.password, 10).then(cryptedPwd => {

                    if (req.body.role == "chef") {
                        user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: cryptedPwd,
                            tel: req.body.tel,
                            role: req.body.role,
                            speciality: req.body.speciality,
                            experience: req.body.experience,

                            dateOfBirth: req.body.dateOfBirth
                        });
                    }

                    else {
                        user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: cryptedPwd,
                            tel: req.body.tel,
                            role: req.body.role
                        });
                    }

                    //sauvegarde (save()est une foncion prédéfinies du mongodb) 
                    user.save();
                    //retour de la requete (reponse)
                    // 200 status de cuccès de la req
                    res.status(200).json({
                        message: "User created"
                    })
                })
            }
        }
    )

});

// Get all users
app.get("/api/users", (req, res) => {
    console.log("Here in get all users");

    User.find((err, docs) => {
        if (err) {
            console.log('Error in DB');
        }
        else {
            res.status(200).json({
                users: docs
            });
        }
    });
});

// delete user
app.delete("/api/deleteUser/:id", (req, res) => {
    console.log("here in delete user");

    let id;
    id = req.params.id;
    console.log(id);

    User.findOne({ _id: id }).then(
        (doc) => {
            console.log(doc);

            if(doc.role == "chef"){
                //suppression des plats
                plat.deleteMany({idChef: doc._id}).then(
                    (result)=>{
                        console.log(result);
                            if(result){
                                res.status(200).json({
                                    message : "delete with success"
                                })
                            };
                    }

                )
            }
            User.deleteOne({ _id: id }).then(
                (result) => {
                    console.log(result);
                    if (result) {
                        res.status(200).json({
                            message: "Delete with success"
                        })
                    }
        
                }
            )
        }
    )

   
})


//get user by id
app.get("/api/users/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);

    //search
    User.findOne({ _id: id }).then(
        (doc) => {
            console.log(doc);

            //success to front
            res.status(200).json({
                user: doc
            })
        }
    )


})



//login 
app.post("/api/login", (req, res) => {
    console.log("Here in login", req.body);

    User.findOne({ email: req.body.email }).then(
        (resultEmail) => {
            console.log("resultEmail", resultEmail);
            if (!resultEmail) {
                res.status(200).json({
                    findedUser: "Wrong Email"
                });
            }

            return bcrypt.compare(req.body.password, resultEmail.password);
        })
        .then(
            (resultPwd) => {
                console.log("resultPwd", resultPwd);
                if (!resultPwd) {
                    res.status(200).json({
                        findedUser: "Wrong password"
                    });
                }
                else {
                    User.findOne({ email: req.body.email }).then(
                        (result) => {
                            console.log("result", result);
                            res.status(200).json({
                                findedUser: result
                            })
                        }
                    )
                }

            })
});


// Create plat
app.post("/api/plats", (req, res) => {

    console.log("here in create plat", req.body); // bch yokhrejli fi serveur mta3 back

   
    // let connectedUser=JSON.parse(getItem("connectedUser"));

    Plat.findOne({ platName:req.body.platName,idChef:req.body.idChef},(err,doc)=>
         {
        if (!doc) {
            //not existe
            let plat = {};
             plat = new Plat({
                platName: req.body.platName, //request bch thezlk données mta3ek 
                price: req.body.price,
                description: req.body.description,
                idChef: req.body.idChef
            });
        
        
        
            //sauvegarde (save()est une foncion prédéfinies du mongodb) 
            plat.save();
            //retour de la requete (reponse)
            // 200 status de succès de la req
            res.status(200).json({
                message: "plat created"
            })
        }
        else {
            //existe
            res.status(200).json({
                message:"plat already exist"
            })
        }

    })
   

});

// Get all plats
app.get("/api/plats", (req, res) => {
    console.log("Here in get all plats");

    Plat.find((err, docs) => {
        if (err) {
            console.log('Error in DB');
        }
        else {
            res.status(200).json({
                plats: docs
            });
        }
    });
});


//get myplats by idChef
app.get('/api/myPlats/:id', (req, res) => {
    let id = req.params.id;
    console.log('here in get my plats');

    //search
    Plat.find({ idChef: id }, (err, docs) => {
        if (err) {
            console.log('Error in DB');
        }
        else {
            res.status(200).json({
                plats: docs
            });
        }

    })


})

// delete user
app.delete("/api/deletePlat/:id", (req, res) => {
    console.log("here in delete plat");

    let id;
    id = req.params.id;
    console.log(id);

    Plat.deleteOne({ _id: id }).then(
        (result) => {
            console.log(result);
            if (result) {
                res.status(200).json({
                    message: "Delete with success"
                })
            }

        }
    )
})


//get user by id
app.get("/api/plats/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);

    //search
    Plat.findOne({ _id: id }).then(
        (doc) => {
            console.log(doc);

            //success to front
            res.status(200).json({
                plat: doc
            })
        }
    )


})

//update user
app.put('/api/users/:id', (req, res) => {

    let id = req.params.id;
    console.log(id);
    let user;

    bcrypt.hash(req.body.password, 10).then(cryptedPwd => {
        if (req.body.role == "chef") {
            user = {
                _id: req.body._id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: cryptedPwd,
                role: req.body.role,
                tel: req.body.tel,
                speciality: req.body.speciality,
                dateOfBirth: req.body.dateOfBirth,

            }
        }
        else {
            user = {
                _id: req.body._id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                tel: req.body.tel,


            }
        }


        //search
        User.updateOne({ _id: id }, user).then(
            (result) => {
                if (result) {

                    //success to front
                    res.status(200).json({
                        message: "updated with succes"
                    })
                }
            }
        )

      })


})



//export app
module.exports = app;