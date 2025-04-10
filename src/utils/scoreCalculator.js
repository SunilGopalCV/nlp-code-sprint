import * as XLSX from "xlsx";

// Calculate the F1 score
export const calculateMacroF1 = (trueLabels, predLabels) => {
  // Calculate true positives, false positives, false negatives for each class (0 and 1)
  let tp0 = 0,
    fp0 = 0,
    fn0 = 0;
  let tp1 = 0,
    fp1 = 0,
    fn1 = 0;

  for (let i = 0; i < trueLabels.length; i++) {
    if (trueLabels[i] === 0 && predLabels[i] === 0) tp0++;
    if (trueLabels[i] === 1 && predLabels[i] === 1) tp1++;
    if (trueLabels[i] === 0 && predLabels[i] === 1) fp1++;
    if (trueLabels[i] === 1 && predLabels[i] === 0) fp0++;
    if (trueLabels[i] === 0 && predLabels[i] === 1) fn0++;
    if (trueLabels[i] === 1 && predLabels[i] === 0) fn1++;
  }

  // Calculate precision and recall for each class
  const precision0 = tp0 / (tp0 + fp0) || 0;
  const precision1 = tp1 / (tp1 + fp1) || 0;
  const recall0 = tp0 / (tp0 + fn0) || 0;
  const recall1 = tp1 / (tp1 + fn1) || 0;

  // Calculate F1 score for each class
  const f1_0 = (2 * (precision0 * recall0)) / (precision0 + recall0) || 0;
  const f1_1 = (2 * (precision1 * recall1)) / (precision1 + recall1) || 0;

  // Calculate macro F1 score
  return (f1_0 + f1_1) / 2;
};

// Function to load the answer key from Excel file
export const loadAnswerKey = async () => {
  try {
    const response = await fetch("/answers.xlsx");
    if (!response.ok) {
      throw new Error(`Failed to load answer key: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    // Assume the first sheet contains our data
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert the worksheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Transform the data structure to match the expected format
    const answerKey = {};

    // Get all column names except the first one (which might be a row identifier)
    const categoryNames = Object.keys(jsonData[0]).filter(
      (key) => key !== "id" && key !== "ID" && key !== ""
    );

    // Initialize arrays for each category
    categoryNames.forEach((category) => {
      answerKey[category] = [];
    });

    // Fill in the values
    jsonData.forEach((row) => {
      if (Object.values(row).some((val) => val !== "")) {
        // Skip empty rows
        categoryNames.forEach((category) => {
          const value = parseInt(row[category]);
          if (!isNaN(value)) {
            answerKey[category].push(value);
          }
        });
      }
    });

    return answerKey;
  } catch (error) {
    console.error("Error loading answer key:", error);
    return {};
  }
};

// Default empty answer key - will be replaced when loaded
export let ANSWER_KEY = {
  Fake: [],
  Hate: [],
};

// Immediately try to load the answer key when this module is imported
loadAnswerKey().then((loadedKey) => {
  if (Object.keys(loadedKey).length > 0) {
    ANSWER_KEY = loadedKey;
    console.log("Answer key loaded successfully");
  } else {
    console.warn("Using default empty answer key");
  }
});
