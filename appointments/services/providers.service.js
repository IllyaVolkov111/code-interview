const providers = require("./providers.json");

exports.upsert = params => {
  return new Promise(function(resolve) {
    const { name } = params;
    let provider = providers.find(provider => provider.name === name);

    if (provider) {
      providers.forEach((element, index) => {
        if (element.name === name) {
          providers[index] = params;
        }
      });
    } else {
      providers.push(params);

      resolve();
    }
  });
};

exports.deleteProvider = name => {
  return new Promise(function(resolve) {
    let providerIndex;

    for (let i = 0; i < providers.length; i++) {
      if (providers[i].name === name) {
        providerIndex = i;
        break;
      }
    }

    providers.splice(providerIndex, 1);

    resolve();
  });
};
