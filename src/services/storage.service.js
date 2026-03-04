const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
  return imageKit.upload({
    file,
    fileName,
  });
}

async function deleteFile(fileId) {
  return imageKit.deleteFile(fileId);
}

module.exports = {
  uploadFile,
  deleteFile,
};
