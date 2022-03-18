import os

from datetime import time, datetime

# get current termcode given date (which is a datetime object)
def get_termcode(date):
    # return the 'year' part of the termcode
    year_termcode = int(date.year) - 1900
    # return the 'month' part of the termcode
    # 1 = Winter; 5 = Spring; 9 = Fall
    month_termcode = 1 if date.month < 5 else 5 if date.month < 9 else 9
    return f"{year_termcode}{month_termcode}"

# get 'default' term
# gets the 'next' term if > 15th day of the starting month of the current term; otherwise returns the current term
# so eg Sept 1 2021 -> 1219 (Fall 2021)
# Sept 16 2021 -> 1221 (Winter 2022)
# Sept 27 2021 -> 1221 (Winter 2022) etc
# this is to make sure the default switches just before course selection
def get_default_term():
    # get the current term and the next term which currently in
    current_termcode = get_termcode(datetime.now())

    return current_termcode

# parse term code into name
# eg 1219 -> "Fall 2021"
def parse_term_code(termcode):
    if termcode != 0:
        season = {'1': 'Winter', '5': 'Spring', '9': 'Fall'}[termcode[3]]
        return f"{season} {int(termcode[0:3]) + 1900}"
    else:
        return "Not Recently Offered"

# get last term code
def get_last_term_code(termcode):
    if termcode[-1] == '9':
        return f"{int(termcode[0:3])}5"
    elif termcode[-1] == '5':
        return f"{int(termcode[0:3])}1"
    else:
        return f"{int(termcode[0:3]) - 1}9"

# parse time string
# HH:MM-HH:MM(days)[MM/DD-MM/DD]
# assume timeString is not None
def parse_time_string(timeString):
    if timeString != "":
        # get start and end time hours
        startTimeHours = int(timeString[0:2])
        startTimeMins = int(timeString[3:5])
        endTimeHours = int(timeString[6:8])
        endTimeMins = int(timeString[9:11])
        # get days of the week
        i = 11
        days = []
        while len(timeString) > i and not timeString[i].isnumeric():
            # tues/thurs
            if timeString[i] == 'T':
                # tues: next char is upper
                if len(timeString) <= i+1 or not timeString[i+1].islower(): 
                    days.append('T')
                    i+=1
                else:
                    days.append('Th')
                    i+=2
            # sat/sun
            elif timeString[i] == 'S':
                # sat: next char is upper
                if len(timeString) <= i+1 or not timeString[i+1].islower(): 
                    days.append('S')
                    i+=1
                else:
                    days.append('Su')
                    i+=2
            # any other days
            else:
                days.append(timeString[i])
                i+=1
        # output result
        return {
            'startTime': {
                'hours': startTimeHours,
                'mins': startTimeMins,
            },
            'endTime': {
                'hours': endTimeHours,
                'mins': endTimeMins,
            },
            'days': days
        }
    else:
        return None
