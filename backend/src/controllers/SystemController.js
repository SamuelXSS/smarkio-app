const wordsList = require('../database/badWords.json')

module.exports = {
  async badWords(req, res) {
    const badwords = req.body

    const findedBadWord = badwords.some(x => wordsList.includes(x))

    if(findedBadWord){
      return res.status(400).json({ status: "Desculpe, mas esse tipo de palavra não é permitido" })
    }

    res.json({ status: "Okay! Tudo certo." })
  }
};
