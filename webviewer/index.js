const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const images = [];
let currentImageIndex = 0;
let interval = 100;
let allImagesLoaded = false;
let imageLoopInterval;

// Load all images
const imagePromises = [];
for (let i = 0; i <= 19; i++) {
    const img = new Image();
    img.src = `images/${i.toString().padStart(2, '0')}.png`;
    images.push(img);

    const imagePromise = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
    });
    imagePromises.push(imagePromise);
}

// Function to change the interval
function changeInterval() {
    clearInterval(imageLoopInterval);
    interval = document.getElementById('intervalInput').value;
    startImageLoop();
}

// Function to draw the current image
function drawCurrentImage() {
    const currentImage = images[currentImageIndex];
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(currentImage, 0, 0);
}

// Function to handle image loading completion
function handleImageLoad() {
    allImagesLoaded = true;
    document.getElementById('status').textContent = 'Images loaded';
}

// Function to start the image loop
function startImageLoop() {
    imageLoopInterval = setInterval(() => {
        if (allImagesLoaded) {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            drawCurrentImage();
        }
    }, interval);
}

// Start the image loop once all images are loaded
Promise.all(imagePromises).then(() => {
    handleImageLoad();
    startImageLoop();
});

// Initial image draw
drawCurrentImage();
