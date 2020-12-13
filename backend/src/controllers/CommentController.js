const Comment = require("../models/Comment");
const { IamTokenManager } = require("ibm-watson/auth");
require("dotenv").config();

module.exports = {
  async show(req, res) {
    const { comment_id } = req.params;
    
    const comment = await Comment.findByPk(comment_id);

    return res.json(comment);
  },

  async index(req, res) {
    const comments = await Comment.findAll();

    return res.json(comments);
  },

  async store(req, res) {
    const { id, comment, color1, color2, font_color } = req.body;

    if (comment == "") {
      return res.status(400).json({ error: "Digite um comentário" });
    }

    if (comment.length < 5) {
      return res.status(400).json({ error: "Digite pelo menos 5 letras para comentar!" });
    }

    const create = await Comment.create({ id,comment,color1,color2,font_color });

    return res.status(201).json({ success: "Comentário adicionado com sucesso, ouça ele!", create });
  },

  async speak(req, res) {
    const ttsAuthenticator = new IamTokenManager({
      apikey: process.env.TEXT_TO_SPECH_SECRET,
    });
    return ttsAuthenticator
      .requestToken()
      .then(({ result }) => {
        res.json({
          accessToken: result.access_token,
          url: process.env.TEXT_TO_SPEECH_URL,
        });
      })
      .catch(console.error);
  },

  async update(req, res) {
    const { comment_id } = req.params;
    const { comment, color1, color2, font_color } = req.body;
    
    const commented = await Comment.findByPk(comment_id);
    
    if (comment == "") {
      return res.status(400).json({ error: "Digite um comentário" });
    }

    if (!commented) {
      return res.status(404).json({ error: "Esse comentário não existe :(" });
    }

    const update = await commented.update({ comment,color1,color2,font_color });

    return res.status(200).json({ success: "Comentário atualizado com sucesso, ouça :D", update });
  },

  async destroy(req, res) {
    const { comment_id } = req.params;

    const comment = await Comment.findByPk(comment_id);
    const comments = await Comment.findAll();

    if (!comment) {
      return res.status(404).json({ error: "Esse comentário não existe :(" });
    }

    await comment.destroy({ where: { id: comment_id } });

    if (comments.length == 1) {
      await Comment.truncate();
    }

    return res.status(200).json({ success: "Comentário deletado com sucesso!" });
  },
};
