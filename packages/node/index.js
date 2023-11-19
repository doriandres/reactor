import path from "node:path";
import Url from 'node:url';
import express from "express";

import * as reactor from "./lib.js";
import { Greet, GetHelloForLang } from "@reactor/core/index.js";

const greet = reactor.action(Greet);
const getHelloForLang = reactor.action(GetHelloForLang);

greet.implement(async (_, args = {}) => {
    console.log("greet action called");
    const { name } = args;

    const hello = await getHelloForLang.call(_, { lang: "en" });

    return `${hello}, ${name}!`;
});

getHelloForLang.implement(async (_, args = {}) => {
    console.log("getHelloForLang action called");
    const { lang } = args;

    switch (lang) {
        case "es":
            return "Hola";
        case "de":
            return "Hallo";
        case "fr":
            return "Bonjour";
        default:
            return "Hello";
    }
});

async function main() {
    const app = express();
    app.disable('x-powered-by');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.resolve(path.dirname(Url.fileURLToPath(import.meta.url)), "..", "browser")));
    app.post("/api/action", reactor.endpoint());
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log("Server is listening on http://localhost:" + port);
    });
}

main();