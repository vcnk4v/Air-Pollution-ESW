import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_csv("reversed_output.csv")  # Replace "cleaning.csv" with your CSV file path

window_size = 5

# Use a moving average to smooth the curve
temperature = data['Temperature']
humidity = data['Humidity']
pm25 = data['PM2.5']
pm10 = data['PM10']
datetime = data['Time']

smooth_temperature = temperature.rolling(window=window_size).mean()
smooth_h = humidity.rolling(window=window_size).mean()
smoothpm25 = pm25.rolling(window=window_size).mean()
smooth_pm10 = pm10.rolling(window=window_size).mean()

# Define safe, moderate, and dangerous levels for PM2.5 and PM10
safe_pm25 = 50
moderate_pm25 = 120
dangerous_pm25 = 200
extreme2 = 400
selected_times=['2023-11-12 19:00:00','2023-11-12 20:00:00','2023-11-12 21:00:00','2023-11-12 22:00:00','2023-11-12 23:00:00','2023-11-13 00:00:00','2023-11-13 01:00:00','2023-11-13 02:00:00','2023-11-13 03:00:00','2023-11-13 04:00:00','2023-11-13 05:00:00']

safe_pm10 = 100
moderate_pm10 = 300
dangerous_pm10 = 500
extreme1=600

# Create subplots for Temperature and Humidity
fig, axs = plt.subplots(2, 1, figsize=(10, 10), sharex=True)
# Plot Temperature
axs[0].plot(datetime, smooth_temperature, label='Temperature', color='red')
axs[0].set_ylabel('Temperature')
plt.xticks([time for time in datetime if time in selected_times], rotation=40, ha='right')

axs[0].set_ylim(26, 30)  # Replace 26 and 30 with your desired range
axs[0].legend()

# Plot Humidity
axs[1].plot(datetime, smooth_h, label='Humidity', color='blue')
plt.xticks([time for time in datetime if time in selected_times], rotation=40, ha='right')

axs[1].set_ylabel('Humidity')
axs[1].legend()

plt.savefig("diwali_temp.png")

# Show the plot
plt.show()

# Plot PM2.5 and PM10
plt.figure(figsize=(10, 6))

# Plot PM2.5 in blue
plt.plot(datetime, smoothpm25, label='PM2.5', color='blue')

# Plot PM10 in red
plt.plot(datetime, smooth_pm10, label='PM10', color='black')

plt.xlabel('Time')
plt.ylabel('Concentration')
plt.title('Diwali PM2.5 and PM10')
plt.xticks([time for time in datetime if time in selected_times], rotation=40, ha='right')

plt.legend()

# Shade regions for PM2.5
plt.axhline(y=safe_pm25, color='green', linestyle='-', label='Safe PM2.5')
plt.axhline(y=moderate_pm25, color='yellow', linestyle='-', label='Moderate PM2.5')
plt.axhline(y=dangerous_pm25, color='orange', linestyle='-', label='Dangerous PM2.5')
plt.axhline(y=extreme2, color='red', linestyle='-', label='Extreme PM2.5')
plt.axhline(y=safe_pm10, color='green', linestyle='--', label='Safe PM10')
plt.axhline(y=moderate_pm10, color='yellow', linestyle='--', label='Moderate PM10')
plt.axhline(y=dangerous_pm10, color='orange', linestyle='--', label='Dangerous PM10')
plt.axhline(y=extreme1, color='red', linestyle='--', label='Extreme PM10')

# Shade regions for PM10

plt.savefig("diwali_poll.png")

# Show the plot
plt.show()
