
function hasStatusCode(err, ...statusCodes) {
  return err.response && statusCodes.includes(err.response.statusCode);
}

export default {
  hasStatusCode
};
