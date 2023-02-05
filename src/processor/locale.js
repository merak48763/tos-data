import { readFileSync } from "fs";

export default function readLocaleFile(inputFileName) {
  const buffer = readFileSync(inputFileName);

  let cursor = 1;

  const readNumber = () => {
    let result = 0;
    let [nextValue, offset] = [0, 0];
    do {
      nextValue = buffer.readUInt8(cursor);
      result |= (nextValue & 0x7f) << 7*offset;

      ++cursor;
      ++offset;
    } while(nextValue & 0x80)

    return result;
  };
  const readString = () => {
    const strlen = readNumber();
    const result = buffer.subarray(cursor, cursor+strlen).toString("utf-8");

    cursor += strlen;
    return result;
  };

  const serialNumber = readNumber();

  const translation = {};
  while(cursor < buffer.length - 1) {
    const key = readString();
    const value = readString();
    translation[key] = value;
  }

  return {serialNumber, translation};
}
