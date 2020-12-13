const baseUrl = "http://localhost:3000";

const comments = $(".commentary-container");
const comment = $("#comment").val();
const firstColor = $("#firstColor").val();
const secondColor = $("#secondColor").val();
const fontColor = $("#fontColor").val();
var lastId = 0;
var editingId = 0;

$(document).ready(function () {
  $.ajax({
    url: `${baseUrl}/comments`,
    method: "GET",
    dataType: "json",
    success: (data) => {
      if (data.length == 0) {
        $(".commentary-container").append(
          `<div class="nothing">Ainda não há nada por aqui :( <br> Faça um novo comentário!</p></div>`
        );
      } else {
        lastId = data[data.length - 1].id;
        for (var i = 0; i < data.length; i++) {
          createElement({
            id: data[i].id,
            comment: data[i].comment,
            color1: data[i].color1,
            color2: data[i].color2,
            font_color: data[i].font_color,
          });
        }
      }
    },
  });
});

$("#comment").on("keyup", () => {
  $(".text-wrap-ex").html(this.comment.value);
});

$("#firstColor, #secondColor, #fontColor").bind("change paste keyup", () => {
  $(".commentary-content-ex").css(
    "background-image",
    `linear-gradient(270deg, ${this.firstColor.value} 0%, ${this.secondColor.value} 100%`
  );
  $(".text-wrap-ex").css("color", this.fontColor.value);
});

const createElement = ({ id, comment, color1, color2, font_color }) => {
  $(".commentary-container").find(".nothing").hide();
  $(".commentary-container").append(
    `<div class="commentary" id="${id}"><div class="commentary-content" style="background-image: linear-gradient(270deg, ${color1} 0%, ${color2} 100%"><p class="text-wrap" style="color: ${font_color}">${comment}</p></div><div class="actions"><img class="sound" src="./assets/img/sound.svg"><img class="edit" src="./assets/img/edit.svg"><img class="delete" src="./assets/img/delete.svg"></div></div>`
  );
};

const editElement = ({ id, comment, color1, color2, font_color }) => {
  $(`#${editingId}`).replaceWith(
    `<div class="commentary" id="${id}"><div class="commentary-content" style="background-image: linear-gradient(270deg, ${color1} 0%, ${color2} 100%"><p class="text-wrap" style="color: ${font_color}">${comment}</p></div><div class="actions"><img class="sound" src="./assets/img/sound.svg"><img class="edit" src="./assets/img/edit.svg"><img class="delete" src="./assets/img/delete.svg"></div></div>`
  );
};

$(document).on("click", ".comment-button", () => {
  const dados = {
    id: (lastId += 1),
    comment: this.comment.value,
    color1: this.firstColor.value,
    color2: this.secondColor.value,
    font_color: this.fontColor.value,
  };

  $.ajax({
    url: `${baseUrl}/comments`,
    contentType: "application/json",
    dataType: "json",
    method: "POST",
    data: JSON.stringify(dados),
    success: (data) => {
      createElement(dados);
    },
    error: (data) => {
      alertify.error(data.responseJSON.error);
    },
  });
});

$(document).on("click", ".sound", function () {
  let text = '';
  const words = $(this).closest(".commentary").text()
  const textArray = words.split(' ')

  $.ajax({
    url: `${baseUrl}/badwords`,
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(textArray),
    success: (data) => {
      text = words
    },
    error: (data) => {
      text = data.responseJSON.status
    }
  })
  $.ajax({
    url: `${baseUrl}/comments/speak`,
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    success: (data) => {
      const audio = WatsonSpeech.TextToSpeech.synthesize(
        Object.assign(data, {
          text,
          voice: "pt-BR_IsabelaV3Voice",
        })
      );
      audio.onerror = function (err) {
        console.log("audio error: ", err);
      };
    },
  });
});

$(document).on("click", ".edit", function () {
  const id = $(this).closest(".commentary").attr("id");
  editingId = id;
  $.ajax({
    url: `${baseUrl}/comment/${id}`,
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: (data) => {
      $(".comment-button")
        .toggleClass("update-comment")
        .removeClass("comment-button");
      $(".update-comment").text("Atualizar");
      $("#comment").val(data.comment);
      $("#firstColor").val(data.color1);
      $("#secondColor").val(data.color2);
      $("#fontColor").val(data.font_color);
      $(".commentary-content-ex").css(
        "background-image",
        `linear-gradient(270deg, ${data.color1} 0%, ${data.color2} 100%`
      );
      $(".text-wrap-ex").css("color", data.font_color);
      $(".text-wrap-ex").html(data.comment);
    },
  });
});

$(document).on("click", ".update-comment", function () {
  const dados = {
    comment: $("#comment").val(),
    color1: $("#firstColor").val(),
    color2: $("#secondColor").val(),
    font_color: $("#fontColor").val(),
  };

  $.ajax({
    url: `${baseUrl}/comments/${editingId}`,
    method: "PUT",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(dados),
    success: (data) => {
      editElement(dados);
    },
    error: (data) => {
      alertify.error(data.responseJSON.error);
    },
  });
});

$(document).on("click", ".delete", function () {
  const id = parseInt($(this).closest(".commentary").attr("id"));
  $.ajax({
    url: `${baseUrl}/comments/${id}`,
    method: "DELETE",
    success: () => {
      $(this)
        .closest(".commentary")
        .fadeOut(300, function () {
          $(this).remove();
        });
    },
  });
});
