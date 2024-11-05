const handleTest = async (req, res) => {
  res.send({ message: "Une route de test!" });
};

module.exports = { handleTest };
