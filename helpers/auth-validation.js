const Joi = require('@hapi/joi');

//Signup Validation
const signUpValidation = data => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    //validate user entry
    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        //name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    //validate user entry
    return schema.validate(data);
}

module.exports.signUpValidation = signUpValidation;
module.exports.loginValidation = loginValidation;