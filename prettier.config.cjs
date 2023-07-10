/** @type {import("prettier").Config & Record<string,any>} */
const config = {
    "semi": false,
    "singleQuote": true,
    "jsxSingleQuote": true,
    "tabWidth": 4,
    "bracketSpacing": true,
    "printWidth": 120,
    "bracketSameLine": false,
    "trailingComma": "all",
    "arrowParens": "always",
    "singleAttributePerLine": true,
    "endOfLine": "lf",
    "importOrder": [
        "<THIRD_PARTY_MODULES>",
        "",
        "^@/(.*)$",
        "",
        "^[./]"
    ],
    "importOrderParserPlugins": [
        "typescript",
        "jsx",
        "decorators-legacy"
    ],
    plugins: [require.resolve("@ianvs/prettier-plugin-sort-imports")],
};

module.exports = config;
