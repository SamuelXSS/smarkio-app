const baseUrl = "http://localhost:3000";

const comments = $(".commentary-container");
const comment = $("#comment").val();
const firstColor = $("#firstColor").val();
const secondColor = $("#secondColor").val();
const fontColor = $("#fontColor").val();
var lastId = 0;

$(document).ready(function () {
  $.ajax({
    url: `${baseUrl}/comments`,
    method: "GET",
    dataType: "json",
    success: (data) => {
      if(data.length == 0){
        $(".commentary-container").append(
          `<div class="nothing">Ainda não há nada por aqui :( <br> Faça um novo comentário!</p></div>`
        );
      }
      else{
        lastId = data[data.length - 1].id;
        for (var i = 0; i < data.length; i++) {
          createElement({ id: data[i].id, comment: data[i].comment,color1: data[i].color1,color2: data[i].color2,font_color: data[i].font_color })
        }
      }
    },
  });
});
const createElement = ({id, comment, color1, color2, fontColor}) => {
  $('.commentary-container').find('.nothing').hide()
  $(".commentary-container").append(
    `<div class="commentary" id="${id}"><div class="commentary-content" style="background-image: linear-gradient(270deg, ${color1} 0%, ${color2} 100%"><p class="text-wrap" style="color: ${fontColor}">${comment}</p></div><div class="actions"><img class="sound" src="./assets/img/sound.svg"><img class="edit" src="./assets/img/edit.svg"><img class="delete" src="./assets/img/delete.svg"></div></div>`
  );
};

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

$(".comment-button").on("click", () => {
  const data = {
    id: lastId += 1,
    comment: this.comment.value,
    color1: this.firstColor.value,
    color2: this.secondColor.value,
    font_color: this.fontColor.value 
  }

  createElement(data);
  
  $.ajax({
    url: `${baseUrl}/comments`,
    contentType: "application/json",
    dataType: "json",
    method: "POST",
    data: JSON.stringify(data),
    success: (data) => {
      console.log(data);
    },
  });
});

$(document).on("click", ".sound", function () {
  const text = $(this).closest('.commentary').text()
  $.ajax({
    url: `${baseUrl}/comments/speak`,
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
        const audio = WatsonSpeech.TextToSpeech.synthesize(Object.assign(data, {
            text,
            voice: 'pt-BR_IsabelaV3Voice'
          }));
          audio.onerror = function(err) {
            console.log('audio error: ', err);
          };
    },
  });
});

$(document).on("click", ".delete", function () {
  const id = parseInt($(this).closest(".commentary").attr("id"));
  $(this)
    .closest(".commentary")
    .fadeOut(300, function() { $(this).remove() })
  $.ajax({
    url: `${baseUrl}/comments/${id}`,
    method: "DELETE",
    success: () => {
      console.log("Deletado com sucesso!");
    },
  });
});

