/**
 * Dibuja el canvas y hace la validacion de los datos
 * @method check1
 * @param canvas
 * @param valores inputs
 * @return voidFunction
 */


function check1() {
    var myCanvas = document.getElementById("micanvas");
    myCanvas.width = 700;
    myCanvas.height = 700;
    var val = document.getElementById("cantidaddesintomasgraves").value;
    var valorg = document.getElementById("grados").value;
    var valorm = document.getElementById("sintl").value;
    var ctx = myCanvas.getContext("2d");

    if (valorg != 1 && valorg != 2 && valorg != 3) {
        alert("Elija valores solamente entre el 1 y el 3");
    }
    if (val != 1 && val != 2 && val != 3) {
        alert("Solo se permiten números entre el 1 y el 3");
    }
    if (valorm != 1 && valorm != 2 && valorm != 3 && valorm != 4 && valorm != 5 && valorm != 6 && valorm != 7) {
        alert("Solo se permiten números entre el 1 y el 7")
    }
    if (val >= 1 && val <= 3 && valorg >= 1 && valorg <= 3 && valorm >= 1 && valorm <= 7) {
        /**
         * Dibuja las lineas
         * @param ctx referencia al contexto de dibujo
         * @param startX la coordenada X del punto de inicio de la línea
         * @param startY la coordenada Y del punto de inicio de la línea
         * @param endX la coordenada X del punto final de la línea
         * @param endY la coordenada Y del punto final de la línea
         * @param color color que tendra la linea
         */
        function drawLine(ctx, startX, startY, endX, endY, color) {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            ctx.restore();
        }

        /**
         * Dibuja las barras
         * @param ctx referencia al contexto de dibujo
         * @param upperLeftCornerX la coordenada X de la esquina superior izquierda de la barra
         * @param upperLeftCornerY la coordenada Y de la esquina superior izquierda de la barra
         * @param width el ancho de la barra
         * @param height la altura de la barra
         * @param color el color de la barra
         */
        function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
            ctx.save();
            ctx.fillStyle = color;
            ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
            ctx.restore();
        }

        /**
         *
         * @type {{"Riesgo promedio": number, "Tu riesgo": *}}
         */
        var myVinyls = {
            "Riesgo promedio": 121,
            "Tu riesgo": val + valorg + valorm,
        };
        /**
         *
         * @param options
         * @constructor
         */
        var Barchart = function (options) {
            this.options = options;
            this.canvas = options.canvas;
            this.ctx = this.canvas.getContext("2d");
            this.colors = options.colors;

            this.draw = function () {
                var maxValue = 0;
                for (var categ in this.options.data) {
                    maxValue = Math.max(maxValue, this.options.data[categ]);
                }
                var canvasActualHeight = this.canvas.height - this.options.padding * 2;
                var canvasActualWidth = this.canvas.width - this.options.padding * 2;

                //drawing the grid lines
                var gridValue = 0;
                while (gridValue <= maxValue) {
                    var gridY = canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;
                    drawLine(
                        this.ctx,
                        0,
                        gridY,
                        this.canvas.width,
                        gridY,
                        this.options.gridColor
                    );

                    //writing grid markers
                    this.ctx.save();
                    this.ctx.fillStyle = this.options.gridColor;
                    this.ctx.textBaseline = "bottom";
                    this.ctx.font = "bold 10px Arial";
                    this.ctx.fillText(gridValue, 10, gridY - 2);
                    this.ctx.restore();

                    gridValue += this.options.gridScale;
                }

                //drawing the bars
                var barIndex = 0;
                var numberOfBars = Object.keys(this.options.data).length;
                var barSize = (canvasActualWidth) / numberOfBars;

                for (categ in this.options.data) {
                    var val = this.options.data[categ];
                    var barHeight = Math.round(canvasActualHeight * val / maxValue);
                    drawBar(
                        this.ctx,
                        this.options.padding + barIndex * barSize,
                        this.canvas.height - barHeight - this.options.padding,
                        barSize,
                        barHeight,
                        this.colors[barIndex % this.colors.length]
                    );

                    barIndex++;
                }

                //drawing series name
                /* this.ctx.save();
                 this.ctx.textBaseline="bottom";
                 this.ctx.textAlign="center";
                 this.ctx.fillStyle = "#000000";
                 this.ctx.font = "bold 14px Arial";
                 this.ctx.fillText(this.options.seriesName, this.canvas.width/2,this.canvas.height);
                 this.ctx.restore();*/

                //draw legend
                barIndex = 0;
                var legend = document.querySelector("legend[for='micanvas']");
                var ul = document.createElement("ul");
                legend.append(ul);
                for (categ in this.options.data) {
                    var li = document.createElement("li");
                    li.style.listStyle = "none";
                    li.style.borderLeft = "20px solid " + this.colors[barIndex % this.colors.length];
                    li.style.padding = "5px";
                    li.textContent = categ;
                    ul.append(li);
                    barIndex++;
                }
            }
        }

        var myBarchart = new Barchart(
            {
                canvas: micanvas,
                seriesName: "Vinyl records",
                padding: 20,
                gridScale: 5,
                gridColor: "#eeeeee",
                data: myVinyls,
                colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743"]
            }
        );

        var myBarchart = new Barchart(
            {
                canvas: micanvas,
                padding: 10,
                gridScale: 5,
                gridColor: "#eeeeee",
                data: myVinyls,
                colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743"]
            }
        );
        myBarchart.draw();
        this.ctx.save();
        this.ctx.textBaseline = "bottom";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "bold 14px Arial";
        this.ctx.fillText(this.options.seriesName, this.canvas.width / 2, this.canvas.height);
        this.ctx.restore();
    }
}

/**
 * Limpia el gráfico
 * @method cleargraph
 * @param canvas
 * @return voidFunction
 * NO ANDA REVISAR
 */
function cleargraph() {
    var mycanvas = document.getElementById("micanvas");
    var ctx = mycanvas.getContext("2d");
}
