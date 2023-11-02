const signOut = (req, res) => {
  res.clearCookie(
    'jwt', {
      sameSite: 'none',
      secure: true
    }
  );
  res.send({ message: 'Успешный выход'});
};

module.exports = signOut;
