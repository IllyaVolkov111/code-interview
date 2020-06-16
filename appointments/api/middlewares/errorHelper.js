exports.errorMiddlware = (err, req, res, next) => {
  if (err) return res.sendStatus(400);
};
