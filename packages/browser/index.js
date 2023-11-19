import * as reactor from "./lib.js";
import { Greet, GetHelloForLang } from "./node_modules/@reactor/core/index.js";

async function main() {
    const greet = reactor.action(Greet);
    const getHelloForLang = reactor.action(GetHelloForLang);

    const helloResult = await getHelloForLang.call({ name: "Doro", lang: "es" });
    document.body.innerHTML += `<p>${helloResult}</p>`;

    const greetResult = await greet.call({ name: "Doro", lang: "de" });
    document.body.innerHTML += `<p>${greetResult}</p>`;
}

main();