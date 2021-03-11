const fs = require('fs');

/**
 * The functions in this file are building-blocks for file manipulations done by buildDocs.js
 */

/**
 * Split file content into lines
 * @param content
 * @return [...strings]
 */
const splitToLines = (content) => {
  return content.split(/\r?\n/);
}

/**
 * Join lines with an EOL
 * @param lines
 */
const joinLines = (lines) => lines.join('\r\n');

/**
 * Get file content split into lines
 * @param fileName
 * @return [...strings]
 */
const getFileLines = (fileName) => {
  const file = fs.readFileSync(fileName, "utf8");
  return splitToLines(file);
}

/**
 * Find line number in file containing given keyword
 * @param fileName
 * @param keyword
 * @return {number} line number if found, -1 otherwise.
 */
const findLineNumber = (fileName, keyword) => {
  const lines = getFileLines(fileName);
  return lines.findIndex(line=>line.includes(keyword));
}

/**
 * Write given lines into given file
 * @param fileName
 * @param lines
 */
const writeLinesToFile = (fileName, lines) => {
  fs.writeFileSync(fileName, joinLines(lines));
};

/**
 * Delete lines in file from startIdx to endIdx
 * @param fileName
 * @param startIdx
 * @param endIdx
 */
const deleteLines = (fileName, startIdx, endIdx) => {
  let lines = getFileLines(fileName);
  lines.splice(startIdx, endIdx-startIdx);
  writeLinesToFile(fileName, lines);
}

/**
 * Delete lines in file from lines containing startStr to line containing endStr
 * @param fileName
 * @param startStr
 * @param endStr
 * @return {number}
 */
const deleteLinesFromToStr = (fileName, startStr, endStr) => {
  const startLine = findLineNumber(fileName, startStr);
  const endLine = findLineNumber(fileName, endStr);
  if (startLine > -1 && endLine > -1){
    deleteLines(fileName, startLine, endLine);
    console.log('Deleted', endLine-startLine, 'lines from', fileName);
    return startLine;
  }
  console.log('No lines deleted from', fileName);
  return -1;
}

/**
 * Insert given content at line of given file
 * @param fileName
 * @param line
 * @param content
 */
const insertToFileAtLine = (fileName, line, content) => {
  const lines = getFileLines(fileName);
  const contentLines = splitToLines(content);
  lines.splice(line, 0, ...contentLines);
  writeLinesToFile(fileName, lines);
}

/**
 * Replace in file:
 * First delete lines in file from lines containing startStr to line containing endStr
 * Then append content at line index where startStr was found
 * @param fileName
 * @param startStr
 * @param endStr
 * @param content
 * @return {boolean}
 */
const replaceFromToWith = (fileName, startStr, endStr, content) => {
  const startLine = deleteLinesFromToStr(fileName, startStr, endStr);
  if (startLine > -1){
    insertToFileAtLine(fileName, startLine, content);
    return true;
  }
  return false;
}

module.exports = { joinLines, getFileLines, writeLinesToFile, findLineNumber, deleteLines, deleteLinesFromToStr, replaceFromToWith };