// LS = leader skills

import { writeFileSync } from "fs";
import path from "path";
import readLocaleFile from "./locale.js";

export default function processLS(dataPath, distPath) {
  const {serialNumber, translation} = readLocaleFile(path.join(dataPath, "locale.skill.zh.bytes"));

  const LSKeys = Object.keys(translation).filter(key => key.match(/^LEADER_\d+$/)).map(key => key.substring(7));
  const pureTextData = {};
  LSKeys.forEach(key => {
    const rawDesc = translation[`LEADER_DESC_${key}`] ?? `LEADER_DESC_${key}`;

    pureTextData[key] = {
      name: translation[`LEADER_${key}`],
      description: rawDesc
    };
  });

  /*
  writeFileSync(path.join(distPath, "data", "pureText", "ls.json"), JSON.stringify({
    sn: serialNumber,
    data: pureTextData
  }));
  writeFileSync(path.join(distPath, "data", "formatted", "ls.json"), JSON.stringify({
    sn: serialNumber,
    data: pureTextData
  }));
  */
  writeFileSync(path.join(distPath, "data", "pureText", "ls.json"), JSON.stringify(pureTextData));
  writeFileSync(path.join(distPath, "data", "formatted", "ls.json"), JSON.stringify(pureTextData));
}
