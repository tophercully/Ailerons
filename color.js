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
  "#212122", //ink black
  "#1B1B1B", //eerie black
  "#242124", //raisin black
]

//Palettes
//Always include frameCol instead of black or white so our colors don't blend into bgc
const monoCols = [
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
  "#10451d",
  "#155d27",
  "#1a7431",
  "#208b3a",
  "#25a244", //
  "#2dc653",
  "#4ad66d",
  "#6ede8a",
  frameCol,
  "#2A2930",
];

const monoColsBlue = [
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

const monoColsTan = [
  "#EDC4B3",
  "#E6B8A2",
  "#DEAB90",
  "#D69F7E",
  "#CD9777", //
  "#C38E70",
  "#B07D62",
  "#9D6B53",
  frameCol,
  "#8A5A44",
];

const blush = [
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
  "#FFF7E9",
  "#5F9DF7",
  "#1746A2",
  "#2124EB",
  "#7ABEDE", //
  "#000552",
  "#7943E6",
  "#9B72F2",
];

const source = [
  "#A6C8CA",
  "#097857",
  "#F1E8D9",
  "#E3CE61",
  "#E35A7E",
  frameCol,
  "#EE692A",
  "#BFCCD4",
  "#217F96",
  "#EBD5D7",
];

const shepard = ["#3D5A80", "#98C1D9", "#E0FBFC", "#FF4D21", "#293241", frameCol];

const toyBlocks = ["#EBB701", "#EA3F23", "#00A2C8", frameCol, "#EAEAEA"];

const mcWoot = ["#ED6A5A", "#636CCE", "#DFB2F4", "#50B386", "#55D6C2", frameCol];

const soft = [
  "#F94144",
  "#F3722C",
  "#F8961E",
  "#F9844A",
  "#F9C74F",
  "#90BE6D",
  "#43AA8B",
  "#4D908E",
  "#577590",
  "#277DA1",
  frameCol,
  "white",
];

const jazzy = [
  frameCol,
  "#005f73",
  "#0a9396",
  "#94d2bd",
  "#e9d8a6",
  "#ee9b00",
  "#ca6702",
  "#bb3e03",
  "#ae2012",
  "#9b2226",
];

const ceramic = [
  "#5B476C",
  "#3581AA",
  "#A54B49",
  "#CED8D3",
  "#72BC9C",
  "#D49B8A",
  "#0096C7",
  frameCol,
];

const oilPastel = [
 '#EF2167',
 '#B8DEEE',
 '#F7E1F1',
 '#2B6C71',
 '#FBFAF6',
 '#050E13',
 '#B6C3BA',
 '#EF7F6B'
]

 const mcNay = [
 '#87966B',
 '#D4816F',
 '#617E94',
 '#DAC3B5',
 '#B8C1D0',
 '#BC7B58',
 '#8B8279',
]

 const oKeefe = [
 '#4F4D5C',
 '#E4CDB3',
 '#833828',
 '#B27362',
 '#D7B4A8',
 '#DBAF64',
 '#9D5F00',
 '#B9BAAB',
 '#414A37',
 '#838D7F',
]

 const flowerMarket = [
 '#4F4D5C',
 '#E4CDB3',
 '#833828',
 '#B27362',
 '#D7B4A8',
 '#DBAF64',
 '#9D5F00',
 '#B9BAAB',
 '#414A37',
 '#838D7F',
]

 const oilPaint = [
 '#844E93',
 '#B197C8',
 '#416368',
 '#3B3F42',
 '#69919B',
 '#90774C',
 '#ECEDE7',
]

 const seaFoam = [
 "#22577a", "#38a3a5", "#57cc99", "#80ed99", "#c7f9cc", "#f2f9e8", "#f9f9f9"
] //credit Wouter Missler

const popper = ["#F5D365", "#E66C64", "#92BCC8", "#4F7C9A", frameCol];

const pals = [
  monoCols,
  monoColsRed,
  monoColsGreen,
  monoColsBlue,
  monoColsTan,
  blush,
  retro];

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
palNum = randomInt(0, pals.length);
pal = pals[palNum];
palName = palNames[palNum];
accentCol = accentCols[palNum]

console.log(palName)

//Setup for the next step
lighterPal = [];
darkerPal = [];
warmerPal = [];
coolerPal = [];

coolTemp = 5000;
warmTemp = 8000;

//Increase color variation by 5x-ing our palette size and making slight adjustments to each copy
for (let i = 0; i < pal.length; i++) {
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
