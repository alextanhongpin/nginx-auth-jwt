function version(r) {
  r.return(200, njs.version);
}

function printenv(r) {
  r.return(200, JSON.stringify(process.env));
}

export default { version, printenv };
