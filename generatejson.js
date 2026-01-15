import fs from "fs";
import path from "path";
import fetch from "node-fetch"; // install with npm i node-fetch@3

const USER = "CityOfPhiladelphia";
const REPO = "fire-fifa-repository";
const ROOT_API = `https://api.github.com/repos/${USER}/${REPO}/contents/Maps`;

async function flattenFiles(item) {
    if (item.type === "file") {
        return [{ name: item.name, url: item.download_url }];
    } else if (item.type === "dir") {
        const children = await fetch(item.url).then((res) => res.json());
        const results = await Promise.all(children.map(flattenFiles));
        return results.flat();
    }
    return [];
}

async function main() {
    const root = await fetch(ROOT_API).then((res) => res.json());
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
