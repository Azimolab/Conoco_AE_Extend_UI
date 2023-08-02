(function () {
  ("use strict");

  // DOM elements
  const forms = document.querySelectorAll(".needs-validation");
  const style = document.getElementById("style");
  const version = document.getElementById("version");
  const color_scheme = document.getElementById("color_scheme");
  const crop_select = document.getElementById("crop_select");
  const image = document.getElementById("image");
  const inputs = document.querySelectorAll("select"); // Seleciona todos os elementos select
  const createCompositionBtn = document.getElementById("create-composition"); // Botão Create Composition
  const exportBtn = document.getElementById("export"); // Botão Export

  let cropper;

  const AR = {
    "16:9": { x: 0, y: 0, width: 1920, aspectRatio: 1.7777777777777777 },
    "9:16": { x: 0, y: 0, width: 607, aspectRatio: 0.5625 },
    "2:3": { x: 0, y: 0, width: 720, aspectRatio: 0.6666666666666667 },
    "4:3": { x: 0, y: 0, width: 1440, aspectRatio: 1.333333333333333 },
    "21:9": { x: 0, y: 0, width: 1920, aspectRatio: 2.333333333333333 },
    "9:21": { x: 0, y: 0, width: 463, aspectRatio: 0.4285714285714286 },
    "1:1": { x: 0, y: 0, width: 1080, aspectRatio: 1 },
  };

  const AR4 = {
    "16:9": { x: 140, y: 279, width: 398, aspectRatio: 1.7777777777777777 },
    "9:16": { x: 260, y: 0, width: 292, aspectRatio: 0.5625 },
    "2:3": { x: 172, y: 280, width: 137, aspectRatio: 0.6666666666666667 },
    "4:3": { x: 128, y: 216, width: 378, aspectRatio: 1.333333333333333 },
    "21:9": { x: 157, y: 316, width: 434, aspectRatio: 2.333333333333333 },
    "9:21": { x: 116, y: 72, width: 229, aspectRatio: 0.4285714285714286 },
    "1:1": { x: 304, y: 269, width: 232, aspectRatio: 1 },
  };

  // const AR2 = {
  //   "16:9": { x: 0, y: 0, width: 1920, aspectRatio: 1.7777777777777777 },
  //   "9:16": { x: 878, y: 0, width: 580, aspectRatio: 0.5625 },
  //   "2:3": { x: 778, y: 0, width: 700, aspectRatio: 0.6666666666666667 },
  //   "4:3": { x: 480, y: 0, width: 1440, aspectRatio: 1.333333333333333 },
  //   "21:9": { x: 0, y: 0, width: 2550, aspectRatio: 2.333333333333333 },
  //   "9:21": { x: 1000, y: 0, width: 463, aspectRatio: 0.4285714285714286 },
  //   "1:1": { x: 400, y: 0, width: 1080, aspectRatio: 1 },
  // };

  const AR2 = {
    "16:9": { x: 0, y: 168, width: 467, aspectRatio: 1.7777777777777777 },
    "9:16": { x: 216, y: 141, width: 145, aspectRatio: 0.5625 },
    "2:3": { x: 158, y: 133, width: 181, aspectRatio: 0.6666666666666667 },
    "4:3": { x: 0, y: 120, width: 416, aspectRatio: 1.333333333333333 },
    "21:9": { x: 0, y: 160, width: 670, aspectRatio: 2.333333333333333 },
    "9:21": { x: 220, y: 119, width: 118, aspectRatio: 0.4285714285714286 },
    "1:1": { x: 108, y: 154, width: 287, aspectRatio: 1 },
  };

  // const AR3 = {
  //   "16:9": { x: 366, y: 271, width: 381, aspectRatio: 1.7777777777777777 },
  //   "9:16": { x: 446, y: 93, width: 217, aspectRatio: 0.5625 },
  //   "2:3": { x: 443, y: 157, width: 214, aspectRatio: 0.6666666666666667 },
  //   "4:3": { x: 350, y: 166, width: 397, aspectRatio: 1.333333333333333 },
  //   "21:9": { x: 354, y: 302, width: 393, aspectRatio.png: 2.333333333333333 },
  //   "9:21": { x: 446, y: 67, width: 217, aspectRatio: 0.4285714285714286 },
  //   "1:1": { x: 362, y: 93, width: 385, aspectRatio: 1 },
  // };

  const AR3 = {
    "16:9": { x: 366, y: 234, width: 381, aspectRatio: 1.7777777777777777 },
    "9:16": { x: 446, y: 56, width: 217, aspectRatio: 0.5625 },
    "2:3": { x: 443, y: 120, width: 214, aspectRatio: 0.6666666666666667 },
    "4:3": { x: 350, y: 130, width: 397, aspectRatio: 1.333333333333333 },
    "21:9": { x: 354, y: 265, width: 393, aspectRatio: 2.333333333333333 },
    "9:21": { x: 446, y: 29, width: 217, aspectRatio: 0.4285714285714286 },
    "1:1": { x: 362, y: 53, width: 385, aspectRatio: 1 },
  };

  // Images data
  // The data object has been truncated for brevity

  var imagesData = {
    "Solid Mark Motif": {
      "Without Lines": {
        "Red only": { img: "./assets/smm/smm_red_only.png", lock: false, alpha: false, data: AR },
        "Blue only": { img: "./assets/smm/smm_blue_only.png", lock: false, alpha: false, data: AR },
        "Teal only": { img: "./assets/smm/smm_teal_only.png", lock: false, alpha: false, data: AR },
        "Salmon only": { img: "./assets/smm/smm_salmon_only.png", lock: false, alpha: false, data: AR },
        "Orange only": { img: "./assets/smm/smm_orange_only.png", lock: false, alpha: false, data: AR },
        "Purple only": { img: "./assets/smm/smm_purple_only.png", lock: false, alpha: false, data: AR },
        "Fuchsia only": { img: "./assets/smm/smm_fuchsia_only.png", lock: false, alpha: false, data: AR },
        "Green only": { img: "./assets/smm/smm_green_only.png", lock: false, alpha: false, data: AR },
        "Aqua only": { img: "./assets/smm/smm_aqua_only.png", lock: false, alpha: false, data: AR },
        "Red + Salmon": { img: "./assets/smm/smm_red_salmon.png", lock: false, alpha: false, data: AR },
        "Red + Orange": { img: "./assets/smm/smm_red_orange.png", lock: false, alpha: false, data: AR },
        "Blue + Purple": { img: "./assets/smm/smm_blue_purple.png", lock: false, alpha: false, data: AR },
        "Blue + Fuchsia": { img: "./assets/smm/smm_blue_fuchsia.png", lock: false, alpha: false, data: AR },
        "Teal + Green": { img: "./assets/smm/smm_teal_green.png", lock: false, alpha: false, data: AR },
        "Teal + Aqua": { img: "./assets/smm/smm_teal_aqua.png", lock: false, alpha: false, data: AR },
      },
    },

    // Continue dessa forma para as outras categorias: Database, Hybrid/Cross-Platform
  };

  // Functions
  function populateDropdown(dropdown, options) {
    dropdown.options.length = 0;
    options.forEach((option) => dropdown.options.add(new Option(option)));
  }

  function initCropper(imageData, aspectRatio, lock, cropOption) {
    if (cropper) cropper.destroy();

    image.classList.remove("fade");

    image.onload = function () {
      image.classList.add("fade");
      const cropData = imageData.data[aspectRatio];
      const cropScale = cropOption === "100%" ? 1 : cropOption === "200%" ? 0.7 : 1;
      console.log(cropScale);
      console.log(cropData);
      cropper = new Cropper(image, {
        viewMode: 3,
        zoomable: false,
        aspectRatio: cropData.aspectRatio,
        crop: function (event) {
          // var width = Math.round(event.detail.width);
          // var height = Math.round(event.detail.height);
          // if (width < 100 || height < 100 || width > 2560 || height > 1082) {
          //   cropper.setData({
          //     width: Math.max(100, Math.min(2560, width)),
          //     height: Math.max(100, Math.min(1080, height)),
          //   });
          // }
          data.textContent = JSON.stringify(cropper.getData(true));
          // var data3 = JSON.stringify(cropper.getData(true));
          // console.log(data3);
        },
        ready: function () {
          // console.log(cropScale);
          // console.log(cropData);
          // console.log(cropData.width * cropScale);
          // console.log((cropData.width * cropScale) / cropData.aspectRatio);
          // Adjust the crop area size based on the selected crop option
          cropper.setData({
            x: cropData.x,
            y: cropData.y,
            width: cropData.width * cropScale,
            height: (cropData.width * cropScale) / cropData.aspectRatio,
          });
        },
        cropmove: function (event) {
          if (lock == true) event.preventDefault();
        },
      });
    };

    image.src = imageData.img;
  }
  // Verifique se todos os campos estão preenchidos
  function checkInputs() {
    let allFilled = true;
    inputs.forEach((input) => {
      if (input.value === "") {
        allFilled = false;
      }
    });

    // Se todos os campos estiverem preenchidos, habilite os botões. Caso contrário, desabilite-os
    if (allFilled) {
      createCompositionBtn.disabled = false;
      exportBtn.disabled = false;
    } else {
      createCompositionBtn.disabled = true;
      exportBtn.disabled = true;
    }
  }

  // Ouve eventos de alteração em todos os campos de entrada
  inputs.forEach((input) => {
    input.addEventListener("change", checkInputs);
  });

  // Event listeners
  window.onload = function () {
    populateDropdown(style, Object.keys(imagesData));
    checkInputs;

    style.onchange = function () {
      populateDropdown(version, Object.keys(imagesData[this.value]));
      version.onchange();
    };

    version.onchange = function () {
      populateDropdown(color_scheme, Object.keys(imagesData[style.value][this.value]));
      color_scheme.onchange();
    };

    color_scheme.onchange = function () {
      const chosenData = imagesData[style.value][version.value][this.value];
      const lock = chosenData.lock;

      // Disable crop_select if lock is true
      crop_select.disabled = lock;

      aspect_ratio_select.disabled = !this.value;
      aspect_ratio_select.onchange();
    };

    aspect_ratio_select.onchange = function () {
      const chosenData = imagesData[style.value][version.value][color_scheme.value];
      const aspectRatio = this.value;
      const lock = chosenData.lock;
      const cropOption = crop_select.value;
      initCropper(chosenData, aspectRatio, lock, cropOption);
    };

    crop_select.onchange = function () {
      const chosenData = imagesData[style.value][version.value][color_scheme.value];
      const aspectRatio = aspect_ratio_select.value;
      const lock = chosenData.lock;
      const cropOption = this.value;
      initCropper(chosenData, aspectRatio, lock, cropOption);
    };

    document.addEventListener("DOMContentLoaded", (event) => {
      // Get references to the elements
      const movRadio = document.getElementById("MOV_file");
      const mp4Radio = document.getElementById("MP4_file");
      const alphaSwitch = document.getElementById("switch_apha");

      // Disable the switch initially if MOV is not checked
      alphaSwitch.disabled = !movRadio.checked;

      // Listen for changes on the radio buttons
      movRadio.addEventListener("change", updateSwitch);
      mp4Radio.addEventListener("change", updateSwitch);

      // Function to enable or disable the switch based on the selected radio button
      function updateSwitch() {
        alphaSwitch.disabled = !movRadio.checked;
      }
    });

    style.onchange(); // Populate the dropdowns on page load
  };
})();
