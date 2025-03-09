export interface Watermarked extends Blob {
  previewUrl: string;
}

export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center"
  | "center-left"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface WatermarkBaseCoordinates {
  x: number;
  y: number;
}

export type WatermarkCoordinates =
  | {
      landscape: WatermarkBaseCoordinates;
      portrait?: undefined;
      x?: undefined;
      y?: undefined;
    }
  | {
      portrait: WatermarkBaseCoordinates;
      landscape?: undefined;
      x?: undefined;
      y?: undefined;
    }
  | {
      landscape: WatermarkBaseCoordinates;
      portrait: WatermarkBaseCoordinates;
      x?: undefined;
      y?: undefined;
    }
  | { x: number; y: number; landscape?: undefined; portrait?: undefined };

export interface WatermarkImage {
  path: string;
  coordinates?: WatermarkCoordinates;
  position?: WatermarkPosition;
}

export interface WatermarkTextStyle {
  weight?: string | number;
  family?: string;
  color?: CanvasFillStrokeStyles["fillStyle"];
  size?: string;
  baseline?: CanvasTextBaseline;
}

export interface WatermarkText {
  text: string;
  style?: WatermarkTextStyle;
  coordinates?: WatermarkCoordinates;
  position?: WatermarkPosition;
}

export class WatermarkCanvas {
  public readonly canvas: HTMLCanvasElement;
  public readonly context: CanvasRenderingContext2D;
  private _quality = 1;
  private textStyle: WatermarkTextStyle;

  private constructor(textStyle?: WatermarkTextStyle) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d")!;

    const _textStyle = {
      weight: textStyle?.weight || "bold",
      family: textStyle?.family || "serif",
      size: textStyle?.size || "24px",
      color: textStyle?.color || "#000000",
      baseline: textStyle?.baseline || "middle",
    };

    this.textStyle = _textStyle;
  }

  public static create(props?: { textStyle?: WatermarkTextStyle }) {
    return new WatermarkCanvas(props?.textStyle);
  }

  public setDimensions(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;

    return this;
  }

  public drawOriginal(image: CanvasImageSource, coordX: number, coordY: number) {
    this.context.drawImage(image, coordX, coordY, this.canvas.width, this.canvas.height);

    return this;
  }

  public drawWatermarkImage(
    image: CanvasImageSource,
    coordX: number,
    coordY: number,
    width: number,
    height: number
  ) {
    this.context.drawImage(image, coordX, coordY, width, height);

    return this;
  }

  public applyTextStyles() {
    this.context.fillStyle = this.textStyle.color!;
    this.context.textBaseline = this.textStyle.baseline!;
    this.context.font = `${this.textStyle.weight} ${this.textStyle.size} ${this.textStyle.family}`;

    return this;
  }

  public drawWatermarkText(text: string, coordX: number, coordY: number) {
    this.context.fillText(text, coordX, coordY);
    return this;
  }

  public result(resolve: (value: Blob | PromiseLike<Blob>) => void) {
    this.context.canvas.toBlob(
      (_blob) => {
        resolve(_blob!);
      },
      "image/jpeg",
      this._quality
    );
  }
}

interface CalculateCoordinates {
  position: WatermarkPosition;
  imageDimensions: {
    height: number;
    width: number;
  };
  watermarkDimensions: {
    height: number;
    width: number;
  };
  watermarkIsText: boolean;
}

export function calculateCoordinates({
  position,
  imageDimensions,
  watermarkDimensions,
  watermarkIsText,
}: CalculateCoordinates) {
  const height = imageDimensions.height - watermarkDimensions.height;
  const width = imageDimensions.width - watermarkDimensions.width;
  const centerVertically = height / 2;
  const centerHorizontally = width / 2;

  const verticalStartOrigin = watermarkIsText ? watermarkDimensions.height * 3 + 10 : 0;

  const verticalEndOrigin = watermarkIsText ? height - watermarkDimensions.height * 2 : height;

  const positions: Record<WatermarkPosition, { x: number; y: number }> = {
    "top-left": { x: 0, y: verticalStartOrigin },
    "top-center": { x: centerHorizontally, y: verticalStartOrigin },
    "top-right": { x: width, y: verticalStartOrigin },

    center: { x: centerHorizontally, y: centerVertically },
    "center-left": { x: 0, y: centerVertically },
    "center-right": { x: width, y: centerVertically },

    "bottom-center": { x: centerHorizontally, y: verticalEndOrigin },
    "bottom-left": { x: 0, y: verticalEndOrigin },
    "bottom-right": { x: width, y: verticalEndOrigin },
  };

  return positions[position];
}
