import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "books.json");
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const book = req.body.book;
    const newBook = {
      id: new Date().toISOString(),
      name: book,
    };

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newBook);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200).json({ message: "Success!" });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ books: data });
  }
}

export default handler;
