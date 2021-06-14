
function check1(){
    var checkBox = document.getElementById("Check1");
    var canvas = document.getElementById("micanvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = "Imagenes/hospital.jpg";



    if (checkBox.checked === true)
    {
        ctx.drawImage(img, 0, 0);
    }
    if (checkBox.checked === false)
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}