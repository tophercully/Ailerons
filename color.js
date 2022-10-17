bgCols = [
  "#FFF5EE", //seashell
  "#fbf6e3", //canvas
  "#E6E0D4", //white coffee
  "#FDDEBD", //butter white
  "#F6FCFA", //white rose
  "#ECECEE", //christmas white
  "#1F201F", //retro black
  "#212122", //ink black
  "#1B1B1B", //eerie black
  "#242124", //raisin black
];

bgNames = [
  "SeaShell",
  "Canvas",
  "White Coffee",
  "Butter White",
  "White Rose",
  "Christmas White",
  "Retro Black",
  "Ink Black",
  "Eerie Black",
  "Raisin Black",
];
//Background color parameters
bgNum = randomInt(0, 9);
bgc = bgCols[bgNum];
bgName = bgNames[bgNum];

//Make a color that always contrasts bgc
calcBgLum = chroma(bgc).luminance();
if (calcBgLum > 0.5) {
  frameCol = 'black'; //black
} else if( calcBgLum < 0.5) {
  frameCol = 'white'; //white
}

const accentCols = [
  'red', //red
  "#1ea5e8", //ice-blue
  "#d9479c", //white coffee
  "#d64b00", //butter-white
  "#5dadde", //white rose
  "#8fe388", //christmas white
  "#FF731D", //retro black
  "#005BDA", //ink black
]

const blueComps = [
  'red',
  "#d64b00",
  "#FF731D",
]

const redComps = [
  "#1ea5e8",
  "#5dadde",
]

const greenComps = [
  "#d9479c",
]

const purpleComps = [
  //"#8fe388",
  '#058c42'
]

const monoComps = [
  'red', //Crimson
  "#1ea5e8", //Ice-blue
  "#FF731D", //Tangerine
  "#005BDA", //Ultramarine
  '#058c42', // Forest
]
//Palettes
//Always include frameCol instead of black or white so our colors don't blend into bgc
const monoCols = [
  'red', //Crimson
  "#1ea5e8", //Ice-blue
  "#FF731D", //Tangerine
  "#005BDA", //Ultramarine
  '#058c42', // Forest

  "#f8f9fa",
  "#e9ecef",
  "#dee2e6",
  "#ced4da",
  "#adb5bd", //
  "#6c757d",
  "#495057",
  "#343a40",
  frameCol,
  "#2A2930",
];

const monoColsRed = [
  "#1ea5e8",
  "#5dadde",

  "#ffba08",
  "#faa307",
  "#f48c06",
  "#e85d04",
  "#dc2f02", //
  "#d00000",
  "#9d0208",
  "#6a040f",
  frameCol,
  "#2A2930",
];

const monoColsGreen = [
  "#ff7096",
  '#9c6644',
  '#D93B2A',
  '#EC8A12',

  "#dad7cd",
  "#a3b18a",
  "#588157",
  "#3a5a40",
  "#344e41", //
  frameCol,
];

const monoColsBlue = [
  'red',
  "#d64b00",
  "#FF731D",

  "#023e8a",
  "#0077b6",
  "#0096c7",
  "#00b4d8",
  "#48cae4", //
  "#90e0ef",
  "#ade8f4",
  "#caf0f8",
  frameCol,
  "#2A2930",
];

const blush = [
  '#058c42',
  '#D7AF61',
  'black',

  "#590d22",
  "#800F2F",
  "#A4133C",
  "#C9184A",
  "#FF4D6D", //
  "#FF758F",
  "#FF8FA3",
  "#FFB3C1",
  "#FFCCD5",
  "#FFF0F3",
  "#2A2930",
];

const retro = [
  'red',
  "#d64b00",
  "#FF731D",

  "#FFF7E9",
  "#5F9DF7",
  "#1746A2",
  "#2124EB",
  "#7ABEDE", //
  "#000552",
  "#7943E6",
  "#9B72F2",
];

const candy = [
  '#C0FDFF',

  "#FFCBF2",
  "#F3C4FB",
  "#ECBCFD",
  "#E5B3FE",
  "#E2AFFF", //
  "#DEAAFF",
  "#D8BBFF",
  "#D0D1FF",
  "#C8E7FF",
];


const pals = [
  monoCols,
  monoColsRed,
  monoColsGreen,
  monoColsBlue,
  blush,
  retro
];

const palNames = [
  "Source",
  "Commander Shepard",
  "Toy Blocks",
  "McWoot",
  "Soft",
  "Jazzy",
  "Ceramic",
  "Oil Pastel",
  "McNay",
  "O'Keefe",
  "Flower Market",
  "Oil Paint"
];

//Palette parameters
palNum = randomInt(0, pals.length-1);
prePal = pals[palNum];
palName = palNames[palNum];
if(palNum == 0) {
  //MonoChrome
  n = 5
  accentCol = prePal[randomInt(0, n-1)]
  pal = prePal.slice(n, prePal.length-1)
} else if(palNum == 1) {
  //Red
  n = 2
  accentCol = prePal[randomInt(0, n-1)]
  pal = prePal.slice(n, prePal.length-1)
} else if(palNum == 2) {
  //Green
  n = 4
  accentCol = prePal[randomInt(0, n-1)]
  pal = prePal.slice(n, prePal.length-1)
} else if(palNum == 3) {
  //Blue
  n = 3
  accentCol = prePal[randomInt(0, n-1)]
  pal = prePal.slice(n, prePal.length-1)
} else if(palNum == 4) {
  //Blush
  n = 3
  accentCol = prePal[randomInt(n-1, n-1)]
  pal = prePal.slice(n, prePal.length-1)
} else if(palNum == 5) {
  //Retro
  n = 3
  accentCol = prePal[randomInt(0, n-1)]
  pal = prePal.slice(n, prePal.length-1)
}


console.log(palName)

//Setup for the next step
lighterPal = [];
darkerPal = [];
warmerPal = [];
coolerPal = [];

coolTemp = 5000;
warmTemp = 8000;

//Increase color variation by 5x-ing our palette size and making slight adjustments to each copy
for (let i = 0; i < pal.length-1; i++) {
  lighterPal[i] = chroma(pal[i]).brighten(0.35).hex();
  darkerPal[i] = chroma(pal[i]).darken(0.35).hex();
  warmerPal[i] = chroma
    .mix(pal[i], chroma.temperature(coolTemp).hex(), 0.5)
    .saturate()
    .hex();
  coolerPal[i] = chroma
    .mix(pal[i], chroma.temperature(warmTemp).hex(), 0.5)
    .saturate()
    .hex();
}

//Combine palettes and shuffle that full palette
fullPal = [].concat(pal, darkerPal, lighterPal);
truePal = shuff(fullPal);

//Pass our palette back to the CSS spinner
let root = document.documentElement;
root.style.setProperty("--c1", truePal[0]);
root.style.setProperty("--c2", truePal[1]);
root.style.setProperty("--c3", truePal[2]);
root.style.setProperty("--c4", truePal[3]);
