const imageInput = document.getElementById('images');
const imageShow = document.getElementById('imageShow');
const imageTemplate = document.getElementById('imageTemplate');

imageInput.addEventListener('change', (e) => {
  const files = e.target.files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        const clone = document.importNode(imageTemplate.content, true);
        const img = clone.querySelector('img');
        img.src = e.target.result;
        imageShow.appendChild(clone);
      });
      reader.readAsDataURL(file);
    }
  }
});
