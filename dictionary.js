const fs = require("fs");
const path = require("path");

function createDictionary() {
  const tempFilePath = path.join(__dirname, "_temp", "new_names.json");
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg",];
  const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];

  try {
    const newNamesData = JSON.parse(fs.readFileSync(tempFilePath, "utf-8"));
    const downloadData = JSON.parse(fs.readFileSync("download.json", "utf-8"));
    const assetsFromCollection = downloadData.assets;
    console.log(assetsFromCollection.length)

    const dictionary = assetsFromCollection.reduce((acc, item) => {

    const key = `/${newNamesData[item.name]["path"]}`
    const extension = item.extension[0]

      if (newNamesData[item.name]) {
        let lowerCaseId = item.id.toLowerCase(); // Convert hash to lowercase

        // Add hyphen after the 4th character of the last segment
        const parts = lowerCaseId.split("-");
        if (parts.length === 4) {
          parts[3] = parts[3].slice(0, 4) + "-" + parts[3].slice(4);
        }
        const formattedId = parts.join("-");

        if (imageExtensions.includes(extension)) {
          acc[key] = `https://media.us.lg.com/transform/${formattedId}/${item.name}`;
        } else if (videoExtensions.includes(extension)) {
          acc[key] = `https://media.us.lg.com/asset/${formattedId}/${extension}/${item.name}`
        } else {
          console.log("File extension not recognized; please add logic to handle this case. :" , item.name, extension)
          
        }

      } else {
        console.warn(`Warning: No mapping found for ${item.name}`);
      }
      return acc;
    }, {});

    const outputPath = path.join(__dirname, "_output/dictionary", "dictionary.json");
    fs.writeFileSync(outputPath, JSON.stringify(dictionary, null, 2));

    console.log(`Dictionary saved to ${outputPath}`);

  } catch (error) {
    console.error("Error reading JSON files:", error);
    return null;
  }
}

createDictionary();
