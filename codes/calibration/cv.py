import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from scipy import stats


data = pd.read_csv("thingspeak_data.csv")

pm25_values = data['PM2.5']
pm10 = data['PM10']
# Calculate the mean and standard deviation
mean_pm25 = np.mean(pm25_values)
std_dev_pm25 = np.std(pm25_values)

mean_pm10 = np.mean(pm10)
std_dev_pm10= np.std(pm10)

# Calculate the coefficient of variation
cv = (std_dev_pm25 / mean_pm25) * 100
cv2=(std_dev_pm10/mean_pm10)*100



print(f"Coefficient of Variation (CV) for PM2.5 data: {cv:.2f}%")
print(f"Coefficient of Variation (CV) for PM10 data: {cv2:.2f}%")
