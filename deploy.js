const loadJsonFile = require('load-json-file');

const client = require('scp2');
const envName = process.env.npm_config_envName || 'test';

const command = process.env.npm_config_command || 'setup';

const jsonProperties = loadJsonFile.sync("config/" + envName + "/config.json");

// jsonProperties.ssh.privateKey = require('fs').readFileSync(jsonProperties.ssh.privateKey).toString();

const deployPath = "config/" + envName;
// deploy(jsonProperties.ssh.website, undefined, client);
console.log(command);

switch (command) {
    case "setup":
        setup();
        break;
    case "upload":
        console.log('upload');
        upload();
        break;
    case "deploy":
        deploy();
        break;
    default:
        throw new Error("Unknown command " + command);
}

async function setup() {
    const node_ssh = require('node-ssh');
    const ssh = new node_ssh();
    await ssh.connect(jsonProperties.ssh);
    await ssh.execCommand('sudo mkdir /ustx-backend');
    await ssh.execCommand('sudo chmod -R 777 /ustx-backend');
    await ssh.execCommand('sudo yum install unzip -y');
    await ssh.execCommand('sudo npm install -g forever');
    await ssh.dispose();
}

async function upload() {
    console.log('here');
    const node_ssh = require('node-ssh');
    const ssh = new node_ssh();
    await ssh.connect(jsonProperties.ssh);
    const files = Object.keys(jsonProperties.files).map(key => {
        return {local: key, remote: jsonProperties.files[key]}
    });
    console.log(files);
    await ssh.putFiles(files);
    await ssh.dispose();
}

async function deploy() {
    const node_ssh = require('node-ssh');
    const ssh = new node_ssh();
    await ssh.connect(jsonProperties.ssh);
    let commandOptions = {cwd: '/ustx-backend'};
    await ssh.execCommand('unzip -o ustx-backend.zip', commandOptions);
    await ssh.execCommand('npm install', commandOptions);
    await ssh.execCommand('forever stop index.tsx', commandOptions);
    await ssh.execCommand('forever start index.tsx', commandOptions);
    await ssh.dispose();
}
