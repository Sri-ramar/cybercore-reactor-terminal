export interface FoliageSprayItem {
  id: string;
  x: number;
  y: number;
  rot: number;
  scale: number;
  density: 'medium' | 'dense' | 'ultra';
  flip: boolean;
  layer: 'back' | 'front' | 'both';
}

/**
 * Permanent Factory Default Foliage Layout
 * Hand-tuned & balanced with 79 botanical canopy sprays
 */
export const DEFAULT_FOLIAGE_LAYOUT: FoliageSprayItem[] = [
  { id: 'spray-tl-1', x: 97, y: 37, rot: -38, scale: 1.05, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-tl-2', x: 248, y: 55, rot: -47, scale: 1.1, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-tl-3', x: 355, y: 61, rot: -45, scale: 1.05, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-tl-4', x: 453, y: 80, rot: -53, scale: 1.1, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-tl-5', x: 541, y: 80, rot: -28, scale: 1.05, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-tl-6', x: 501, y: 157, rot: -45, scale: 1.05, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-tl-7', x: 646, y: 152, rot: -20, scale: 1, density: 'medium', flip: false, layer: 'both' },
  { id: 'spray-tl-8', x: 733, y: 149, rot: -36, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-tc-1', x: 574, y: 156, rot: -44, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-tc-2', x: 649, y: 82, rot: -25, scale: 1, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-tc-3', x: 799, y: 192, rot: 6, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-tc-4', x: 813, y: 130, rot: -30, scale: 0.9, density: 'medium', flip: false, layer: 'both' },
  { id: 'spray-tr-1', x: 1232, y: 90, rot: 110, scale: 1.05, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-tr-2', x: 1473, y: 66, rot: 117, scale: 1.1, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-tr-3', x: 1360, y: 84, rot: 137, scale: 1.1, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-tr-4', x: 1064, y: 83, rot: 33, scale: 1.05, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-tr-5', x: 991, y: 89, rot: 42, scale: 1, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-tr-6', x: 953, y: 133, rot: 123, scale: 0.95, density: 'medium', flip: false, layer: 'both' },
  { id: 'spray-tr-7', x: 897, y: 103, rot: 42, scale: 0.9, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-trd-1', x: 970, y: 290, rot: -35, scale: 0.95, density: 'medium', flip: false, layer: 'both' },
  { id: 'spray-trd-2', x: 1032, y: 272, rot: 96, scale: 1, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-trd-3', x: 1105, y: 219, rot: 3, scale: 0.95, density: 'medium', flip: false, layer: 'both' },
  { id: 'spray-trd-4', x: 1126, y: 251, rot: 135, scale: 0.9, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-ml-1', x: 126, y: 296, rot: -45, scale: 1.05, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-ml-2', x: 221, y: 295, rot: -32, scale: 1, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-ml-3', x: 308, y: 288, rot: -25, scale: 1, density: 'medium', flip: false, layer: 'both' },
  { id: 'spray-ml-4', x: 463, y: 309, rot: -37, scale: 1.05, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-ml-5', x: 471, y: 349, rot: -133, scale: 1, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-ml-6', x: 551, y: 345, rot: -59, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-ll-1', x: 561, y: 559, rot: -111, scale: 1.05, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-ll-2', x: 457, y: 575, rot: -35, scale: 1.05, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-ll-3', x: 368, y: 592, rot: -54, scale: 0.95, density: 'medium', flip: false, layer: 'both' },
  { id: 'spray-ll-4', x: 279, y: 595, rot: -54, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-ll-5', x: 136, y: 674, rot: -57, scale: 1, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-ll-6', x: 63, y: 737, rot: -49, scale: 1, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-lr-1', x: 1505, y: 548, rot: 132, scale: 1.1, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-lr-2', x: 1404, y: 554, rot: 143, scale: 1.1, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-lr-3', x: 1426, y: 515, rot: 38, scale: 1.1, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-lr-4', x: 1310, y: 562, rot: 154, scale: 1.05, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-lr-5', x: 1320, y: 524, rot: 42, scale: 1, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-lr-6', x: 940, y: 528, rot: -22, scale: 0.95, density: 'medium', flip: false, layer: 'both' },
  { id: 'spray-btm-1', x: 698, y: 716, rot: -155, scale: 0.95, density: 'medium', flip: false, layer: 'both' },
  { id: 'spray-btm-2', x: 745, y: 763, rot: 153, scale: 1, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-btm-3', x: 804, y: 742, rot: 80, scale: 1, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-btm-4', x: 939, y: 743, rot: 63, scale: 1.05, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-btm-5', x: 900, y: 765, rot: 151, scale: 1, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-btm-6', x: 1054, y: 741, rot: 35, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-copy-mtctypb5', x: 1235, y: 519, rot: 36, scale: 1, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-copy-mtctyumw', x: 1160, y: 518, rot: 43, scale: 1, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-copy-mtctz87z', x: 1206, y: 562, rot: 135, scale: 1.05, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-copy-mtctzeud', x: 1122, y: 560, rot: 132, scale: 1.05, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-copy-mtcu2ew4', x: 1026, y: 531, rot: 95, scale: 1.05, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-copy-mtcu55q3', x: 1158, y: 216, rot: 18, scale: 0.95, density: 'medium', flip: false, layer: 'both' },
  { id: 'spray-copy-mtcu5c6k', x: 1215, y: 241, rot: 133, scale: 0.9, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcu7493', x: 1281, y: 226, rot: 148, scale: 0.9, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcu9wga', x: 1529, y: 35, rot: 132, scale: 1.1, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-copy-mtcuan3h', x: 1300, y: 53, rot: 56, scale: 1.05, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-copy-mtcubq5f', x: 1152, y: 75, rot: 48, scale: 1.05, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-copy-mtcue5gd', x: 160, y: 78, rot: -131, scale: 1, density: 'medium', flip: false, layer: 'both' },
  { id: 'spray-copy-mtcugcwt', x: 375, y: 325, rot: -118, scale: 1, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-copy-mtcuh2l3', x: 31, y: 310, rot: -30, scale: 1.05, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-copy-mtcuh9er', x: 112, y: 340, rot: -143, scale: 1, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-copy-mtcuhitr', x: 20, y: 349, rot: -128, scale: 1, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-copy-mtcujo0r', x: 468, y: 618, rot: -133, scale: 1, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcujug9', x: 128, y: 730, rot: 175, scale: 1, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcujygq', x: 60, y: 802, rot: 190, scale: 1, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcukjfq', x: 1413, y: 37, rot: 34, scale: 1.05, density: 'dense', flip: false, layer: 'both' },
  { id: 'spray-copy-mtcuma37', x: 1023, y: 769, rot: 133, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcumin1', x: 1155, y: 748, rot: 50, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcumnso', x: 1120, y: 778, rot: 148, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcumuz7', x: 1200, y: 789, rot: 163, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcun015', x: 1237, y: 753, rot: 65, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcun4as', x: 1307, y: 791, rot: 150, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcund9u', x: 1364, y: 763, rot: 80, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcunhfg', x: 1398, y: 796, rot: 165, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcuno06', x: 1463, y: 753, rot: 35, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcunvdp', x: 1488, y: 797, rot: 180, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcupaf4', x: 1580, y: 507, rot: 53, scale: 1.1, density: 'dense', flip: true, layer: 'both' },
  { id: 'spray-copy-mtcuu035', x: 185, y: 607, rot: -39, scale: 0.95, density: 'medium', flip: true, layer: 'both' },
];

export const STORAGE_KEY_FOLIAGE = 'cybercore_foliage_layout_v2';
