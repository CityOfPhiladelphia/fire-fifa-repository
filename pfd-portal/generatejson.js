import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const USER = "CityOfPhiladelphia";
const REPO = "fire-fifa-repository";
const ROOT_API = `https://api.github.com/repos/${USER}/${REPO}/contents/Maps`;

async function flattenFiles(item) {
    if (item.type === "file") {
        return [{ name: item.name, url: item.download_url }];
    } else if (item.type === "dir") {
        const children = await fetch(item.url).then((res) => res.json());
        // If children is not an array, return empty array
        const childItems = Array.isArray(children) ? children : [];
        const results = await Promise.all(childItems.map(flattenFiles));
        return results.flat();
    }
    return [];
}

async function main() {
    let root;
    try {
        const response = await fetch(ROOT_API);
        root = await response.json();

        if (!Array.isArray(root)) {
            // If API returned an error, log it
            console.error("GitHub API returned an error:", root.message || root);
            root = []; // fallback to empty
        }
    } catch (err) {
        console.error("Failed to fetch from GitHub:", err);
        root = []; // fallback to empty
    }

    let allFiles = [];
    for (const item of root) {
        const files = await flattenFiles(item);
        allFiles = allFiles.concat(files);
    }

    const publicDir = path.resolve("./public");
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

    fs.writeFileSync(
        path.join(publicDir, "maps.json"),
        JSON.stringify(allFiles, null, 2)
    );

    console.log(`maps.json generated with ${allFiles.length} files`);
}

main().catch(console.error);
