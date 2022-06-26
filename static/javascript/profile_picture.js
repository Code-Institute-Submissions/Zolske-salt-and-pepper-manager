const cloudName = "diwuglogr"; // replace with your own cloud name
const uploadPreset = "bjio1tzi"; // replace with your own upload preset
const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    cropping: true, //add a cropping step
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    multiple: false, //restrict upload to a single file
    folder: "salt_pepper_profile", //upload files to the specified folder
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    maxImageFileSize: 2000000, //restrict file size to less than 2MB
    maxImageWidth: 150, //Scales the image down to a width of 150 pixels before uploading
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      document
        .getElementById("picture_form")
        .setAttribute("value", result.info.secure_url);
      document
        .getElementById("check_new_profile")
        .setAttribute("src", result.info.secure_url);
      document.getElementById("button_form").removeAttribute("disabled");
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

console.log("hello");
