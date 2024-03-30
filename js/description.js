fetch('http://localhost:8080/api/v1/clothings', {
  method: 'GET',
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
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
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
