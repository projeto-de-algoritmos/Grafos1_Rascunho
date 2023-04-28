const exportButton = document.getElementById("export");
exportButton.addEventListener("click", exportGrid);

async function exportGrid() {
    const grid = document.getElementById("grid");
    if(!confirm('Você deseja baixar o rascunho?')) return;
    await html2canvas(grid).then(function(canvas) {
      const link = document.createElement("a");
      link.download = "rascunho.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });

    alert('Download do rascunho completo!');
  }