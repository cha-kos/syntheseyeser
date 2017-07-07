
export const createKeyboard = function(){
  var keyboard = document.getElementById("keyboard");
  var keyCtx = keyboard.getContext("2d");
  keyCtx.fillStyle = "red";
  keyCtx.fillRect = (10,10,100,50);
};
