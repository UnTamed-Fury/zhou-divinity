export type LineValue = 6 | 7 | 8 | 9;

export interface HexagramData {
  hex: number;
  hex_font: string;
  trad_chinese: string;
  pinyin: string;
  english: string;
  binary: string | number;
  wilhelm_above: {
    chinese: string;
    symbolic: string;
    alchemical: string;
  };
  wilhelm_below: {
    chinese: string;
    symbolic: string;
    alchemical: string;
  };
  wilhelm_symbolic: string;
  wilhelm_judgment: {
    text: string;
    comments: string;
  };
  wilhelm_image: {
    text: string;
    comments: string;
  };
  wilhelm_lines?: {
    [key: string]: {
      text: string;
      comments: string;
    };
  };
}

export interface Reading {
  originalLines: LineValue[];
  presentHexagram: HexagramData;
  futureHexagram?: HexagramData;
  changingLines: number[]; // 1-indexed (1 to 6)
}
