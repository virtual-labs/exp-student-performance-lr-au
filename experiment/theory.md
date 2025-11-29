
**Linear Regression** is a foundational statistical and machine learning technique used to model the linear relationship between a dependent variable and one or more independent variables. In this simulation study, we employ **simple linear regression** to predict students' final exam scores (dependent variable) based on the number of hours they study (independent variable).

#### 1. Concept of Simple Linear Regression

The simple linear regression model assumes a linear relationship between the predictor \(X\) (Study Hours) and the response \(Y\) (Exam Score), expressed as:

$$Y = \beta_0 + \beta_1 X + \varepsilon$$

Where:  
- \(Y\): Final exam score (dependent variable)  
- \(X\): Number of study hours (independent variable)  
- \(\beta_0\): Y-intercept (expected score when study hours = 0)  
- \(\beta_1\): Slope (average increase in exam score per additional hour of study)  
- \(\varepsilon\): Random error term, assumed \(\varepsilon \sim N(0, \sigma^2)\)

The goal is to estimate \(\beta_0\) and \(\beta_1\) from the data.

#### 2. Data Simulation and Preprocessing

This is a **simulation-based experiment**, so synthetic data is generated to represent realistic student behavior:  
- Study hours (\(X\)) → sampled from a realistic distribution (e.g., Uniform[1, 12] or Normal)  
- Exam scores (\(Y\)) → generated using a true linear model plus Gaussian noise

**Preprocessing steps:**  
- Verification of no missing values (expected in controlled simulation)  
- Outlier detection and analysis  
- Visual and statistical checks for linearity

#### 3. Exploratory Data Analysis (EDA)

Before modeling, we conduct EDA:  
- Scatter plot of Study Hours vs. Exam Score  
- Calculation of Pearson correlation coefficient (\(r\))  
- Summary statistics (mean, median, std, min, max)  

A strong positive correlation and linear trend confirm the suitability of linear regression.

#### 4. Model Fitting – Ordinary Least Squares (OLS)

The optimal coefficients are found by minimizing the **Mean Squared Error (MSE)**:

$$\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (Y_i - \hat{Y}_i)^2$$

where \(\hat{Y}_i = \beta_0 + \beta_1 X_i\).

Closed-form solutions:  

$$\beta_1 = \frac{\sum_{i=1}^{n} (X_i - \bar{X})(Y_i - \bar{Y})}{\sum_{i=1}^{n} (X_i - \bar{X})^2}, \quad \beta_0 = \bar{Y} - \beta_1 \bar{X}$$

#### 5. Model Evaluation

Performance is assessed using the following metrics:

| Metric                  | Formula                                                            | Interpretation                          |
|-------------------------|--------------------------------------------------------------------|-----------------------------------------|
| Mean Squared Error (MSE) | \(\frac{1}{n} \sum_{i=1}^{n} (Y_i - \hat{Y}_i)^2\)                 | Average squared error                   |
| Root Mean Squared Error (RMSE) | \(\sqrt{\text{MSE}}\)                                       | Error in the same units as exam score   |
| R-squared (\(R^2\))     | \(1 - \frac{\sum (Y_i - \hat{Y}_i)^2}{\sum (Y_i - \bar{Y})^2}\)    | Proportion of variance explained (0–1)  |

Data is split into **80% training** and **20% testing** sets to evaluate generalization.

#### 6. Results Interpretation and Prediction

The fitted model enables:  
- Interpretation of \(\beta_1\): expected mark increase per extra study hour  
- Predictions for new students  

