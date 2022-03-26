import { Response, Request } from "express"
import { IClass } from "../../types/class"
import { TimeInterval, StartTime, EndTime } from "../../types/time"
import Class from "../../models/class"

import { groupBy } from "../../helpers/groupBy"

// Get list of classes in a specific building code
// /classes/:buildingCode?day=D
// D = M | T | W | Th | F | S | Su
export const getClassesInBuildingCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const day: any = (typeof req.query.day != undefined)
      ? {
        "time.days": { $in: [req.query.day] }
      }
      : {};
    // get list of classes
    const classes: IClass[] = await Class.find({
      "buildingCode": req.params.buildingCode,
      ...day,
    })

    res
      .status(200)
      .json({ classes });
  } catch (err) {
    throw err
  }
}

// Get list of classes in a specific room
// /classes/:buildingCode/:roomNumber?day=D
// D = M | T | W | Th | F | S | Su
export const getClassesInRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    // get list of classes
    const day: any = (typeof req.query.day != undefined)
      ? {
        "time.days": { $in: [req.query.day] }
      }
      : {};

    const classes: IClass[] = await Class.find({
      buildingCode: req.params.buildingCode,
      roomNumber: req.params.roomNumber,
      ...day,
    })

    res
      .status(200)
      .json({ classes });
  } catch (err) {
    throw err
  }
}

// Convert list of time intervals into "free times"
const convertTimeIntervalListIntoFreeTimes = (til: TimeInterval[]) => {

  // get when the time intervals are free
  // sort the time intervals
  const sortedTimes: TimeInterval[] = til.sort((ti1, ti2) => {
    return (ti1.startTime.hours - ti2.endTime.hours)
      || (ti1.startTime.mins - ti2.endTime.mins)
  })

  // take every adjacent pair of time intervals, and calculate
  // the "difference" in the time intervals
  let differences: TimeInterval[] = [];
  // push start -> first
  if (sortedTimes.length !== 0) {
    differences.push({
      startTime: StartTime,
      endTime: sortedTimes[0].startTime,
    })
  }
  else {
    differences.push({
      startTime: StartTime,
      endTime: EndTime,
    })
  }
  // push intermediate differences
  for (let i: number = 0; i < til.length - 1; i++) {
    let fst: TimeInterval = sortedTimes[i];
    let snd: TimeInterval = sortedTimes[i + 1];
    differences.push({
      startTime: fst.endTime,
      endTime: snd.startTime,
    })
  }
  // push last -> end
  if (sortedTimes.length !== 0) {
    differences.push({
      startTime: sortedTimes[sortedTimes.length - 1].endTime,
      endTime: EndTime,
    })
  }

  // filter out any differences that are <= 10 minutes long
  const freeTimes: TimeInterval[] = differences.filter(ti => {
    return (ti.endTime.hours - ti.startTime.hours) * 60
      + (ti.endTime.mins - ti.startTime.mins) > 10
  });

  return freeTimes;
}

// Get list of time intervals where the class is free
// /classes/:buildingCode/:roomNumber/free?day=D
export const getListOfTimesRoomIsFree = async (req: Request, res: Response) => {
  try {
    // get list of classes
    const day: any = (typeof req.query.day != undefined)
      ? {
        "time.days": { $in: [req.query.day] }
      }
      : {};

    const classes: IClass[] = await Class.find({
      buildingCode: req.params.buildingCode,
      roomNumber: req.params.roomNumber,
      ...day,
    })

    // get times
    const times: TimeInterval[] = classes.map(c => {
      return {
        startTime: {
          hours: c.time.startTime.hours,
          mins: c.time.startTime.mins,
        },
        endTime: {
          hours: c.time.endTime.hours,
          mins: c.time.endTime.mins,
        }
      }
    });

    const freeTimes: TimeInterval[] = convertTimeIntervalListIntoFreeTimes(times);

    res.status(200).json({ freeTimes });
  }
  catch (err) {
    throw err;
  }
}

// Get list of time intervals where rooms in a specific building are free
// /classes/:buildingCode/free?day=D
export const getListOfTimesBuildingIsFree = async (req: Request, res: Response) => {
  try {
    // get list of classes
    const day: any = (typeof req.query.day != undefined)
      ? {
        "time.days": { $in: [req.query.day] }
      }
      : {};

    const classes: IClass[] = await Class.find({
      buildingCode: req.params.buildingCode,
      ...day,
    })

    // group classes by room number
    const groupedClasses: { [roomCode: string]: IClass[] } = groupBy(classes, "roomNumber");

    // initialize result: dictionary of roomCodes to lists of 
    // time intervals
    const result: { [roomCode: string]: TimeInterval[] } = {};
    for (let roomCode in groupedClasses) {
      let classes: IClass[] = groupedClasses[roomCode];
      let times: TimeInterval[] = classes.map(c => {
        return {
          startTime: {
            hours: c.time.startTime.hours,
            mins: c.time.startTime.mins,
          },
          endTime: {
            hours: c.time.endTime.hours,
            mins: c.time.endTime.mins,
          }
        }
      });
      let freeTimes: TimeInterval[] = convertTimeIntervalListIntoFreeTimes(times)
      result[roomCode] = freeTimes;
    }

    res.status(200).json({ result });
  }
  catch (err) {
    throw err;
  }
}
