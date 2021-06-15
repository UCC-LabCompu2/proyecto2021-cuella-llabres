function check1() {
    var checkBox = document.getElementById("Check1");
    let canvas = document.getElementById("micanvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
}

