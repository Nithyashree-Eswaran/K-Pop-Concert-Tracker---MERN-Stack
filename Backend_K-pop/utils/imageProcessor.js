const sharp = require('sharp');

async function processImage(imageBuffer) {
    try {
        // Process the image with sharp to auto-orient and remove EXIF data
        const processedBuffer = await sharp(imageBuffer)
            .rotate() // Auto-orient based on EXIF data
            .withMetadata({ orientation: 1 }) // Set orientation to normal
            .toBuffer();
        
        return processedBuffer;
    } catch (error) {
        console.error('Error processing image:', error);
        return imageBuffer; // Return original buffer if processing fails
    }
}

module.exports = { processImage };
