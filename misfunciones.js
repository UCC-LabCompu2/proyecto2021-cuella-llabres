function check(){
    var checkBox = document.getElementById("Check1");
    var canvas = document.getElementById("micanvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = "Imagenes/hospital.jpg";



    if (checkBox.checked = true)
    {
        ctx.drawImage(img, 0, 0);
    }
}