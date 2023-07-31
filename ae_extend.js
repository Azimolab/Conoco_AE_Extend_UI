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

  const AR2 = {
    "16:9": { x: 0, y: 0, width: 1920, aspectRatio: 1.7777777777777777 },
    "9:16": { x: 878, y: 0, width: 580, aspectRatio: 0.5625 },
    "2:3": { x: 778, y: 0, width: 700, aspectRatio: 0.6666666666666667 },
    "4:3": { x: 480, y: 0, width: 1440, aspectRatio: 1.333333333333333 },
    "21:9": { x: 0, y: 0, width: 2550, aspectRatio: 2.333333333333333 },
    "9:21": { x: 1000, y: 0, width: 463, aspectRatio: 0.4285714285714286 },
    "1:1": { x: 400, y: 0, width: 1080, aspectRatio: 1 },
  };

  const AR3 = {
    "16:9": { x: 641, y: 0, width: 1920, aspectRatio: 1.7777777777777777 },
    "9:16": { x: 1165, y: 0, width: 580, aspectRatio: 0.5625 },
    "2:3": { x: 1170, y: 0, width: 700, aspectRatio: 0.6666666666666667 },
    "4:3": { x: 1121, y: 0, width: 1440, aspectRatio: 1.333333333333333 },
    "21:9": { x: 0, y: 0, width: 2550, aspectRatio: 2.333333333333333 },
    "9:21": { x: 1190, y: 0, width: 463, aspectRatio: 0.4285714285714286 },
    "1:1": { x: 1480, y: 0, width: 1080, aspectRatio: 1 },
  };

  // Images data
  // The data object has been truncated for brevity

  var imagesData = {
    "Solid Mark Motif": {
      "Without Lines": {
        "Red only": { img: "./assets/smm/smm_red_only.png", lock: false, data: AR },
        "Blue only": { img: "./assets/smm/smm_blue_only.png", lock: false, data: AR },
        "Teal only": { img: "./assets/smm/smm_teal_only.png", lock: false, data: AR },
        "Salmon only": { img: "./assets/smm/smm_salmon_only.png", lock: false, data: AR },
        "Orange only": { img: "./assets/smm/smm_orange_only.png", lock: false, data: AR },
        "Purple only": { img: "./assets/smm/smm_purple_only.png", lock: false, data: AR },
        "Fuchsia only": { img: "./assets/smm/smm_fuchsia_only.png", lock: false, data: AR },
        "Green only": { img: "./assets/smm/smm_green_only.png", lock: false, data: AR },
        "Aqua only": { img: "./assets/smm/smm_aqua_only.png", lock: false, data: AR },
        "Red + Salmon": { img: "./assets/smm/smm_red_salmon.png", lock: false, data: AR },
        "Red + Orange": { img: "./assets/smm/smm_red_orange.png", lock: false, data: AR },
        "Blue + Purple": { img: "./assets/smm/smm_blue_purple.png", lock: false, data: AR },
        "Blue + Fuchsia": { img: "./assets/smm/smm_blue_fuchsia.png", lock: false, data: AR },
        "Teal + Green": { img: "./assets/smm/smm_teal_green.png", lock: false, data: AR },
        "Teal + Aqua": { img: "./assets/smm/smm_teal_aqua.png", lock: false, data: AR },
      },
      "With Lines": {
        "Red only": { img: "./assets/smml/smml_red_only.png", lock: false, data: AR },
        "Blue only": { img: "./assets/smml/smml_blue_only.png", lock: false, data: AR },
        "Teal only": { img: "./assets/smml/smml__teal_only.png", lock: false, data: AR },
        "Salmon only": { img: "./assets/smml/smml_salmon_only.png", lock: false, data: AR },
        "Orange only": { img: "./assets/smml/smml_orange_only.png", lock: false, data: AR },
        "Purple only": { img: "./assets/smml/smml_purple_only.png", lock: false, data: AR },
        "Fuchsia only": { img: "./assets/smml/smml_fuchsia_only.png", lock: false, data: AR },
        "Green only": { img: "./assets/smml/smml_green_only.png", lock: false, data: AR },
        "Aqua only": { img: "./assets/smml/smml_aqua_only.png", lock: false, data: AR },
        "Red + Salmon": { img: "./assets/smml/smml_red_salmon.png", lock: false, data: AR },
        "Red + Orange": { img: "./assets/smml/smml_red_orange.png", lock: false, data: AR },
        "Blue + Purple": { img: "./assets/smml/smml_blue_purple.png", lock: false, data: AR },
        "Blue + Fuchsia": { img: "./assets/smml/smml_blue_fuchsia.png", lock: false, data: AR },
        "Teal + Green": { img: "./assets/smml/smml_teal_green.png", lock: false, data: AR },
        "Teal + Aqua": { img: "./assets/smml/smml_teal_aqua.png", lock: false, data: AR },
      },
      "Text Frame": {
        "Red only": { img: "./assets/smm_text_frame/smm_text_frame_red_only_21_9.png", lock: true, data: AR2 },
        "Blue only": { img: "./assets/smm_text_frame/smm_text_frame_blue_only_21_9.png", lock: true, data: AR2 },
        "Teal only": { img: "./assets/smm_text_frame/smm_text_frame_teal_only_21_9.png", lock: true, data: AR2 },
        "Salmon only": { img: "./assets/smm_text_frame/smm_text_frame_salmon_only_21_9.png", lock: true, data: AR2 },
        "Orange only": { img: "./assets/smm_text_frame/smm_text_frame_orange_only_21_9.png", lock: true, data: AR2 },
        "Purple only": { img: "./assets/smm_text_frame/smm_text_frame_purple_only_21_9.png", lock: true, data: AR2 },
        "Fuchsia only": { img: "./assets/smm_text_frame/smm_text_frame_fuchsia_only_21_9.png", lock: true, data: AR2 },
        "Green only": { img: "./assets/smm_text_frame/smm_text_frame_green_only_21_9.png", lock: true, data: AR2 },
        "Aqua only": { img: "./assets/smm_text_frame/smm_text_frame_aqua_only_21_9.png", lock: true, data: AR2 },
        "Red + Salmon": { img: "./assets/smm_text_frame/smm_text_frame_red_salmon_21_9.png", lock: true, data: AR2 },
        "Red + Orange": { img: "./assets/smm_text_frame/smm_text_frame_red_orange_21_9.png", lock: true, data: AR2 },
        "Blue + Purple": { img: "./assets/smm_text_frame/smm_text_frame_blue_purple_21_9.png", lock: true, data: AR2 },
        "Blue + Fuchsia": { img: "./assets/smm_text_frame/smm_text_frame_blue_fuchsia_21_9.png", lock: true, data: AR2 },
        "Teal + Green": { img: "./assets/smm_text_frame/smm_text_frame_teal_green_21_9.png", lock: true, data: AR2 },
        "Teal + Aqua": { img: "./assets/smm_text_frame/smm_text_frame_teal_aqua_21_9.png", lock: true, data: AR2 },
      },
    },
    "Linear Mark Motif": {
      Main: {
        Red: { img: "./assets/lmm_m/lmm_main_red_16_9.png", lock: false, data: AR },
        Blue: { img: "./assets/lmm_m/lmm_main_blue_16_9.png", lock: false, data: AR },
        Teal: { img: "./assets/lmm_m/lmm_main_teal_16_9.png", lock: false, data: AR },
        Salmon: { img: "./assets/lmm_m/lmm_main_salmon_16_9.png", lock: false, data: AR },
        Orange: { img: "./assets/lmm_m/lmm_main_orange_16_9.png", lock: false, data: AR },
        Purple: { img: "./assets/lmm_m/lmm_main_purple_16_9.png", lock: false, data: AR },
        Fuchsia: { img: "./assets/lmm_m/lmm_main_fuchsia_16_9.png", lock: false, data: AR },
        Green: { img: "./assets/lmm_m/lmm_main_green_16_9.png", lock: false, data: AR },
        Aqua: { img: "./assets/lmm_m/lmm_main_aqua_16_9.png", lock: false, data: AR },
      },
      "Text Frame": {
        "Red 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_red_white_21_9.png", lock: true, data: AR2 },
        "Red 1 BG Red 4": { img: "./assets/lmm_text/lmm_text_frame_red_only_21_9.png", lock: true, data: AR2 },
        "Blue 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_blue_white_21_9.png", lock: true, data: AR2 },
        "Blue 1 BG Blue 4": { img: "./assets/lmm_text/lmm_text_frame_blue_only_21_9.png", lock: true, data: AR2 },
        "Teal 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_teal_white_21_9.png", lock: true, data: AR2 },
        "Teal 1 BG Teal 4": { img: "./assets/lmm_text/lmm_text_frame_teal_only_21_9.png", lock: true, data: AR2 },
        "Salmon 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_salmon_white_21_9.png", lock: true, data: AR2 },
        "Salmon 1 BG Salmon 4": { img: "./assets/lmm_text/lmm_text_frame_salmon_only_21_9.png", lock: true, data: AR2 },
        "Orange 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_orange_white_21_9.png", lock: true, data: AR2 },
        "Orange 1 BG Orange 4": { img: "./assets/lmm_text/lmm_text_frame_orange_only_21_9.png", lock: true, data: AR2 },
        "Purple 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_purple_white_21_9.png", lock: true, data: AR2 },
        "Purple 1 BG Purple 4": { img: "./assets/lmm_text/lmm_text_frame_purple_only_21_9.png", lock: true, data: AR2 },
        "Fuchsia 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_fuchsia_white_21_9.png", lock: true, data: AR2 },
        "Fuchsia 1 BG Fuchsia 4": { img: "./assets/lmm_text/lmm_text_frame_fuchsia_only_21_9.png", lock: true, data: AR2 },
        "Green 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_green_white_21_9.png", lock: true, data: AR2 },
        "Green 1 BG Green 4": { img: "./assets/lmm_text/lmm_text_frame_green_only_21_9.png", lock: true, data: AR2 },
        "Aqua 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_aqua_white_21_9.png", lock: true, data: AR2 },
        "Aqua 1 BG Aqua 4": { img: "./assets/lmm_text/lmm_text_frame_aqua_only_21_9.png", lock: true, data: AR2 },
      },
    },
    Ribbon: {
      Main: {
        "Red 1 BG White": { img: "./assets/ribbon_main/ribbon_main_red_white_21_9.png", lock: true, data: AR3 },
        "Red 1 BG Red 4": { img: "./assets/ribbon_main/ribbon_main_red_21_9.png", lock: true, data: AR3 },
        "Blue 1 BG White": { img: "./assets/ribbon_main/ribbon_main_blue_white_21_9.png", lock: true, data: AR3 },
        "Blue 1 BG Blue 4": { img: "./assets/ribbon_main/ribbon_main_blue_21_9.png", lock: true, data: AR3 },
        "Teal 1 BG White": { img: "./assets/ribbon_main/ribbon_main_teal_white_21_9.png", lock: true, data: AR3 },
        "Teal 1 BG Teal 4": { img: "./assets/ribbon_main/ribbon_main_teal_21_9.png", lock: true, data: AR3 },
        "Salmon 1 BG White": { img: "./assets/ribbon_main/ribbon_main_salmon_white_21_9.png", lock: true, data: AR3 },
        "Salmon 1 BG Salmon 4": { img: "./assets/ribbon_main/ribbon_main_salmon_21_9.png", lock: true, data: AR3 },
        "Orange 1 BG White": { img: "./assets/ribbon_main/ribbon_main_orange_white_21_9.png", lock: true, data: AR3 },
        "Orange 1 BG Orange 4": { img: "./assets/ribbon_main/ribbon_main_orange_21_9.png", lock: true, data: AR3 },
        "Purple 1 BG White": { img: "./assets/ribbon_main/ribbon_main_purple_white_21_9.png", lock: true, data: AR3 },
        "Purple 1 BG Purple 4": { img: "./assets/ribbon_main/ribbon_main_purple_21_9.png", lock: true, data: AR3 },
        "Fuchsia 1 BG White": { img: "./assets/ribbon_main/ribbon_main_fuchsia_white_21_9.png", lock: true, data: AR3 },
        "Fuchsia 1 BG Fuchsia 4": { img: "./assets/ribbon_main/ribbon_main_fuchsia_21_9.png", lock: true, data: AR3 },
        "Green 1 BG White": { img: "./assets/ribbon_main/ribbon_main_green_white_21_9.png", lock: true, data: AR3 },
        "Green 1 BG Green 4": { img: "./assets/ribbon_main/ribbon_main_green_21_9.png", lock: true, data: AR3 },
        "Aqua 1 BG White": { img: "./assets/ribbon_main/ribbon_main_aqua_white_21_9.png", lock: true, data: AR3 },
        "Aqua 1 BG Aqua 4": { img: "./assets/ribbon_main/ribbon_main_aqua_21_9.png", lock: true, data: AR3 },
      },
    },
    "3D": {
      Fluid: {
        "Red 1 BG White": { img: "./assets/3d_fluid_main/3d_fluid_main_red_white_21_9.png", lock: true, data: AR3 },
        "Red 1 BG Red 4": { img: "./assets/3d_fluid_main/3d_fluid_main_red_21_9.png", lock: true, data: AR3 },
        "Blue 1 BG White": { img: "./assets/3d_fluid_main/3d_fluid_main_blue_white_21_9.png", lock: true, data: AR3 },
        "Blue 1 BG Blue 4": { img: "./assets/3d_fluid_main/3d_fluid_main_blue_21_9.png", lock: true, data: AR3 },
        "Teal 1 BG White": { img: "./assets/3d_fluid_main/3d_fluid_main_teal_white_21_9.png", lock: true, data: AR3 },
        "Teal 1 BG Teal 4": { img: "./assets/3d_fluid_main/3d_fluid_main_teal_21_9.png", lock: true, data: AR3 },
        "Salmon 1 BG White": { img: "./assets/3d_fluid_main/3d_fluid_main_salmon_white_21_9.png", lock: true, data: AR3 },
        "Salmon 1 BG Salmon 4": { img: "./assets/3d_fluid_main/3d_fluid_main_salmon_21_9.png", lock: true, data: AR3 },
        "Orange 1 BG White": { img: "./assets/3d_fluid_main/3d_fluid_main_orange_white_21_9.png", lock: true, data: AR3 },
        "Orange 1 BG Orange 4": { img: "./assets/3d_fluid_main/3d_fluid_main_orange_21_9.png", lock: true, data: AR3 },
        "Purple 1 BG White": { img: "./assets/3d_fluid_main/3d_fluid_main_purple_white_21_9.png", lock: true, data: AR3 },
        "Purple 1 BG Purple 4": { img: "./assets/3d_fluid_main/3d_fluid_main_purple_21_9.png", lock: true, data: AR3 },
        "Fuchsia 1 BG White": { img: "./assets/3d_fluid_main/3d_fluid_main_fuchsia_white_21_9.png", lock: true, data: AR3 },
        "Fuchsia 1 BG Fuchsia 4": { img: "./assets/3d_fluid_main/3d_fluid_main_fuchsia_21_9.png", lock: true, data: AR3 },
        "Green 1 BG White": { img: "./assets/3d_fluid_main/3d_fluid_main_green_white_21_9.png", lock: true, data: AR3 },
        "Green 1 BG Green 4": { img: "./assets/3d_fluid_main/3d_fluid_main_green_21_9.png", lock: true, data: AR3 },
        "Aqua 1 BG White": { img: "./assets/3d_fluid_main/3d_fluid_main_aqua_white_21_9.png", lock: true, data: AR3 },
        "Aqua 1 BG Aqua 4": { img: "./assets/3d_fluid_main/3d_fluid_main_aqua_21_9.png", lock: true, data: AR3 },
      },
      Precise: {
        // "Red 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_red_white_21_9.png", lock: true, data: AR2 },
        // "Red 1 BG Red 4": { img: "./assets/lmm_text/lmm_text_frame_red_only_21_9.png", lock: true, data: AR2 },
        // "Blue 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_blue_white_21_9.png", lock: true, data: AR2 },
        // "Blue 1 BG Blue 4": { img: "./assets/lmm_text/lmm_text_frame_blue_only_21_9.png", lock: true, data: AR2 },
        // "Teal 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_teal_white_21_9.png", lock: true, data: AR2 },
        // "Teal 1 BG Teal 4": { img: "./assets/lmm_text/lmm_text_frame_teal_only_21_9.png", lock: true, data: AR2 },
        // "Salmon 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_salmon_white_21_9.png", lock: true, data: AR2 },
        // "Salmon 1 BG Salmon 4": { img: "./assets/lmm_text/lmm_text_frame_salmon_only_21_9.png", lock: true, data: AR2 },
        // "Orange 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_orange_white_21_9.png", lock: true, data: AR2 },
        // "Orange 1 BG Orange 4": { img: "./assets/lmm_text/lmm_text_frame_orange_only_21_9.png", lock: true, data: AR2 },
        // "Purple 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_purple_white_21_9.png", lock: true, data: AR2 },
        // "Purple 1 BG Purple 4": { img: "./assets/lmm_text/lmm_text_frame_purple_only_21_9.png", lock: true, data: AR2 },
        // "Fuchsia 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_fuchsia_white_21_9.png", lock: true, data: AR2 },
        // "Fuchsia 1 BG Fuchsia 4": { img: "./assets/lmm_text/lmm_text_frame_fuchsia_only_21_9.png", lock: true, data: AR2 },
        // "Green 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_green_white_21_9.png", lock: true, data: AR2 },
        // "Green 1 BG Green 4": { img: "./assets/lmm_text/lmm_text_frame_green_only_21_9.png", lock: true, data: AR2 },
        // "Aqua 1 BG White": { img: "./assets/lmm_text/lmm_text_frame_aqua_white_21_9.png", lock: true, data: AR2 },
        // "Aqua 1 BG Aqua 4": { img: "./assets/lmm_text/lmm_text_frame_aqua_only_21_9.png", lock: true, data: AR2 },
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
          var width = Math.round(event.detail.width);
          var height = Math.round(event.detail.height);
          if (width < 100 || height < 100 || width > 2560 || height > 1082) {
            cropper.setData({
              width: Math.max(100, Math.min(2560, width)),
              height: Math.max(100, Math.min(1080, height)),
            });
          }
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

    style.onchange(); // Populate the dropdowns on page load
  };
})();
