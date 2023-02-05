import { mkdirSync, existsSync } from "fs";
import processAS from "./src/processor/as.js";
import processLS from "./src/processor/ls.js";
import processCard from "./src/processor/cardConfig.js";

function ensureDirectory(path) {
  if(!existsSync(path)) mkdirSync(path, {recursive: true});
}
ensureDirectory("./dist/data/formatted");

processAS("./src/data", "./dist");
processLS("./src/data", "./dist");
processCard("./src/data", "./dist");
