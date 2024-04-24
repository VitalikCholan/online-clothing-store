const imagesSection = document.querySelector('.images');
const descriptionSection = document.querySelector('.description');

async function fetchData() {
  try {
    const response = await fetch('http://localhost:8080/api/v1/clothings/1');
    if (response.ok) {
      const data = await response.json();

      data._links.images.forEach((image) => {
        const img = document.createElement('img');
        img.src = image.href;
        imagesSection.appendChild(img);
      });

      const clothingName = document.createElement('h2');
      clothingName.textContent = data.name;
      descriptionSection.appendChild(clothingName);

      const clothingType = document.createElement('p');
      clothingType.textContent = `Clothing type: ${data.type}`;
      descriptionSection.appendChild(clothingType);

      const clothingSize = document.createElement('p');
      clothingSize.textContent = `Clothing size: ${data.size}`;
      descriptionSection.appendChild(clothingSize);

      const clothingSex = document.createElement('p');
      clothingSex.textContent = `Clothing sex: ${data.sex}`;
      descriptionSection.appendChild(clothingSex);

      const clothingSeason = document.createElement('p');
      clothingSeason.textContent = `Clothing season: ${data.season}`;
      descriptionSection.appendChild(clothingSeason);

      const clothingCondition = document.createElement('p');
      clothingCondition.textContent = `Clothing condition: ${data.condition}`;
      descriptionSection.appendChild(clothingCondition);

      const clothingProducer = document.createElement('p');
      clothingProducer.textContent = `Clothing producer: ${data.producer}`;
      descriptionSection.appendChild(clothingProducer);

      const clothingPrice = document.createElement('p');
      clothingPrice.textContent = `Clothing price: ${data.price}`;
      descriptionSection.appendChild(clothingPrice);

      const clothingDiscount = document.createElement('p');
      clothingDiscount.textContent = `Clothing discount: ${data.discount}`;
      descriptionSection.appendChild(clothingDiscount);
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

window.addEventListener('load', fetchData);
