import fs from "fs";
import path from "path";
import { PDFParse } from "pdf-parse";

const folder = path.resolve("assets/content");
const files = fs.readdirSync(folder).filter((f) => f.toLowerCase().endsWith(".pdf"));
let out = "";

for (const f of files.sort()) {
  const data = new Uint8Array(fs.readFileSync(path.join(folder, f)));
  const parser = new PDFParse({ data });
  const result = await parser.getText();
  await parser.destroy();
  out += `${"=".repeat(80)}\nFILE: ${f}\n${"=".repeat(80)}\n${result.text}\n\n`;
}

fs.writeFileSync(path.join(folder, "extracted.txt"), out, "utf8");
console.log("wrote extracted.txt", out.length);
