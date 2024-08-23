#!/usr/bin/env node

import { randomUUID } from "crypto";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const { argv } = yargs(hideBin(process.argv)).command("CreateHero", "Create a hero", (builder) => {
  return builder
    .option("name", { alias: "n", demandOption: true, describe: "Hero name", type: "String" })
    .option("age", { alias: "a", demandOption: true, describe: "Hero age", type: "number" })
    .option("role", { alias: "r", demandOption: false, describe: "Hero role", type: "String" })
    .example("CreateHero --name Flash --age  55 --role CSI ")
    .example("CreateHero -n Flash -a  55 -r CSI ");
});

const hero = ({ name, age, role }) => ({ name, age, role, id: randomUUID() });

console.log(hero(argv));
