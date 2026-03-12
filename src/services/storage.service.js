const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, fileName) {
  return imagekit.upload({
    file,
    fileName,
  });
}

async function deleteFile(fileId) {
  return imagekit.deleteFile(fileId);
}

module.exports = {
  uploadFile,
  deleteFile,
};