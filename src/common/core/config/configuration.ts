import {readFileSync} from "fs";
import * as yaml from 'js-yaml';
import {join} from 'path';
import {ConfigObject} from "@nestjs/config";

console.log('environment:')
console.log(process.env.NODE_ENV);
const ENV = process.env.NODE_ENV;
const YAML_CONFIG_FILENAME = !ENV ? 'config.yaml' : `${ENV}.config.yaml`;
export default () => {
    return yaml.load(
        readFileSync(join('./src/environment/', YAML_CONFIG_FILENAME), 'utf8'),
    ) as Record<string, any>;
};
