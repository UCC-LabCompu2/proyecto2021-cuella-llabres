function check1() {
    let canvas = document.getElementById("micanvas");
    var val = document.getElementById("cantidaddesintomas").value;
    var valorg = document.getElementById("grados").value;
    var ctx = canvas.getContext("2d");

    if (val != 1 && val != 2 && val != 3 && val != 4 && val != 5 && val != 6 && val != 7 && val != 8 && val != 9) {
        alert("Solo se permiten números o numeros entre el 1 y el 9");
    }
    if (val == 1 || val == 2 || val == 3 || val == 4 || val == 5 || val == 6 || val == 7 || val == 8 || val == 9) {
        ctx.beginPath();
        ctx.arc(100, 75, 50, 0, 2 * Math.PI);
        ctx.stroke();
    }



}

