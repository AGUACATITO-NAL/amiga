let currentIndex = 0;
const images = [
  "fotos/1.png", "fotos/2.png", "fotos/3.png", "fotos/4.png", "fotos/5.png", 
  "fotos/6.png", "fotos/7.png", "fotos/8.png", "fotos/9.png"
];
const totalImages = images.length;

const photoElement = document.getElementById('photo');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// Actualizamos la imagen mostrada
function updateImage() {
  photoElement.style.transform = 'scale(0.8)';
  setTimeout(() => {
    photoElement.src = images[currentIndex];
    photoElement.style.transform = 'scale(1)';
  }, 300);
}

// Función para pasar a la foto anterior
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  updateImage();
});

// Función para pasar a la foto siguiente
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalImages;
  updateImage();
});

// Función para crear el collage de las 9 fotos
document.getElementById('collage-button').addEventListener('click', () => {
  const collageContainer = document.getElementById('collage-container');
  collageContainer.innerHTML = ''; // Limpiar antes de crear el collage
  images.forEach((imgSrc) => {
    const imgElement = document.createElement('img');
    imgElement.src = imgSrc;
    collageContainer.appendChild(imgElement);
  });
  collageContainer.style.display = 'flex';

  // Mostrar el botón de descarga después de crear el collage
  document.getElementById('download-collage').style.display = 'inline-block';
});

// Función para descargar el collage como imagen
document.getElementById('download-collage').addEventListener('click', () => {
  const collageContainer = document.getElementById('collage-container');
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const collageWidth = 900; // Ancho total del collage
  const collageHeight = 600; // Alto total del collage
  canvas.width = collageWidth;
  canvas.height = collageHeight;

  // Colocamos las imágenes en el canvas para formar el collage
  let xPos = 0;
  let yPos = 0;

  collageContainer.querySelectorAll('img').forEach((img, index) => {
    const imgElement = new Image();
    imgElement.src = img.src;
    imgElement.onload = () => {
      ctx.drawImage(imgElement, xPos, yPos, 300, 200);
      xPos += 300;
      if (xPos >= collageWidth) {
        xPos = 0;
        yPos += 200;
      }
    };
  });

  // Cuando todas las imágenes hayan sido cargadas y dibujadas, descargamos el collage
  setTimeout(() => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'collage.png';
    link.click();
  }, 500);
});
