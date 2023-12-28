import requests
import json
import csv
import pandas as pd
import numpy as np
import time as tm
  
channel_id = "2261084"
api_key = "IWI6WSPHJ6GZ72NP"

url = f"https://api.thingspeak.com/channels/{channel_id}/feeds.json?api_key={api_key}"

with open("thingspeak_data.csv", mode='a', newline='') as csv_file:
    csv_writer = csv.writer(csv_file)

    csv_writer.writerow(["Timestamp","PM2.5", "PM10","Humidity","Temperature"])

while True:    

    response = requests.get(url)
    data = response.json()

    # Extract the relevant data from the JSON response
    entries = data['feeds']
    

    csv_file_name = "diwali.csv"


    with open(csv_file_name, mode='a', newline='') as csv_file:
        # Create a CSV writer object
        csv_writer = csv.writer(csv_file)

        # Write the header row

        # for entry in entries:
        entry = entries[-1]

        date = entry['created_at'][0:10]
        time = entry['created_at'][11:19]
        timestamp = date+ ' ' + time
        # Access individual fields in each entry
        field1_value = entry['field1']
        field2_value = entry['field2']
        field3_value = entry['field3']
        field4_value = entry['field4']

        csv_writer.writerow([timestamp,field1_value, field2_value,field3_value,field4_value])
        tm.sleep(60)



        # Do something with the data (print, store, analyze, etc.)
    print(f"Data has been saved to {csv_file_name}")







