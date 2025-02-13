const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

// Function to recursively get all files in a directory
function getAllFiles(dirPath, fileList = [], ignorePaths = []) {
  if (!fs.existsSync(dirPath)) {
    console.error(`Error: Directory '${dirPath}' does not exist.`);
    return [];
  }

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);

    // Check if the filePath should be ignored
    if (ignorePaths.some(ignorePath => filePath.includes(ignorePath))) {
      return; // Skip this directory or file
    }

    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList, ignorePaths);
    } else {
      fileList.push(filePath); // Store absolute path
    }
  });

  return fileList;
}



// Function to get asset type based on file extension
function getAssetType(file) {
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".svg",
  ];
  const videoExtensions = [".mp4", ".mov", ".avi", ".mkv", ".webm"];

  const extname = path.extname(file).toLowerCase();

  if (imageExtensions.includes(extname)) {
    return "Photos";
  } else if (videoExtensions.includes(extname)) {
    return "Videos";
  } else {
    return "Other"; // In case the file is neither an image nor a video
  }
}

// Function to check for repeated filenames
function findDuplicateFilenames(files) {
  const baseDir = path.join(__dirname, "public");
  const { filenameCount, filenamePaths } = processFiles(files, baseDir);

  return Object.entries(filenameCount)
    .filter(([_, count]) => count > 1)
    .map(([filename, count]) => ({
      filename,
      count,
      paths: filenamePaths[filename],
    }));
}

function createDictionary(files, prefixedFiles) {
  const baseDir = path.join(__dirname, "public");
  const { filenamePaths } = processFiles(files, baseDir);

  const dictionary = files.reduce((acc, file, index) => {
    const filename = path.basename(file);
    acc[prefixedFiles[index]] = {
      originalName: filename,
      path: filenamePaths[filename][0] || "", // Use the first occurrence of the file
    };
    return acc;
  }, {});

  const outputPath = path.join(__dirname, "_temp", "new_names.json");
  fs.writeFileSync(outputPath, JSON.stringify(dictionary, null, 2));
  console.log(`Temporary Dictionary saved to ${outputPath}`);
}

//Helper function to process files and return extracted filenames and relative paths.
function processFiles(files, baseDir) {
  const filenameCount = {};
  const filenamePaths = {};

  files.forEach((filePath) => {
    const filename = path.basename(filePath);
    const relativePath = path.relative(baseDir, filePath).replace(/\\/g, "/");

    if (!filenameCount[filename]) {
      filenameCount[filename] = 0;
      filenamePaths[filename] = [];
    }

    filenameCount[filename] += 1;
    filenamePaths[filename].push(relativePath);
  });

  return { filenameCount, filenamePaths };
}

// Function to create data objects for Excel based on filenames
function createData(files) {

  const fileBasename = files.map((file) => path.basename(file))
  const prefixedFiles = fileBasename.map(
    (file) => `washcombo-all-in-one_landing-page_${file.replace(path.extname(file), "")}`
  );

  const description = "2024 Washcombo All in One Homepage Assets";
  const tags = "Homepage, HP, All-in-One, Energy";
  const businessUnit = "CXM";
  const assetSubType = "Lifestyle, Product";
  const assetProductType = "Landing Page";
  const perspective = "";
  const channel = "LG.com";
  const channelSubType = "";
  const productType = "Appliances";
  const productCategory = "Washers & Dryers";
  const productSubCategory = "Washers";
  const productSubSubCategory = "Front Load";
  const sku = "";
  const altText = "";
  const locale = "en_US";
  const department = "CMS";
  const promotionEvent = "";
  const year = "2024";
  const usageRights = "";
  const fileType = "";

  createDictionary(files, prefixedFiles)

  return fileBasename.map((file, index) => ({
    filename: file,
    brand: index === 0 ? "C5128806-AF50-476A-8E4C0FE9808667BB" : "", // Only set brand for the first row
    name: prefixedFiles[index],
    description,
    tags,
    "Business Unit": businessUnit,
    "Asset Type": getAssetType(file),
    "Asset Sub-Type": assetSubType,
    "Asset Product-Type": assetProductType,
    Perspective: perspective,
    Channel: channel,
    "Channel Sub-Type": channelSubType,
    "Product Type": productType,
    "Product Category": productCategory,
    "Product Sub-Category": productSubCategory,
    "Product Sub-Sub Category": productSubSubCategory,
    SKU: sku,
    "Alt Text": altText,
    Locale: locale,
    Department: department,
    "Promotion/Event": promotionEvent,
    Year: year,
    "Usage Rights": usageRights,
    "File Type": fileType,
  }));
}

// Function to create an Excel sheet from data
function createExcelSheet(data) {
  const ws = xlsx.utils.json_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Files");
  return wb;
}

// Function to save the Excel workbook to a file
function saveExcelFile(wb, outputFilePath) {
  xlsx.writeFile(wb, outputFilePath);
  console.log(`Excel file saved at ${outputFilePath}`);
}

// Function to copy files into a single-level folder
function flattenFiles(files, destinationFolder) {
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }
  
    files.forEach((file) => {
      if (!fs.existsSync(file)) {
        console.error(`Error: File '${file}' does not exist.`);
        return;
      }
  
      const destPath = path.join(destinationFolder, path.basename(file));
      try {
        fs.copyFileSync(file, destPath);
      } catch (err) {
        console.error(`Failed to copy '${file}': ${err.message}`);
      }
    });
  
    console.log(`All files copied to ${destinationFolder}`);
  }

  function renameDuplicateFiles(duplicates) {
    duplicates.forEach(({ filename, paths }) => {
      paths.forEach((filePath) => {
        const absolutePath = path.join(__dirname, "public", filePath); // Adjust based on your base directory
        const dirName = path.basename(path.dirname(absolutePath)); // Get the last folder name
        const newFilename = `${dirName}-${filename}`; // Add prefix
        const newFilePath = path.join(path.dirname(absolutePath), newFilename);
  
        // Rename the file
        try {
          if (fs.existsSync(absolutePath)) {
            fs.renameSync(absolutePath, newFilePath);
            console.log(`Renamed "${filename}" --→ "${newFilename}" \n📍 Location: ${filePath} \n`);
          } else {
            console.warn(`File not found: ${absolutePath}`);
          }
        } catch (error) {
          console.error(`Error renaming ${absolutePath}:`, error);
        }
      });
    });
  }
  
// Main function to run the script
function main() {
    const assetsDirectory = path.join(__dirname, "public");
    const ignorePaths = [
      path.join(__dirname, "public/fonts"),
      path.join(__dirname, "public/lg5-common"),
    ];
  
    if (!fs.existsSync(assetsDirectory)) {
      console.error(`Error: Assets directory '${assetsDirectory}' does not exist.`);
      return;
    }
  
    const flattenedDirectory = path.join(__dirname, "_output/bynder/images");
  
    let files = getAllFiles(assetsDirectory, [], ignorePaths);
    const duplicates = findDuplicateFilenames(files);

    if (duplicates.length > 0) {
      console.log("Duplicates Log:", duplicates)

      renameDuplicateFiles(duplicates)
      files = getAllFiles(assetsDirectory, [], ignorePaths);
    }
  
    flattenFiles(files, flattenedDirectory); // Copy files to a single-level folder
  
    const data = createData(files); // Only use filenames
    const wb = createExcelSheet(data);
  
    const outputFilePath = path.join(__dirname, "_output/bynder/spreadsheet", "MassUploaderSheet.xlsx");
    saveExcelFile(wb, outputFilePath);
  }

main();
