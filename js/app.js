function replaceTags(partialTag) {
  let promises = [];
  let phTags = document.getElementsByTagName(partialTag);
  for (ii in phTags) {
    let elmnt = phTags[ii];
    if (typeof elmnt === "object") {
      let pathInclude = "./atomic/" + partialTag + "/" + elmnt.attributes[0].name + ".xml";
      promises.push(
        fetch(pathInclude, { mode: "no-cors" })
          .then(response => response.text())
          .then(data => {
            console.log("fetched");
            elmnt.innerHTML = data;
            elmnt.replaceWith(...elmnt.childNodes);
          })
          .catch(error => console.error(error))
      );
    }
  }

  return Promise.all(promises);
}

function replaceTokensWith() {
  let promises = [];
  const foundTokens = [...document.body.innerHTML.matchAll(RegExp("%.*%", "gi"))];

  sortedKeys = Object.keys(foundTokens).map(function(index) {
    return foundTokens[index][0];
  });
  sortedKeys = sortedKeys.sort();

  for (ii in sortedKeys) {
    let strng = sortedKeys[ii];
    let tokenName = strng.substring(1, strng.length - 1);
    let pathInclude = "./atomic/tkn/" + tokenName;
    promises.push(
      fetch(pathInclude, { mode: "no-cors" })
        .then(response => response.text())
        .then(data => {
          document.body.innerHTML = document.body.innerHTML.split(strng).join(data);
        })
        .catch(error => console.error(error))
    );
  }
  return Promise.all(promises);
}

// sequence runs from outer to inner replacements
async function process() {
  await replaceTags("org");
  await replaceTags("mol");
  await replaceTags("atm");
  await replaceTokensWith();
}

process();
