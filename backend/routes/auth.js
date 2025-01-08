const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "HARRYISWORKINGIN@INDUS";
const fetchUser = require('../middleware/fetchUser')



router.get('/', (req, res) => {
    console.log(req.body);
    res.send("hello")
})
//Route1:: creating a user using: POST "api/auth". Desn't require auth.
router.post('/createuser', [
    body('name', 'Enter name value').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    //if there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check whether user exist or not
    let user = await User.findOne({ email: req.body.email });
    try {

        const salt = bcrypt.genSaltSync(10);
        const secPwd = await bcrypt.hash(req.body.password, salt);

        if (user) {
            return res.status(400).json({ error: "Please try with different email.User already exist with this email" });
        } else {
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPwd,
            })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        //return res.send(user);
        res.json({ authToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some Error Occured");
    }
    /* 
      .then(  user=> res.json(user))
      .catch( error=>{
          console.log(error)
          res.json({error:'Please enter a unique value!!'})
      })
      res.send(req.body);
      console.log(req.body);
      const user = User(req.body);
      user.save();
      res.send("hello")
      */

})
//Route2:: Authenticate a user using: POST "api/login". 
router.post('/login', [
    body('email', 'Please enter valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return req.status(400).json({ error: 'Please try to login with correct credential' })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: 'Please try to login with correct credential' })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        //return res.send(user);
        success = true;
        res.json({ success, authToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server Error");
    }
}
)
//Route 3:: get logged-in user Details using /POST */api/auth/getuser. Login required
router.post('/getuser', fetchUser, [
    body('email', 'Please enter valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    try {
        let userId = req.user.id;
        let user = await User.findById(userId).select("-password");
        res.send(user); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server Error");
    }
})
module.exports = router