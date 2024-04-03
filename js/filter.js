const nameInput = document.getElementById('name');

const producerInput = document.getElementById('producer');

const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');

const discountCheckbox = document.getElementById('discount');

const searchBtn = document.querySelector('.search-btn');

const containerCatalog = document.querySelector('.container-catalog');

const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
  });
});

function createFiltersObject() {
  const filters = {
    nameLike: nameInput.value.trim() !== '' ? nameInput.value.trim() : null,
    clothingType: null,
    clothingSize: null,
    sex: null,
    season: null,
    producerLike:
      producerInput.value.trim() !== '' ? producerInput.value.trim() : null,
    priceMin: parseFloat(minPriceInput.value) || 0,
    priceMax: parseFloat(maxPriceInput.value) || Infinity,
    hasDiscount: discountCheckbox.checked ? true : false,
  };

  return filters;
}

async function searchClothing() {
  const filters = createFiltersObject();

  const selectedTypeBtn = document.querySelector(
    '.box-sidebar:nth-child(2) .filter-btn.active',
  );

  let selectedType = null;
  if (selectedTypeBtn) {
    selectedType = selectedTypeBtn.textContent.toUpperCase();
  }

  const selectedSizeBtn = document.querySelector(
    '.box-sidebar:nth-child(3) .filter-btn.active',
  );

  let selectedSize = null;
  if (selectedSizeBtn) {
    selectedSize = selectedSizeBtn.textContent.toUpperCase();
  }

  const selectedSexBtn = document.querySelector(
    '.box-sidebar:nth-child(4) .filter-btn.active',
  );

  let selectedSex = null;
  if (selectedSexBtn) {
    selectedSex = selectedSexBtn.textContent.toUpperCase();
  }

  const selectedSeasonBtn = document.querySelector(
    '.box-sidebar:nth-child(5) .filter-btn.active',
  );

  let selectedSeason = null;
  if (selectedSeasonBtn) {
    selectedSeason = selectedSeasonBtn.textContent.toUpperCase();
  }

  try {
    const response = await fetch(
      'http://localhost:8080/api/v1/clothings/search',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameLike: null,
          clothingType: selectedType,
          clothingSize: selectedSize,
          sex: selectedSex,
          season: selectedSeason,
          producerLike: null,
          priceMin: 0,
          priceMax: 1000,
          hasDiscount: true,
        }),
      },
    );

    const data = await response.json();

    containerCatalog.innerHTML = '';

    const searchName = filters.nameLike ? filters.nameLike.toLowerCase() : '';
    const searchProducer = filters.producerLike
      ? filters.producerLike.toLowerCase()
      : '';
    const minPrice = filters.priceMin;
    const maxPrice = filters.priceMax;

    data.forEach((item) => {
      if (
        (!filters.nameLike || item.name.toLowerCase().includes(searchName)) &&
        (!filters.producerLike ||
          item.producer.toLowerCase().includes(searchProducer)) &&
        (minPrice === 0 || item.price >= minPrice) &&
        (maxPrice === Infinity || item.price <= maxPrice)
      ) {
        const clothingItem = document.createElement('div');
        const clothingName = document.createElement('h2');
        clothingName.textContent = item.name;
        clothingItem.appendChild(clothingName);

        const clothingType = document.createElement('p');
        clothingType.textContent = `Type: ${item.type}`;
        clothingItem.appendChild(clothingType);

        const clothingSize = document.createElement('p');
        clothingSize.textContent = `Size: ${item.size}`;
        clothingItem.appendChild(clothingSize);

        const clothingSex = document.createElement('p');
        clothingSex.textContent = `Sex: ${item.sex}`;
        clothingItem.appendChild(clothingSex);

        const clothingSeason = document.createElement('p');
        clothingSeason.textContent = `Season: ${item.season}`;
        clothingItem.appendChild(clothingSeason);

        // if (item.producer) {
        const clothingProducer = document.createElement('p');
        clothingProducer.textContent = `Producer: ${item.producer}`;
        clothingItem.appendChild(clothingProducer);
        // }

        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: ${item.price}`;
        clothingItem.appendChild(priceElement);

        clothingItem.innerHTML += `
              <p>Discount: ${item.discount}</p>
            `;

        containerCatalog.appendChild(clothingItem);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

searchBtn.addEventListener('click', () => {
  searchClothing();
});
