import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from math import sqrt

# Load the standard sensor data
standard_data = pd.read_csv('calibration_data.csv', parse_dates=['Date Time'])
standard_data['PM2.5'] *= 1000
standard_data['PM10'] *= 1000
standard_data = standard_data.drop(['Location ID', 'Monitor ID'], axis=1)
standard_data['Date Time'] = standard_data['Date Time'] - pd.to_timedelta('5 hours')

# Load your sensor data
your_sensor_data = pd.read_csv('preprocessed_sensor_data.csv', parse_dates=['Date Time'])
your_sensor_data = your_sensor_data.drop(['SMA2.5', 'SMA10','Humidity','Temperature'], axis=1)

# Merge the two dataframes based on the timestamp
merged_data = pd.merge_asof(your_sensor_data, standard_data, left_on='Date Time', right_on='Date Time')
merged_data = merged_data.dropna()

# Define a linear regression model
regression_model1 = LinearRegression()
regression_model2= LinearRegression()


# Fit the model for PM2.5 calibration
x_PM2_5 = merged_data['PM2.5_x']
y_PM2_5 = merged_data['PM2.5_y']
x_PM2_5=x_PM2_5.values.reshape(-1,1)
y_PM2_5 = y_PM2_5.values.reshape(-1,1)


regression_model1.fit(x_PM2_5, y_PM2_5)

# Fit the model for PM10 calibration
x_PM10 = merged_data['PM10_x']
y_PM10 = merged_data['PM10_y']
x_PM10=x_PM10.values.reshape(-1,1)
y_PM10 = y_PM10.values.reshape(-1,1)

regression_model2.fit(x_PM10, y_PM10)

# Apply the linear regression model to your sensor data
predicted_pm25 = regression_model1.predict(x_PM2_5)
predicted_pm10= regression_model2.predict(x_PM10)

rmse_pm10 = sqrt(mean_squared_error(y_PM10, predicted_pm10))
rmse_pm25 = sqrt(mean_squared_error(y_PM2_5, predicted_pm25))

# Get the coefficients (scaling factors) and intercepts
scaling_factor_pm25 = regression_model1.coef_[0][0]
intercept_pm25 = regression_model1.intercept_[0]

scaling_factor_pm10 = regression_model2.coef_[0][0]
intercept_pm10 = regression_model2.intercept_[0]

r_squared_pm25 = r2_score(y_PM2_5, predicted_pm25)

r_squared_pm10 = r2_score(y_PM10, predicted_pm10)


# Print R-squared values
print("R-squared (PM10):", r_squared_pm10)
print("R-squared (PM2.5):", r_squared_pm25)


print("Scaling Factor (PM10):", scaling_factor_pm10)
print("Offset (PM10):", intercept_pm10)

print("Scaling Factor (PM2.5):", scaling_factor_pm25)
print("Offset (PM2.5):", intercept_pm25)


print("RMSE (PM10):", rmse_pm10)
print("RMSE (PM2.5):", rmse_pm25)


# Create scatter plots
plt.figure(figsize=(12, 6))
plt.scatter(x_PM2_5, y_PM2_5, color='b', label='PM2.5 Calibration')
plt.plot(x_PM2_5, predicted_pm25, label='Regression Line', color='red')
plt.xlabel('Your Sensor PM2.5')
plt.ylabel('Calibrated PM2.5')
plt.legend()
plt.title('PM2.5 Calibration')

# Save the PM2.5 scatter plot as an image
plt.savefig('scatter_pm2.5.png')

# Create scatter plot for PM10
plt.figure(figsize=(12, 6))
plt.scatter(x_PM10, y_PM10, color='g', label='PM10 Calibration')
plt.plot(x_PM10, predicted_pm10, label='Regression Line', color='red')
plt.xlabel('Your Sensor PM10')
plt.ylabel('Calibrated PM10')
plt.legend()
plt.title('PM10 Calibration')
plt.savefig('scatter_pm10.png')
# Plot PM2.5 sequentially from both SDS and calibration.csv
plt.figure(figsize=(12, 6))
plt.plot(merged_data['Date Time'], merged_data['PM2.5_x'], label='SDS011 PM2.5', color='magenta')
plt.plot(merged_data['Date Time'], merged_data['PM2.5_y'], label='Aero Sensor PM2.5', color='orange')
plt.plot(merged_data['Date Time'], predicted_pm25, label='Predicted PM2.5', color='purple')
plt.xlabel('Timestamp')
plt.ylabel('PM2.5 (µg/m³)')
plt.legend()
plt.title('Predicted PM2.5 Readings')
plt.savefig('Calibration.png')

plt.figure(figsize=(12, 6))
plt.plot(merged_data['Date Time'], merged_data['PM10_x'], label='SDS011 PM10', color='magenta')
plt.plot(merged_data['Date Time'], merged_data['PM10_y'], label='Aero Sensor PM10', color='orange')
plt.plot(merged_data['Date Time'], predicted_pm10, label='Calibrated PM10', color='purple')
plt.xlabel('Timestamp')
plt.ylabel('PM10 (µg/m³)')
plt.legend()
plt.title('Predicted PM10 Readings')
plt.savefig('Calibration2.png')