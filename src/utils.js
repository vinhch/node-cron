function removeSpaces(str) {
    return str.replace(/\s{2,}/g, ' ').trim();
}

module.exports = { removeSpaces };