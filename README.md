# README


run `npm install`
then `npm start`

If you want to run a specific experiment, you can run:
`npm run experiment1`
or
`npm run experiment2`

Just like that, you have replicated our experiments. The data collection will happen automatically and will be put into `{FILL IN LATER TRAVIS}` folder.

## Data Collection

Running the experiments will automatically generate data on your machine. This data is collected at intervals of 200 generations. There will also be a button on the screen to capture the data manually.

## Data Analysis

All of the data analysis for the paper is in the analysis folder. The data for this analysis is pulled in directly from the `/experiments/data_product` folder. If this folder is empty, you should run the experiments first.
