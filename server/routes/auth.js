

const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const dotenv=require('dotenv').config();

const router = express.Router();
JWT_SECRET="virajisgenius"
router.post('/createuser',

    [body('name', "Enter valid name").isLength({ min: 3 }),
    body('email', "Enter valid email").isEmail(),
    body('password', "Enter valid password").isLength({ min: 5 }),
    ],

    async (req, res) => {
        const errors = validationResult(req);
        let success=false;
        if (!errors.isEmpty()) {
            
            return res.status(400).json({ success,errors: errors.array() });
        }


        try {
            let user = await User.findOne({ email: req.body.email });

            if (user) {
                
                return res.status(400).json({success, error: "Email already exists" });
            }


            //we Are using salt for the security of the hash value 

            const salt = await bcrypt.genSaltSync(10);

            secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,

            });

            data = {

                user: {

                    id: user.id
                }
            }

            var authtoken = jwt.sign(data, JWT_SECRET);


            // res.send(user);
            success=true;   
            res.json({ success, authtoken });

        } catch (error) {

            console.error(error.message);
            res.status(500).send(success,"Some error occured");
        }



    })





// authenticate user using post method by route "/api/auth/login" 

router.post('/login',

    [
        body('email', "Enter valid email").isEmail(),
        body('password', "Dont enter a blank value ").exists(),  //exists() used for user to not enter a  blank value
    ],


    async (req, res) => {
        const errors = validationResult(req);
        let success=false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }



        const { email, password } = req.body;

        try {

            const user = await User.findOne({ email });

            if (!user) {
                success=false;
                return res.status(400).json({success, error: "please login with correct credential" });
            }

            const comparePassword = await bcrypt.compare(password, user.password);

            if (!comparePassword) {
                success=false
                return res.status(400).json({success, error: "please login with correct credential" });

            } else {


                data = {

                    user: {

                        id: user.id
                    }
                }

                var authtoken = jwt.sign(data, JWT_SECRET);


                // res.send(user);
                success=true;
                res.json({success, authtoken });

            }
        } catch (error) {

            console.error(error.message);
            res.status(500).send("Internal server error");
        }



    }
)


//relogin to the account


router.post('/getuser', fetchuser ,async (req, res) => {


        try {


            userId=req.user.id;
            
            const user = await User.findById(userId).select("-password");

            res.send(user);

        }  catch (error) {

            console.error(error.message);
            res.status(500).send("Internal server error");
        }

    })


module.exports = router;
