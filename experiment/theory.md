### Theory

<b>Linear Regression</b> is one of the most fundamental and widely used techniques in statistical modeling and machine learning. It helps in understanding the relationship between two continuous variables — typically one independent (predictor) variable and one dependent (target) variable. In the context of this experiment, we aim to explore how the number of hours a student studies influences their final exam score.

### 1. Concept of Linear Regression

Linear regression attempts to model the relationship between two variables by fitting a linear equation (a straight line) to the observed data. The general form of the linear regression equation is:

&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; <b> 𝑌=𝑎+𝑏𝑋+𝜀</b>

Where:

  <ul>
    <li>Y: Dependent variable (Final Exam Score)</li>
    <li>X: Independent variable (Study Hours)</li>
    <li>a: Intercept of the regression line (value of Y when X = 0)</li>
    <li>b: Slope of the regression line (indicates how much Y changes for a unit change in X)</li>
    <li>ε: Error term (represents the variability in Y not explained by X)</li>
  </ul>
  
 ### 2. Data Collection and Preprocessing 
 Before fitting a regression model, it is essential to gather accurate and representative data. In this simulation, the dataset consists of study hours (X) and 
 corresponding final exam scores (Y) for a number of students. Data preprocessing includes:
 <ul>
   <li>Handling missing or null values</li>
   <li>Identifying and removing outliers</li>
   <li>Normalizing or standardizing values if needed</li>
 </ul>
 
### 3. Data Exploration
Exploratory Data Analysis (EDA) helps in visualizing patterns, trends, and distributions in the data. Common techniques include:
<ul>
  <li>Scatter plots to view the relationship between X and Y</li>
  <li>Summary statistics (mean, median, standard deviation)</li>
  <li>Correlation analysis to quantify the strength of association</li>
</ul>

### 4. Model Building

The simple linear regression model is trained using the training dataset. The model learns the best-fitting line by minimizing the difference between predicted values and actual outcomes — typically by minimizing the <b>Mean Squared Error (MSE)</b>.

$$
MSE = \frac{1}{n} \sum_{i=1}^{n} (Y_i - \hat{Y}_i)^2
$$

Where:

<ul>
  <li>$Y_i$: Actual value</li>
  <li>$\hat{Y}_i $: Predicted value</li>
  <li>n: Number of observations</li>
</ul>
A lower MSE indicates a better fit of the model to the data.

### 5. Model Evaluation

After training, the model is evaluated on a testing dataset that was not used during training. This helps in assessing how well the model generalizes to new, unseen data. Performance metrics used include:

<ul>
  <li><b>Mean Squared Error (MSE)</b></li>
  <li><b>Root Mean Squared Error (RMSE)</b></li>
  <li><b>Mean Squared Error (MSE)</b></li>
</ul>

### 6. Interpretation

Once the model is evaluated, it can be used to make predictions. For example, if a student studies for a certain number of hours, the model can predict their likely exam score. However, it is important to remember that linear regression assumes a linear relationship and may not capture complex patterns.
