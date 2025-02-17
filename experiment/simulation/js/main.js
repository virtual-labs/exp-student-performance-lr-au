 document.addEventListener("DOMContentLoaded", function () {
                document.getElementById('fileInput').addEventListener('change', handleFileUpload);
                document.getElementById('manualPredictBtn').addEventListener('click', predictManualEntry);
                document.getElementById('dataCleanBtn').addEventListener('click', cleanDataSets);
                document.getElementById('splitDataBtn').addEventListener('click', splitData);
                document.getElementById('predictBtn').addEventListener('click', predictAndPlot);
                document.getElementById('resetBtn').addEventListener('click', function () {
                    location.reload();
                });
            });

            document.getElementById("initialHide").style.display = "none";
            document.getElementById("preprocessedHide").style.display = "none";



            let trainScores = [];
            let trainHours = [];
            let testHours = [];
            let testScores = [];
            let studyHours = [];
            let scores = [];
            let chartInstance = null;

            const actualData = [
                { hours: 1, score: 20 },
                { hours: 2, score: 40 },
                { hours: 3, score: 60 },
                { hours: 4, score: 80 },
                { hours: 5, score: 100 }
            ];

            studyHours = actualData.map(d => d.hours);
            scores = actualData.map(d => d.score);
            loadDataset();
            plotManualEntryGraph(studyHours, scores);
            updateStatistics();
            logActivity("Graph Updated with Predefined Datasets");
            logActivity("Updated Summary Statistics");

            function handleFileUpload(event) {
                const file = event.target.files[0];
                if (!file) return;
                const fileName = file.name.toLowerCase();
                if (!fileName.endsWith(".csv")) {
                    alert("Invalid file format! Please upload a CSV file.");
                    fileInput.value = ""; // Reset file input
                    return;
                }

                const reader = new FileReader();
                reader.onload = function (e) {
                    parseCSV(e.target.result);
                };
                reader.readAsText(file);
            }

            function parseCSV(csv) {
                const lines = csv.trim().split('\n');
                studyHours = [];
                scores = [];

                lines.forEach((line, index) => {
                    if (index === 0) return;
                    const values = line.split(',').map(value => value.trim()).filter(value => value !== '').filter(value => !isNaN(value) && value >= 0);

                    if (values.length < 2) return;

                    const [hours, score] = values.map(Number);
                    if (!isNaN(hours) && !isNaN(score)) {
                        studyHours.push(hours);
                        scores.push(score);
                    }
                });

                if (studyHours.length > 0) {
                    loadDataset();
                    logActivity("📁CSV file loaded successfully. Missing values removed.");
                    plotManualEntryGraph(studyHours, scores);
                    document.getElementById('dataCleanBtn').disabled = false;
                    document.getElementById('manualPredictBtn').disabled = true;
                    document.getElementById("predefinedHide").style.display = "none";
                    document.getElementById("initialHide").style.display = "block";
                    document.getElementById("preprocessedHide").style.display = "none";


                }
            }

            function loadDataset() {
                let tableBody = document.getElementById("datasetTable");
                tableBody.innerHTML = "";
                studyHours.forEach((h, i) => {
                    let row = `<tr><td>${h}</td><td>${scores[i]}</td></tr>`;
                    tableBody.innerHTML += row;
                });
            }

            function updateStatistics() {
                let totalRecords = studyHours.length;
                let meanHours = (studyHours.reduce((a, b) => a + b, 0) / totalRecords).toFixed(2);
                let meanScore = (scores.reduce((a, b) => a + b, 0) / totalRecords).toFixed(2);

                document.getElementById("totalRecords").textContent = totalRecords;
                document.getElementById("meanHours").textContent = meanHours;
                document.getElementById("meanScore").textContent = meanScore;

            }

            function cleanDataSets() {
                removeOutliers();
                loadDataset();
                updateStatistics();
                plotGraph(studyHours, scores);
                document.getElementById('splitDataBtn').disabled = false;
                document.getElementById("predefinedHide").style.display = "none";
                document.getElementById("initialHide").style.display = "none";
                document.getElementById("preprocessedHide").style.display = "block"
            }

            function removeOutliers() {
                const q1 = getPercentile(scores, 25);
                const q3 = getPercentile(scores, 75);
                const iqr = q3 - q1;
                const lowerBound = q1 - 1.5 * iqr;
                const upperBound = q3 + 1.5 * iqr;

                let filteredData = studyHours.map((sh, i) => ({ study: sh, score: scores[i] }))
                    .filter(data => data.score >= lowerBound && data.score <= upperBound);

                const seen = new Set();
                filteredData = filteredData.filter(({ study, score }) => {
                    const key = `${study}-${score}`;
                    if (seen.has(key)) return false;
                    seen.add(key);
                    return true;
                });

                studyHours = filteredData.map(data => data.study);
                scores = filteredData.map(data => data.score);
                logActivity("✅ Data Cleaned! Removed Outliers using Interquartile Range (IQR) Method.");
                logActivity(`Remaining data points: ${studyHours.length}`);
            }

            function splitData() {
                let combinedData = studyHours.map((h, i) => ({ study: h, score: scores[i] }));
                combinedData.sort(() => Math.random() - 0.5);
                let splitIndex = Math.floor(combinedData.length * 0.8);

                trainData = combinedData.slice(0, splitIndex);
                testData = combinedData.slice(splitIndex);

                trainHours = trainData.map(d => d.study);
                trainScores = trainData.map(d => d.score);
                testHours = testData.map(d => d.study);
                testScores = testData.map(d => d.score);
                plotGraph(trainHours, trainScores, testHours, testScores);
                logActivity(`✂️Split data into Training (${trainData.length} points) and Testing (${testData.length} points).`);
                document.getElementById('predictBtn').disabled = false;
            }

            function getPercentile(arr, percentile) {
                arr = arr.slice().sort((a, b) => a - b);
                const index = Math.floor(percentile / 100 * arr.length);
                return arr[index];
            }

            function predictManualEntry() {
                const manualHours = parseFloat(document.getElementById('manualHours').value);
                if (isNaN(manualHours) || manualHours < 1 || manualHours > 50) {
                    alert("Please enter a valid number.");
                    return;
                }

                const { slope, intercept } = calculateLinearRegression(studyHours, scores);
                const predictedScore = (slope * manualHours + intercept).toFixed(2);

                // Adding manual input for tracking
                studyHours.push(manualHours);
                scores.push(parseFloat(predictedScore));

                // Generate predictions for the regression line
                const predictions = studyHours.map(hours => ({ x: hours, y: slope * hours + intercept }));

                // Calculate MSE & RMSE using actual scores and predicted scores
                const { mse, rmse } = calculateMSEAndRMSE(scores, predictions.map(p => p.y));

                loadDataset();
                // splitData();
                updateStatistics();
                plotManualEntryGraph(studyHours, scores, predictions);

                logActivity(`Manual Entry: ${manualHours} study hours -> Predicted Score Calculation: 
                 (slope: ${slope.toFixed(2)} * ${manualHours}) + intercept: ${intercept.toFixed(2)} 
                 = Predicted Score: ${predictedScore}`);
                // logActivity(`📊 **MSE (Mean Squared Error)**: ${mse.toFixed(2)}`);
                // logActivity(`📈 **RMSE (Root Mean Squared Error)**: ${rmse.toFixed(2)}`);
                logActivity(`MSE (Mean Squared Error): ${mse.toFixed(2)}`);
                logActivity(`RMSE (Root Mean Squared Error): ${rmse.toFixed(2)}`);
                document.getElementById('predictBtn').disabled = true;
            }

            function plotManualEntryGraph(studyHours, actualScores, predictions = []) {
                const ctx = document.getElementById('predictionChart').getContext('2d');

                // Destroy existing chart if it exists
                if (chartInstance) {
                    chartInstance.destroy();
                }

                // Calculate IQR to find outliers
                const q1 = getPercentile(actualScores, 25);
                const q3 = getPercentile(actualScores, 75);
                const iqr = q3 - q1;
                const lowerBound = q1 - 1.5 * iqr;
                const upperBound = q3 + 1.5 * iqr;

                // Identify outliers and non-outliers
                let outliers = [];
                let normalData = [];

                studyHours.forEach((h, i) => {
                    let point = { x: h, y: actualScores[i] };
                    if (point.y < lowerBound || point.y > upperBound) {
                        outliers.push(point);
                    } else {
                        normalData.push(point);
                    }
                });

                // Define datasets for chart
                let datasets = [
                    {
                        label: 'Actual Data',
                        data: normalData,
                        backgroundColor: 'blue',
                        pointRadius: 5
                    },
                    {
                        label: 'Regression Line',
                        data: predictions,
                        borderColor: 'red',
                        backgroundColor: 'red',
                        showLine: true,
                        fill: false,
                        pointRadius: 0,
                        borderWidth: 2
                    }
                ];

                // Add outlier dataset if outliers exist
                if (outliers.length > 0) {
                    datasets.push({
                        label: 'Outliers',
                        data: outliers,
                        backgroundColor: 'orange',
                        pointRadius: 7,
                        borderColor: 'black',
                        borderWidth: 2
                    });
                }

                chartInstance = new Chart(ctx, {
                    type: 'scatter',
                    data: { datasets },
                    options: {
                        scales: {
                            x: {
                                type: 'linear',
                                position: 'bottom',
                                title: {
                                    display: true,
                                    text: 'Study Hours'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Scores'
                                }
                            }
                        }
                    }
                });

                if (outliers.length > 0) {
                    logActivity(` Outlier Detected: ${outliers.map(o => `Study Hours: ${o.x}, Score: ${o.y}`).join(" | ")}`);
                }
            }


            function calculateLinearRegression(x, y) {
                const n = x.length;
                const xMean = x.reduce((a, b) => a + b) / n;
                const yMean = y.reduce((a, b) => a + b) / n;

                let numerator = 0, denominator = 0;
                for (let i = 0; i < n; i++) {
                    numerator += (x[i] - xMean) * (y[i] - yMean);
                    denominator += (x[i] - xMean) ** 2;
                }

                return { slope: numerator / denominator, intercept: yMean - (numerator / denominator) * xMean };
            }

            function predictAndPlot() {
                document.getElementById('manualPredictBtn').disabled = false;

                // Check if training data is available
                if (trainHours.length === 0 || trainScores.length === 0) {
                    logActivity("No training data available for plotting.");
                    return;
                }

                // slope and intercept calculation
                const { slope, intercept } = calculateLinearRegression(trainHours, trainScores);

                // predictions
                const predictedScores = trainHours.map(hours => slope * hours + intercept);


                const regressionLine = trainHours.map((hours, i) => ({
                    x: hours,
                    y: predictedScores[i]
                }));


                plotGraph(trainHours, trainScores, testHours, testScores, regressionLine);
                logActivity('<b>Generated RegressionLine.</b>');
                //  mse and rmse
                const { mse, rmse } = calculateMSEAndRMSE(trainScores, predictedScores);


                if (isNaN(mse) || isNaN(rmse)) {
                    logActivity("Error: Unable to calculate MSE and RMSE due to invalid data.");
                } else {
                    logActivity(`Mean Squared Error (MSE): ${mse.toFixed(2)}`);
                    logActivity(`Root Mean Squared Error (RMSE): ${rmse.toFixed(2)}`);
                }
            }

            function calculateMSEAndRMSE(actualScores, predictedScores) {
                if (actualScores.length !== predictedScores.length) {
                    throw new Error("Actual and predicted scores must have the same length.");
                }

                const n = actualScores.length;
                let mse = 0;

                // Calculate MSE
                for (let i = 0; i < n; i++) {
                    mse += Math.pow(actualScores[i] - predictedScores[i], 2);
                }
                mse /= n;

                // Calculate RMSE
                const rmse = Math.sqrt(mse);

                return { mse, rmse };
            }

            function plotGraph(trainHours, trainScores, testHours, testScores, predictedScores) {
                const ctx = document.getElementById('predictionChart').getContext('2d');
                if (!testHours || !testScores) {
                    // logActivity("No testing data available.");
                    testHours = [];
                    testScores = [];
                }
                if (chartInstance) {
                    chartInstance.destroy();
                }

                chartInstance = new Chart(ctx, {
                    type: 'scatter',
                    data: {
                        datasets: [
                            {
                                label: 'Training Data',
                                data: trainHours.map((hours, index) => ({ x: hours, y: trainScores[index] })),
                                backgroundColor: 'blue',
                                pointRadius: 5
                            },
                            {
                                label: 'Testing Data',
                                data: testHours.map((h, i) => ({ x: h, y: testScores[i] })),
                                backgroundColor: 'green',
                                pointRadius: 4
                            },
                            {
                                label: 'Regression Line',
                                data: predictedScores,
                                borderColor: 'red',
                                backgroundColor: 'red',
                                showLine: true,
                                fill: false,
                                pointRadius: 0,
                                borderWidth: 2
                            }
                        ]
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'linear',
                                position: 'bottom',
                                title: {
                                    display: true,
                                    text: 'Study Hours'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Scores'
                                }
                            }
                        }
                    }
                });
            }

            function logActivity(message) {
                let log = document.getElementById("activityLog");
                let logItem = `<li class="list-group-item">${message}</li>`;
                log.innerHTML += logItem;
                log.scrollTop = log.scrollHeight;
            }

            function clearLog() {
                document.getElementById("activityLog").innerHTML = "";
            }

            window.onload = () => {
                loadDataset();
            };