/* eslint-disable */
const { execSync } = require('child_process');
const fs = require('fs');

execSync(`jsdoc  --configure jsdoc.config.json --verbose --readme ./DOCS.README.md --destination public/docs/ && cp __DOC_RESOURCES__/customStyles.css public/docs/`, {stdio: 'inherit'})
