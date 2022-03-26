import { Response, Request } from "express"
import User from "../../models/User"
import argon2 from "argon2";
import Joi from "joi";
import * as jwt from "jsonwebtoken"
import 'dotenv/config'

const signUpValidation = (data:any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  });
  //validate user entry
  return schema.validate(data);
}

const loginValidation = (data:any) => {
  const schema = Joi.object({
    //name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  });
  //validate user entry
  return schema.validate(data);
}

export const authSignup = async (req: Request, res: Response): Promise<any> => {
  //console.log(req.body);
  const {error} = signUpValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //password hashing
  const passwordHash = await argon2.hash(req.body.password);

  //check if user is not unique
  const emailExists = await User.findOne({email: req.body.email});
  if (emailExists) {
    return res.status(400).send("Email already exists");
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: passwordHash
  });
  //console.log("hello");
  try {
    const savedUser = await user.save();
    res.send({user:savedUser._id});
  } catch (err) {
    res.status(400).send(err);
    console.log("err");
  }
}

export const authLogin = async (req: Request, res: Response): Promise<any> => {

  //validate user entry

  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //password hashing
  const passwordHash = await argon2.hash(req.body.password);

  //check if user email already exists
  const userindb = await User.findOne({email: req.body.email});
  if (!userindb) {
    return res.status(400).send("Email not found");
  }

  const validPassword = await argon2.verify(userindb.password,req.body.password);
  if (!validPassword) return res.status(400).send("Invalid password");


  //token stuff
  const jwtSecret: string = process.env.TOKEN_SECRET ?? ""
  //const token = jwt.sign({_id: userindb._id},jwtSecret);
  const token = userindb._id;
  res.send(token);
  //res.header('auth-token',token).send(token);

}

export const findUser = async (req: Request, res: Response): Promise<any> => {
  User.findById(req.body.id,(error:any,data:any) => {
    console.log(req.body.id);
    if (error) {
      console.log(error);
      res.status(400).send("Can't find user");
    }
    else {
      console.log(data);
      res.send(data);
    }
  })

}