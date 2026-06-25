const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function register(req, res){
    try {
        const {name, email, password} = req.body;
        const registeredUser = await User.findOne({
            $or: [{name}, {email}]
        });
        
        if(registeredUser){
            return res.status(400).json({message: 'Nome o email già registrati'});
        }

        const newUser = new User({name, email, password});
        await newUser.save();

        res.status(201).json({
            message: 'Registrazione utente completata',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch(error){
        res.status(500).json({message: 'Internal Server Error'}, error);
    }
};

async function login(req, res){
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({message: 'Unauthorization: email o password non validi'});
        }
        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(401).json({message: 'Unauthorization: email o password non validi'});
        }

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch(error){
        res.status(500).json({message: 'Internal Server Error'}, error);
    }
};

module.exports = {
    register,
    login
}