# Get class schedule data from classes.uwaterloo.ca (both undergrad + grad), store into MongoDB database
# Takes about 20 minutes to run once

from helpers import get_default_term
from pymongo import MongoClient
import os
from dotenv import load_dotenv

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, StaleElementReferenceException
from selenium.webdriver.firefox.options import Options

from get_previous_class_schedules import get_previous_class_schedule

# take env vars from .env file
load_dotenv()

if __name__ == '__main__':
    # get mongodb database using mongo client
    client = MongoClient(os.getenv('MONGO_WRITER_URL'))

    # get all courses from mongo client
    collection = client[os.getenv('DB_NAME')][os.getenv('DB_COLLECTION')]
    courses = list(collection.find({}, {'subjectCode': 1, 'catalogNumber': 1,
                '_id': 0}).sort([('subjectCode', 1), ('catalogNumber', 1)]))
    firefox_options = Options()
    firefox_options.add_argument("--headless")
    driver = webdriver.Firefox(executable_path=os.getenv(
        "DRIVER_PATH"), options=firefox_options)
    try:
        CURRENT_TERM = get_default_term()
        get_previous_class_schedule(driver, client, [CURRENT_TERM])
    finally:
        driver.close()

