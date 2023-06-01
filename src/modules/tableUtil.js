export { parseTables };

const TABLE_REGEX = /((\|(.*))+\n*)+/gi;

const parseTables = (text) => {
  let m, code;
  let match;
  while ((match = TABLE_REGEX.exec(text))) {
    [m, code] = convertTables(match);
    text = text.replace(m, code);
  }
  return text;
};

const convertTables = (match) => {
  let m, code;
  let tableLines = match[0].split("\n");
  let headers = tableLines[0].split("|").filter((e) => e.trim() != "");
  headers = headers.map((h) => h.trim());
  let separators = tableLines[1].split("|").filter((e) => e.trim() != "");
  let values = tableLines.slice(2, -1);
  values = values.map((v) =>
    v
      .split("|")
      .map((v) => v.trim())
      .slice(1, -1)
  );
  const tablePrefix = "<table><tr>";
  const tableAffix = "</table>";
  let html = "";
  m = match[0];

  if (separators.length === headers.length) {
    html += tablePrefix;
    headers.forEach((h) => {
      html += `<th>${h}</th>`;
    });
    html += "</tr>";
    values.forEach((v) => (html += createTableRow(v)));
    html += tableAffix;

    code = html;
  } else {
    code = match[0];
  }
  return [m, code];
};

const createTableRow = (values) => {
  let html = "<tr>";
  values.forEach((v) => {
    html += `<td>${v}</td>`;
  });
  html += "</tr>";
  return html;
};
