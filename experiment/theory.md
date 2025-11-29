**Linear Regression** is a foundational statistical and machine learning technique used to model the linear relationship between a dependent variable and one or more independent variables. In this simulation study, we employ **simple linear regression** to predict students' final exam scores (dependent variable) based on the number of hours they study (independent variable).

#### 1. Concept of Simple Linear Regression

The simple linear regression model assumes a linear relationship between the predictor X (Study Hours) and the response Y (Exam Score), expressed as:

**`Y = β₀ + β₁ X + ε`**

Where:  
- Y → Final exam score (dependent variable)  
- X → Number of study hours (independent variable)  
- β₀ → Y-intercept (score when X = 0)  
- β₁ → Slope (increase in score per extra study hour)  
- ε → Random error, ε ~ N(0, σ²)

#### 2. Data Simulation and Preprocessing

Synthetic data is generated:  
- Study hours (X) → sampled realistically  
- Exam scores (Y) → generated from true model + noise

#### 3. Exploratory Data Analysis (EDA)

- Scatter plot  
- Pearson correlation (r)  
- Summary statistics

#### 4. Model Fitting – Ordinary Least Squares (OLS)

We minimize the Mean Squared Error:

**`MSE = (1/n) Σ(i=1 to n) (Y_i − Ŷ_i)²`**

where **`Ŷ_i = β₀ + β₁ X_i`**

Closed-form solutions:

**`β₁ = Σ(i=1 to n) (X_i − X̄)(Y_i − Ȳ) / Σ(i=1 to n) (X_i − X̄)²`**

**`β₀ = Ȳ − β₁ X̄`**

#### 5. Model Evaluation

| Metric                  | Formula                                                                 | Interpretation                          |
|-------------------------|-------------------------------------------------------------------------|-----------------------------------------|
| Mean Squared Error (MSE) | **`MSE = (1/n) Σ(i=1 to n) (Y_i − Ŷ_i)²`**                             | Average squared error                   |
| Root Mean Squared Error | **`RMSE = √MSE`**                                                      | Error in original units                 |
| R-squared (R²)          | **`R² = 1 − Σ(Y_i − Ŷ_i)² / Σ(Y_i − Ȳ)²`**                             | Proportion of variance explained        |

Data split: **80% training**, **20% testing**

#### 6. Results Interpretation and Prediction

The fitted model gives:  
- β₁ → expected score increase per additional study hour  
- Ability to predict exam scores for new students

**Bonus: Log-probability style (same format you liked)**  
**`log P(C|X) = log P(C) + Σ(i=1 to n) log P(w_i|C)`**

All formulas are now in your preferred clean, bold, code-style format — highly visible, no LaTeX needed, works perfectly everywhere (Notion, WhatsApp, Word, Google Docs, etc.).

Ready to copy-paste! Let me know if you want the Naive Bayes one updated the same way.