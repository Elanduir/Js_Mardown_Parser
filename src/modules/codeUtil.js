export { parseCode };

const CODE_REG = /(```.*\n(.*)\n```)/gi;

const parseCode = (text) => {
  let match;
  while ((match = CODE_REG.exec(text))) {
    let mRep, html;

    [mRep, html] = convertCodeSnippet(match);
    text = text.replace(mRep, html);
  }
  return text;
};

const convertCodeSnippet = (match) => {
  let cls = match[0].split("\n")[0].replace("```", "");
  let code = `<code${cls ? ` class="${cls}"` : ""}>${match.pop()}</code>`;
  return [match[0], code];
};
