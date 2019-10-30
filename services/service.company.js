module.exports = () => {
  const addCompany = (payload) => new Promise(async (resolve, reject) => {
    try {
      resolve(payload);
    } catch (error) {
      reject(error);
    }
  });
  return addCompany;
};
