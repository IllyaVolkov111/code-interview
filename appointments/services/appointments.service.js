const providers = require("./providers.json");

exports.getApprointments = ({ specialty, date, minScore }) => {
  return new Promise(function(resolve) {
    let filteredProviders = providers
      .filter(
        provider =>
          provider.specialties.some(
            el => el.toLowerCase() === specialty.toLowerCase()
          ) &&
          provider.score >= minScore &&
          provider.availableDates.some(
            el => el.from <= Number(date) && el.to >= Number(date)
          )
      )
      .sort((a, b) => b.score - a.score)
      .map(item => item.name);

    resolve(filteredProviders);
  });
};

exports.postApprointments = ({ date, name }) => {
  return new Promise(function(resolve, reject) {
    let provider = providers.filter(
      provider =>
        provider.name === name &&
        provider.availableDates.some(
          el => el.from <= Number(date) && el.to >= Number(date)
        )
    );

    provider[0] ? resolve() : reject();
  });
};
