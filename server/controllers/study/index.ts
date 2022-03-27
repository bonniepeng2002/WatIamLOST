import { Response, Request } from "express"
import Study from "../../models/Study"
import argon2 from "argon2";
import Joi from "joi";
import * as jwt from "jsonwebtoken"
import 'dotenv/config'
import User from "../../models/User";

export const addStudySession = async (req: Request, res: Response): Promise<any> => {
  // console.log("trying trying trinyg");
  const roomBooked = await Study.findOne({building : req.body.building, room: req.body.room});
  if (roomBooked) {
    // console.log(req.body.room);
    // console.log(roomBooked);
    res.status(400).send("Room already booked");
  }
  else {
    const studySession = new Study({
      name: req.body.name,
      building: req.body.building,
      room: req.body.room
    });


    try {
      const savedSession = await studySession.save();
      res.send({room:req.body.room});
      // console.log("Successfully added study session");
    }
    catch (err) {
      res.status(400).send(err);
      console.log("err");
    }
  }
}

export const removeStudySession = async (req: Request, res: Response): Promise<any> => {
  // console.log(req.body.building);
  // console.log(req.body.room);
  Study.deleteOne({building : req.body.building, room: req.body.room}).then(function() {
    res.send("successfully deleted")
  }).catch(function() {
    res.status(400).send("couldnt remove from table");
  });
}

export const allCurrentSessions = async (req: Request, res: Response): Promise<any> => {
  // const activeSessions =  Study.find({building: req.body.building})
  // console.log(req.query.building);
  Study.find({building: req.query.building}).then(students => {
    //console.log(students);
    res.send(students);
  }).catch (err => {
    res.status(400).send(err);
    console.log(err);
  })
}

