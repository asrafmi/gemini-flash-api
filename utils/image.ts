import fs from "fs";

export const convertToBase64 = (filePath: string): string => {
  return fs.readFileSync(filePath).toString("base64");
};
