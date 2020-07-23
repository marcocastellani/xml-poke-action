const core = require("@actions/core");
const github = require("@actions/github");
const xmlpoke = require("xmlpoke");
const fs = require("fs");

const addns = (xml, ns, alias) => {
  if (ns !== undefined) xml.addNamespace(alias, ns);
};

try {
  const fileGlob = core.getInput("file-glob");
  const select = core.getInput("select");
  const set = core.getInput("set");
  const clear = core.getInput("clear");
  const remove = core.getInput("remove");
  const namespace = core.getInput("namespace");
  const namespaceAlias = core.getInput("namespace-alias");
  console.log(`Processing file ${fileGlob}`);
  console.log(`Search  ${select}`);
  console.log(`Replace ${set}`);
  console.log(`Clear ${clear}`);
  console.log(`Remoce ${remove}`);

  if (set !== "") {
    xmlpoke(fileGlob, function (xml) {
      addns(xml, namespace, namespaceAlias);
      xml.set(select, set);
    });
  }

  if (clear !== "") {
    xmlpoke(fileGlob, function (xml) {
      addns(xml, namespace, namespaceAlias);
      xml.clear(clear);
    });
  }

  if (remove !== "") {
    xmlpoke(fileGlob, function (xml) {
      addns(xml, namespace, namespaceAlias);
      xml.remove(remove);
    });
  }
  var contents = fs.readFileSync(fileGlob, "utf8");
  console.log(contents);
  core.setOutput("result", contents);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
