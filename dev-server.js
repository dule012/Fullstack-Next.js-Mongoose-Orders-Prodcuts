require("dotenv").config();
const cli = require("next/dist/cli/next-dev");

cli.nextDev(["-p", process.env.NEXT_PUBLIC_PORT]);
