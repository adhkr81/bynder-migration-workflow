const fs = require("fs");
const path = require("path");


// Function to load the dictionary from _output/dictionary.json
async function loadDictionary() {
  const dictionaryPath = path.join(__dirname, "_output/dictionary", "dictionary.json");
  const dictionaryContent = fs.readFileSync(dictionaryPath, "utf-8");
  
  return JSON.parse(dictionaryContent);
}


// Replace this with your final object
const bynderURLs = {
  "/us/washcombo-all-in-one/images/power-of-one-bg-tablet.jpg": "https://media.us.lg.com/transform/ed83f1cf-389d-497e-9979-5b190e4500af/washcombo-all-in-one_power-of-one-bg-tablet",
  "/us/washcombo-all-in-one/images/power-of-one-bg-mobile.jpg": "https://media.us.lg.com/transform/cd4ce791-01f5-4b18-8434-d6a10de8f2e8/washcombo-all-in-one_power-of-one-bg-mobile"
};

// Function to replace image src in React component
function replaceImageSrcInFile(filePath) {
  // Read the component file
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Replace all occurrences of relative src with Bynder URLs
  let updatedContent = fileContent;

  Object.keys(bynderURLs).forEach((relativePath) => {
    const bynderURL = bynderURLs[relativePath];
    // Match and replace src attributes with corresponding Bynder URLs
    const regex = new RegExp(`(["'])([^"']*${relativePath}[^"']*)`, "g");
  
    if (regex.test(updatedContent)) {
      // Get the relative path of the file to remove the absolute part
      const relativeFilePath = path.relative(__dirname, filePath);
  
      console.log(`Match found and replaced in file: ${relativeFilePath} for path: ${relativePath} to path: ${bynderURL}`);
      updatedContent = updatedContent.replace(regex, `$1${bynderURL}`);
    }
  });

  // Write back the updated content to the file if there was a match
  if (updatedContent !== fileContent) {
    fs.writeFileSync(filePath, updatedContent, "utf-8");
    console.log(`Updated: ${filePath}`);
  }
}

// Function to traverse all React component files
function traverseAndUpdateComponents(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const fileStats = fs.statSync(filePath);

    if (fileStats.isDirectory()) {
      // If it's a directory, traverse recursively
      traverseAndUpdateComponents(filePath);
    } else if (filePath.endsWith(".js") || filePath.endsWith(".jsx") || filePath.endsWith(".tsx")) {
      // Only process JavaScript/JSX/TSX files (React components)
      replaceImageSrcInFile(filePath);
    }
  });
}

// Run the script on your React components directory
const componentsDir = path.join(__dirname, "components"); // Replace with the path to your components folder
traverseAndUpdateComponents(componentsDir);
