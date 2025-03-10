type UUID = string;
type ProcessFunction = (
  file: File,
  width: number,
  height: number,
  appConfig: AppConfig
) => Promise<string>;

export class AppConfig {
  x = $state(0);
  y = $state(0);
  watermarkText = $state("Wianek w Ogrodzie");
  textColor = $state("#FFFFFF");
  textSize = $state(20);
  textOpacity = $state(90);
  rotation = $state(0);
  selectedFiles = $state<{ [key in UUID]: File }>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  processedImages = $state<{ [key in UUID]: any }>({});
  processingImages = $state<{ [key in UUID]: true }>({});
  errorProcessingImages = $state<{ [key in UUID]: true }>({});

  selectFiles(files: FileList | null) {
    if (!files) return;
    const fileList = Array.from(files);

    fileList.forEach((file) => {
      const uuid = crypto.randomUUID();

      const newSelectedFiles = {
        ...this.selectedFiles,
        [uuid]: file,
      };

      this.selectedFiles = newSelectedFiles;
    });
  }

  processImages(processFunction: ProcessFunction) {
    this.processedImages = {};

    Object.entries(this.selectedFiles).forEach((entry) => {
      const uuid = entry[0];
      const file = entry[1];

      this.startProcessingImage(uuid);
      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        if (!event.target?.result) {
          this.errorProcessingImage(uuid);
          return;
        }
        const image = new Image();
        image.src = event.target.result as string;

        image.onload = async () => {
          const src = await processFunction(file, image.width, image.height, this);

          const processedImage = new Image();
          processedImage.src = src;

          processedImage.onload = () => {
            this.processedImages[uuid] = processedImage;
            this.stopProcessingImage(uuid);
          };
        };
      };

      fileReader.readAsDataURL(file);
    });
  }

  startProcessingImage(uuid: UUID) {
    this.processingImages[uuid] = true;
  }

  stopProcessingImage(uuid: UUID) {
    if (!this.processingImages[uuid]) return;

    const newProcessingImages = { ...this.processingImages };
    delete newProcessingImages[uuid];
    this.processingImages = newProcessingImages;
  }

  errorProcessingImage(uuid: UUID) {
    this.stopProcessingImage(uuid);

    const newErrorProcessingImages = { ...this.errorProcessingImages };
    newErrorProcessingImages[uuid] = true;
    this.errorProcessingImages = newErrorProcessingImages;
  }

  removeSelectedFile(uuid: UUID) {
    const newSelectedFiles = { ...this.selectedFiles };
    delete newSelectedFiles[uuid];
    this.selectedFiles = newSelectedFiles;
  }

  removeProcessedImage(uuid: UUID) {
    const newProcessedImages = { ...this.processedImages };
    delete newProcessedImages[uuid];
    this.processedImages = newProcessedImages;
  }
}

export const appConfig = new AppConfig();
