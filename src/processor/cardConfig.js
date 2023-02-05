import { readFileSync, writeFileSync } from "fs";
import path from "path";
import readLocaleFile from "./locale.js";

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf-8"));
}

export default function processCard(dataPath, distPath) {
  const monsters = readJson(path.join(dataPath, "monsters.json"));
  const monsterSkins = readJson(path.join(dataPath, "monsterSkins.json"));
  const monsterEvolve = readJson(path.join(dataPath, "monsterEvolve.json"));
  const {translation: monsterLocale} = readLocaleFile(path.join(dataPath, "locale.monster.zh.bytes"));
  const {translation: commonLocale} = readLocaleFile(path.join(dataPath, "locale.common.zh.bytes"));

  const cardData = {};
  monsters.data.forEach(entry => {
    const values = entry.split("|");

    const key = values[0];
    const name = monsterLocale[`MONSTER_${key}`] ?? "未知";
    const type = values[76];
    const seriesId = values[1];
    const series = commonLocale[`SERIES_${seriesId}`] ?? "";
    const attribute = parseInt(values[4]);
    const race = parseInt(values[3]);
    const rarity = parseInt(values[5]);
    const cost = parseInt(values[7]);
    const leaderSkill = parseInt(values[13]);
    const activeSkill1 = parseInt(values[14]);
    const activeSkill2 = parseInt(values[47]);

    cardData[key] = {
      name,
      type,
      series,
      attribute,
      race,
      rarity,
      cost,
      leaderSkill,
      activeSkill1,
      activeSkill2,
      skins: []
    };
  });
  monsterSkins.data.forEach(entry => {
    const values = entry.split("|");

    const id = 6000 + parseInt(values[0]);
    const owner = values[1];
    if(owner in cardData) {
      cardData[owner].skins.push(id);
    }
  });

  writeFileSync(path.join(distPath, "data", "cardConfig.json"), JSON.stringify(cardData));
}
