// AS = active skills

import { writeFileSync } from "fs";
import path from "path";
import readLocaleFile from "./locale.js";

const boardNotation = /\[board=(\w+={0,2})\](.*?)\[\/board\]/gm;

export default function processAS(dataPath, distPath) {
  const {serialNumber, translation} = readLocaleFile(path.join(dataPath, "locale.skill.zh.bytes"));

  const ASKeys = Object.keys(translation).filter(key => key.match(/^NORMAL_\d+$/)).map(key => key.substring(7));
  const pureTextData = {};
  const formattedData = {};
  ASKeys.forEach(key => {
    const name = translation[`NORMAL_${key}`];
    const rawDesc = translation[`NORMAL_DESC_${key}`] ?? `NORMAL_DESC_${key}`;
    const pureTextDesc = rawDesc.replaceAll(boardNotation, "$2");
    const formattedDesc = rawDesc.replaceAll(boardNotation, "[board]$2[/board]");
    const boards = [...rawDesc.matchAll(boardNotation)].map(match => match[1]);

    pureTextData[key] = {
      name,
      description: pureTextDesc
    };
    formattedData[key] = {
      name,
      description: formattedDesc,
      boards: boards.length ? boards : undefined
    };
  });

  /*
  writeFileSync(path.join(distPath, "data", "as.json"), JSON.stringify({
    sn: serialNumber,
    data: pureTextData
  }));
  writeFileSync(path.join(distPath, "data", "formatted", "as.json"), JSON.stringify({
    sn: serialNumber,
    data: formattedData
  }));
  */
  writeFileSync(path.join(distPath, "data", "as.json"), JSON.stringify(pureTextData));
  writeFileSync(path.join(distPath, "data", "formatted", "as.json"), JSON.stringify(formattedData));
}
