const exportButton = document.getElementById("export");
exportButton.addEventListener("click", exportGrid);

function exportGrid() {
    const grid = document.getElementById("grid");
  
    html2canvas(grid).then(function(canvas) {
      const link = document.createElement("a");
      link.download = "grid.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }