import { execTsc } from "./execTsc";
import { parseArgv } from "./options";

execTsc(parseArgv(process.argv.slice(2)));
