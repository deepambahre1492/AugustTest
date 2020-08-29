const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bodyParser = require('body-parser');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv = require("dotenv");
dotenv.config();
const { check,validationResult } = require('express-validator');
var cors = require('cors');

router.use(cors());
const User= require('../../models/User');
// @route   POST api/users
// @desc    Test route
// @acess   Public
 
// create application/x-www-form-urlencoded parser
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.post('/',jsonParser,[
check('name','Name is required')
.not()
.isEmpty(),
check('email','Please include a valid email').isEmail(),
check('password','Please enter a password with 6 or more characters')
.isLength({min:6})
],
async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password} =req.body;
    try{
        let user = await User.findOne({email});
        
        if(user){
            res.status(400).json({errors:[{msg:'User already exists'}]});
        }
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        })
        user = new User({
          name,
          email,
          avatar,
          password  
        });

        const salt=await bcrypt.genSalt(10);
        
        user.password = await bcrypt.hash(password,salt);
        
        await user.save();
    
    //See if user exists

    //Get users gravatar

    //Encrypt password

    //Return jsonwebtoken


    const payload={
        user:{
            id: user.id
        }
    }
    jwt.sign(payload,process.env.jwtSecret,
    {expiresIn:360000},
    (err,token)=>{
        if(err) throw err;
        res.json({token});
    });
   }catch(err)
   {
    console.error(err.message);
    res.status(500).send('Server error');
   }
  }
);

module.exports = router;