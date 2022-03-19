import os

from datetime import datetime, timedelta
from dotenv import load_dotenv

import requests
import re
from pymongo import MongoClient, DESCENDING

from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

load_dotenv()

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
