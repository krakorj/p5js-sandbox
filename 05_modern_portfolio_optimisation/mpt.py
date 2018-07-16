#
# Src: 
#   https://medium.com/python-data/effient-frontier-in-python-34b0c3043314
#   http://www.bradfordlynch.com/blog/2015/12/04/InvestmentPortfolioOptimization.html
#

# import needed modules
# import quandl
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# tickers
selected = ['SPY', 'MSFT', 'F', 'INTC', 'GE', 'CM']

# get adjusted closing prices of 5 selected companies with Quandl
# quandl.ApiConfig.api_key = 'zcfJ6696mcZScjzsyeta'
# data = quandl.get_table('WIKI/PRICES', ticker = selected,
#                         qopts = { 'columns': ['date', 'ticker', 'adj_close'] },
#                         date = { 'gte': '2014-1-1', 'lte': '2016-12-31' }, paginate=True)
csv = pd.read_csv('data.csv', sep=";")
data = csv.drop('Date', axis=1)
#print csv

# reorganise data pulled by setting date as index with
# columns of tickers and their corresponding adjusted prices
#clean = data.set_index('date')
#table = clean.pivot(columns='ticker')


# calculate daily and annual returns of the stocks
# returns_daily = table.pct_change()
# returns_annual = returns_daily.mean() * 250
returns_daily = data.pct_change()
returns_annual = returns_daily.mean() * 250
returns_month = returns_daily.mean() * 21
print returns_annual

# get daily and covariance of returns of the stock
cov_daily = returns_daily.cov()
cov_annual = cov_daily * 250
cov_month = cov_daily * 21
print cov_annual

# empty lists to store returns, volatility and weights of imiginary portfolios
port_returns = []
port_volatility = []
port_sharp = []
stock_weights = []

# set the number of combinations for imaginary portfolios
num_assets = len(selected)
num_portfolios = 50000

# populate the empty lists with each portfolios returns, risk and weights
for single_portfolio in range(num_portfolios):
    weights = np.random.random(num_assets)
    weights /= np.sum(weights)
    returns = np.dot(weights, returns_annual)
    volatility = np.sqrt(np.dot(weights.T, np.dot(cov_annual, weights)))
    sharp = returns/volatility
    port_returns.append(returns)
    port_volatility.append(volatility)
    port_sharp.append(sharp)
    stock_weights.append(weights)

# a dictionary for Returns and Risk values of each portfolio
portfolio = {'Returns': port_returns,
             'Volatility': port_volatility,
             'SharpRatio': port_sharp}

# extend original dictionary to accomodate each ticker and weight in the portfolio
for counter,symbol in enumerate(selected):
    portfolio[symbol+' Weight'] = [Weight[counter] for Weight in stock_weights]

# make a nice dataframe of the extended dictionary
df = pd.DataFrame(portfolio)

# get better labels for desired arrangement of columns
column_order = ['Returns', 'Volatility', 'SharpRatio'] + [stock+' Weight' for stock in selected]

# reorder dataframe columns
df = df[column_order]
df = df.sort_values(['SharpRatio'], ascending=[False])
print df.head(5)

# plot the efficient frontier with a scatter plot
plt.style.use('seaborn')
df.plot.scatter(x='Volatility', y='Returns', c='SharpRatio', figsize=(10, 8), grid=True, cmap='RdYlBu')
plt.scatter(x=df['Volatility'].head(1), y=df['Returns'].head(1), marker=(5,1,0), c='r', s=100)
plt.xlabel('Volatility (Std. Deviation)')
plt.ylabel('Expected Returns')
plt.title('Efficient Frontier')
plt.show()

