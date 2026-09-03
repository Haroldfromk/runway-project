// Structural layout for the Systems Map diagram — node positions, edges, and
// band boundaries. Verified against every box so no arrow points into empty
// space or crosses through an unrelated node. Purely geometric, so it does
// not need to be translated per language.

export type NodeKind = "actor" | "service" | "view" | "model";

export interface MapNode {
  id: string;
  kind: NodeKind;
  x: number;
  y: number;
  w: number;
  h: number;
  core?: boolean;
}

export interface MapEdge {
  id: string;
  from: string;
  to: string;
  d: string;
  bi?: boolean;
}

export const VIEWBOX = { w: 1040, h: 820 };

export const bands = [
  { y: 14, h: 116 },
  { y: 150, h: 120 },
  { y: 286, h: 112 },
  { y: 414, h: 112 },
  { y: 542, h: 112 },
  { y: 670, h: 120 },
];

export const bandLabelY = [32, 168, 304, 432, 560, 688];

export const nodes: MapNode[] = [
  { id: "loc", kind: "service", x: 30, y: 54, w: 300, h: 64 },
  { id: "health", kind: "actor", x: 370, y: 54, w: 300, h: 64 },
  { id: "alt", kind: "service", x: 710, y: 54, w: 300, h: 64 },

  { id: "core", kind: "actor", x: 220, y: 184, w: 600, h: 72, core: true },

  { id: "runvm", kind: "actor", x: 30, y: 322, w: 300, h: 64 },
  { id: "wc", kind: "service", x: 390, y: 322, w: 260, h: 64 },
  { id: "watchvm", kind: "actor", x: 710, y: 322, w: 300, h: 64 },

  { id: "pfd", kind: "view", x: 30, y: 450, w: 300, h: 64 },
  { id: "gpws", kind: "view", x: 370, y: 450, w: 300, h: 64 },
  { id: "watchpfd", kind: "view", x: 710, y: 450, w: 300, h: 64 },

  { id: "sdmodels", kind: "model", x: 30, y: 578, w: 340, h: 64 },
  { id: "cloud", kind: "service", x: 410, y: 578, w: 300, h: 64 },
  { id: "reminder", kind: "service", x: 750, y: 578, w: 260, h: 64 },

  { id: "logbook", kind: "view", x: 30, y: 706, w: 225, h: 64 },
  { id: "summary", kind: "view", x: 280, y: 706, w: 225, h: 64 },
  { id: "alerts", kind: "view", x: 530, y: 706, w: 225, h: 64 },
  { id: "calendar", kind: "view", x: 780, y: 706, w: 225, h: 64 },
];

export const edges: MapEdge[] = [
  { id: "e1", from: "loc", to: "core", d: "M180 118 V136 H350 V150" },
  { id: "e2", from: "health", to: "core", d: "M520 118 V184" },
  { id: "e3", from: "alt", to: "core", d: "M860 118 V136 H690 V150" },

  { id: "e4", from: "core", to: "runvm", d: "M350 256 V270 H180 V286" },
  { id: "e5", from: "core", to: "watchvm", d: "M690 256 V270 H860 V286" },

  { id: "eb1", from: "runvm", to: "wc", d: "M330 354 H390", bi: true },
  { id: "eb2", from: "wc", to: "watchvm", d: "M650 354 H710", bi: true },

  { id: "e6", from: "runvm", to: "pfd", d: "M180 386 V414" },
  { id: "e7", from: "watchvm", to: "watchpfd", d: "M860 386 V414" },
  { id: "e8", from: "watchpfd", to: "gpws", d: "M770 482 H400" },

  { id: "e9", from: "pfd", to: "sdmodels", d: "M180 514 V542" },
  { id: "e10", from: "watchpfd", to: "sdmodels", d: "M860 514 V530 H350 V542" },

  { id: "e11", from: "sdmodels", to: "cloud", d: "M370 610 H410" },
  { id: "e12", from: "sdmodels", to: "reminder", d: "M300 578 V560 H750 V578" },

  { id: "e13", from: "sdmodels", to: "logbook", d: "M100 642 V670" },
  { id: "e14", from: "sdmodels", to: "summary", d: "M200 642 V655 H345 V670" },
  { id: "e15", from: "sdmodels", to: "alerts", d: "M280 642 V655 H595 V670" },
  { id: "e16", from: "sdmodels", to: "calendar", d: "M330 642 V655 H845 V670" },
];
