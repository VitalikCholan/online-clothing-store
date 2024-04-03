(async () => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/clothings', {
      method: 'GET',
    });

    const data = await response.json();
    const boxCatalogs = document.querySelectorAll('.box-catalog');

    boxCatalogs.forEach((boxCatalog, index) => {
      if (data[index]) {
        const clothing = data[index];
        for (key in clothing) {
          if (key !== 'id' && key !== 'links') {
            const paragraph = document.createElement('p');
            paragraph.textContent = `${key}: ${clothing[key]}`;
            boxCatalog.appendChild(paragraph);
          }
        }
      }
    });
  } catch (error) {
    console.log('Error:', error);
  }
})();
