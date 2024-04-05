const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  try {
    const response = await fetch('', {
      method: 'POST',
      body: formData,
    });
    const data = await response.text();
    form.reset();
  } catch (error) {
    console.error('Error:', error);
  }
});
