import pandas as pd

data = pd.read_csv("copy.csv")

#Step 1:Remove duplicates according to timestamps
data = data.drop_duplicates(subset=['Timestamp'])
data.reset_index(drop=True, inplace=True)

#Step 2: Remove outliers where relative humidity is >= 90
data = data[data['Humidity'] < 90]

#Step 3: Interploate to fill missing values
data['PM2.5'].interpolate(method='linear', inplace=True)
data['PM10'].interpolate(method='linear', inplace=True)
data['Humidity'].interpolate(method='linear', inplace=True)
data['Temperature'].interpolate(method='linear', inplace=True)

#Step 4: Remove irrelevant data using interquantile range
columns_to_check = ['PM2.5','PM10','Humidity','Temperature']
# Loop through the columns and remove outliers based on IQR
for column in columns_to_check:    
    Q1 = data[column].quantile(0.25)
    Q3 = data[column].quantile(0.75)
    IQR = Q3 - Q1

    # Define the lower and upper bounds for outliers
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    # Remove rows where the column value is an outlier
    data = data[(data[column] >= lower_bound) & (data[column] <= upper_bound)]

# Optionally, you can reset the DataFrame index
data.reset_index(drop=True, inplace=True)

#Step 5: Retime to reduce the volume of dataset
data['Timestamp'] = pd.to_datetime(data['Timestamp'])

data.set_index('Timestamp', inplace=True)
# Resample the data to 1-minute intervals and interpolate missing values
data_resampled = data.resample('1T').mean().interpolate()
data_resampled.reset_index(inplace=True)


#Step 6: Maintain moving average
window_size = 50
data_sma1 = data_resampled['PM2.5'].rolling(window=window_size).mean()
data_sma2 = data_resampled['PM10'].rolling(window=window_size).mean()
data_sma3 = data_resampled['Humidity'].rolling(window=window_size).mean()
data_sma4 = data_resampled['Temperature'].rolling(window=window_size).mean()

data_resampled['SMA2.5'] = data_sma1
data_resampled['SMA10'] = data_sma2
data_resampled['SMAH'] = data_sma3
data_resampled['SMAT'] = data_sma4

data_resampled.to_csv("preprocessed_sensor_data.csv", index=False)
