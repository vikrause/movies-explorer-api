const signOut = (req, res) => {
  res.clearCookie('jwt');
  res.send({ message: 'Успешный выход'});
};

module.exports = signOut;
