FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
);

const inputElement = document.querySelector('input[type="file"]');

const selectedFileNames = [];

FilePond.create(inputElement, {
  acceptedFileTypes: ['image/*'],
  allowMultiple: true,
  onaddfile: (error, file) => {
    if (!error) {
      selectedFileNames.push(file.filename);
    }
  },
  server: {
    process: {
      url: 'http://localhost:8080/api/v1/images/multiple',
      method: 'POST',
      withCredentials: false,
      onload: (response) => {
        console.log('Image uploaded successfully', response);
      },
      onerror: (response) => {
        console.log('Error uploading image', response);
      },
    },
  },
});

const dataForm = document.getElementById('dataForm');

dataForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    clothingType: document.querySelector('input[name="clothingType"]:checked')
      .value,
    clothingSize: document.querySelector('input[name="clothingSize"]:checked')
      .value,
    clothingSex: document.querySelector('input[name="clothingSex"]:checked')
      .value,
    clothingSeason: document.querySelector(
      'input[name="clothingSeason"]:checked',
    ).value,
    clothingCondition: document.querySelector(
      'input[name="clothingCondition"]:checked',
    ).value,
    producer: document.getElementById('producer').value,
    price: document.getElementById('price').value,
    discount: document.getElementById('discount').checked ? 1 : 0,
    imagesNames: selectedFileNames,
  };

  try {
    const response = await fetch('http://localhost:8080/api/v1/clothings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      console.log('Product data submitted successfully', response.id);
    } else {
      console.error('Error submitting product data:', response.statusText);
    }
  } catch (error) {
    console.error('Error submitting product data:', error);
  }
});
