const stringtoLowerCaseSpace = (string) => {
  if (string) {
    return string.toLowerCase().replace(/\s/g, "");
  } else return 0;
};

const stringtoLowerCase = (string) => {
  if (string) {
    return string.toLowerCase();
  } else return 0;
};

const stringSpace = (string) => {
  if (string) {
    return string.replace(/\s/g, "");
  } else return 0;
};

module.exports = {
  stringSpace,
  stringtoLowerCase,
  stringtoLowerCaseSpace,
};
