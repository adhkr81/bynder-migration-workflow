const fs = require("fs");
const path = require("path");


// Function to load the dictionary from _output/dictionary.json
async function loadDictionary() {
  const dictionaryPath = path.join(__dirname, "_output/dictionary", "dictionary.json");
  const dictionaryContent = fs.readFileSync(dictionaryPath, "utf-8");
  
  return JSON.parse(dictionaryContent);
}

const updatedSet = new Set()
const notUpdatedSet = new Set()


// Function to replace image src in React component
function replaceImageSrcInFile(filePath, dictionary) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  let updatedContent = fileContent;
  let isUpdated = false;


  const updatedPaths = []; // Tracks successfully replaced paths
  const allPaths = Object.keys(dictionary); // Track all possible paths

  // Process each path to perform replacements
  allPaths.forEach((relativePath) => {
    const bynderURL = dictionary[relativePath];

    const escapeRegex = (str) => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const escapedPath = escapeRegex(relativePath);
    const regex = new RegExp(`(["'])([^"']*${escapedPath}[^"']*)`, "g");

    if (regex.test(updatedContent)) {
      updatedContent = updatedContent.replace(regex, `$1${bynderURL}`);
      updatedPaths.push(relativePath); // Store updated paths
      isUpdated = true;

      // Add to updated set without quotes around URL
      updatedSet.add(`${relativePath} : ${bynderURL}`);
    }
  });

  // Ensure paths that were not updated are correctly tracked
  const notUpdatedPaths = allPaths.filter((path) => !updatedPaths.includes(path));

  notUpdatedPaths.forEach((path) => {
    const bynderURL = dictionary[path];
    notUpdatedSet.add(`${path} : ${bynderURL}`); // Add paths that were not updated
  });

  // Write back updated content if changes were made
  if (isUpdated) {
    fs.writeFileSync(filePath, updatedContent, "utf-8");
    console.log(`Updated: ${filePath}`);
  }
}


// Function to traverse all React component files
function traverseAndUpdateComponents(dirPath, dictionary) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const fileStats = fs.statSync(filePath);

    if (fileStats.isDirectory()) {
      // If it's a directory, traverse recursively
      traverseAndUpdateComponents(filePath, dictionary);
    } else if (filePath.endsWith(".js") || filePath.endsWith(".jsx") || filePath.endsWith(".tsx")) {
      // Only process JavaScript/JSX/TSX files (React components)
      replaceImageSrcInFile(filePath, dictionary);
    }
  });
}


async function main() {
  const bynderURLs = await loadDictionary()

  if (!bynderURLs || Object.keys(bynderURLs).length === 0) {
    console.log("Dictionary is empty")
    return
  }

  const componentsDir = path.join(__dirname, "components"); // Replace with the path to your components folder
  traverseAndUpdateComponents(componentsDir, bynderURLs);

  console.log("Updated paths: ", [...updatedSet]);
  console.log("Not updated paths: ", [...notUpdatedSet]);

  const logFilePath = path.join(__dirname, "_output/logs", "update_log.json");
  const filteredNotUpdated = [...notUpdatedSet].filter(path => !updatedSet.has(path));

  const logData = {
    notUpdated: filteredNotUpdated,
    updated: [...updatedSet],
  };
  
  // Write the log data to a file
  fs.writeFileSync(logFilePath, JSON.stringify(logData, null, 2), "utf-8");
}

main()
