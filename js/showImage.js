const imageInput = document.getElementById('image');
const imageShow = document.getElementById('imageShow');

imageInput.addEventListener('change', (e) => {
  let file = e.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.addEventListener('load', (e) => {
      imageShow.src = e.target.result;
      imageShow.style.display = 'block';
    });
    reader.readAsDataURL(file);
  }
});
