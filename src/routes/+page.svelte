<script lang="ts">
  import { IconX } from "@tabler/icons-svelte";
  import { AppConfig, appConfig } from "$lib/AppConfig.svelte";
  import WM from "@be-tech/watermarkjs";
  import Button from "$lib/Button.svelte";
  import Card from "$lib/Card.svelte";
  import FileInput from "$lib/FileInput.svelte";
  import Input from "$lib/Input.svelte";

  const processFunction = async (file: File, width: number, height: number, config: AppConfig) => {
    const { watermarkText, textColor, textSize, x: ogX, y: ogY, textOpacity } = config;

    const pointX = width * ogX;
    const pointY = height * ogY;

    const fontSize = width * (textSize / 571);
    const x = 20 + pointX;
    const y = height - fontSize + 20 + -pointY;
    const opacity = Math.floor((textOpacity / 100) * 255).toString(16);

    const wm = WM.load(file);
    await wm.applyText({
      text: watermarkText,
      coordinates: { x, y },
      style: {
        size: `${fontSize}px`,
        family: "Architects Daughter",
        color: `${textColor}${opacity}`,
        weight: 400,
      },
    });

    return wm.result.previewUrl;
  };
</script>

<Card header="Konfiguracja znaku wodnego">
  <Input
    id="ww-name"
    label="Nazwa"
    type="text"
    containerClass="px-2"
    value={appConfig.watermarkText}
    onchange={(e) => (appConfig.watermarkText = (e.target as HTMLInputElement)?.value)}
  />

  <div class="flex flex-row gap-2 px-2">
    <Input
      id="ww-x"
      label="X (%)"
      type="number"
      step="0.01"
      max="1"
      min="0"
      containerClass="flex-1"
      value={appConfig.x}
      onchange={(e) => (appConfig.x = parseFloat((e.target as HTMLInputElement)?.value))}
    />
    <Input
      id="ww-y"
      label="Y (%)"
      type="number"
      step="0.01"
      max="1"
      min="0"
      containerClass="flex-1"
      value={appConfig.y}
      onchange={(e) => (appConfig.y = parseFloat((e.target as HTMLInputElement)?.value))}
    />
  </div>

  <Input
    id="ww-color"
    label="Kolor"
    type="color"
    class="cursor-pointer"
    containerClass="px-2"
    value={appConfig.textColor}
    onchange={(e) => (appConfig.textColor = (e.target as HTMLInputElement)?.value)}
  />

  <div class="flex flex-row gap-2 px-2">
    <Input
      id="ww-size"
      label="Wielkość"
      type="number"
      step="1"
      containerClass="flex-1"
      value={appConfig.textSize}
      onchange={(e) => (appConfig.textSize = parseInt((e.target as HTMLInputElement)?.value))}
    />

    <Input
      id="ww-opacity"
      label="Przezroczystość"
      type="range"
      class="cursor-pointer shadow-none focus:shadow-none"
      containerClass="flex-1"
      value={appConfig.textOpacity}
      onchange={(e) => (appConfig.textOpacity = parseFloat((e.target as HTMLInputElement)?.value))}
    >
      <p class="text-right">{appConfig.textOpacity}%</p>
    </Input>
  </div>

  <p
    class="example text-center drop-shadow-[0_2px_2px_rgba(0,0,0)]"
    style={`color:${appConfig.textColor};font-size:${Math.max(Math.min(80, appConfig.textSize), 20)}px;opacity:${appConfig.textOpacity}%`}
  >
    {appConfig.watermarkText}
  </p>
</Card>

<Card header="Wybierz zdjęcia">
  <FileInput
    id="ww-files"
    multiple
    containerClass="px-2"
    accept="image/png, image/webp, image/jpeg"
    onchange={(e) => appConfig.selectFiles((e.target as HTMLInputElement)?.files)}
  />

  {#if Object.keys(appConfig.selectedFiles).length > 0}
    <h3 class="mt-1 font-semibold">Wybrane</h3>

    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
      {#each Object.entries(appConfig.selectedFiles) as [uuid, file]}
        <Card>
          <div class="flex flex-row justify-between gap-2">
            <h4>{file.name}</h4>
            {#if appConfig.processingImages[uuid]}
              <p>Przetwarzanie</p>
            {/if}

            {#if appConfig.errorProcessingImages[uuid]}
              <p>Błąd</p>
            {/if}

            <button
              class="hover:text-black-app/70 grid cursor-pointer place-items-center rounded-full p-0"
              aria-label="Usuń"
              title="Usuń"
              onclick={(_e) => appConfig.removeSelectedFile(uuid)}
            >
              <IconX size="24" />
            </button>
          </div>
          <img
            src={URL.createObjectURL(file)}
            class="shadow-nb-sm mx-auto object-cover"
            alt={`Zdjęcie ${file.name}`}
            width="190"
            height="190"
          />
        </Card>
      {/each}
    </div>

    <Button onclick={(_e) => appConfig.processImages(processFunction)}>Dodaj znaki wodne</Button>
  {/if}
</Card>

<Card header="Pobierz zdjęcia">
  {#each Object.entries(appConfig.processedImages) as [uuid, image]}
    <Card>
      <div class="flex flex-row justify-between gap-2">
        <h4>{appConfig.selectedFiles[uuid].name}</h4>

        <button
          class="hover:text-black-app/70 grid cursor-pointer place-items-center rounded-full p-0"
          aria-label="Usuń"
          title="Usuń"
          onclick={(_e) => appConfig.removeProcessedImage(uuid)}
        >
          <IconX size="24" />
        </button>
      </div>

      <img
        src={image.src}
        class="shadow-nb-md mx-auto mb-0.5 object-cover"
        alt={`Przetworzone zdjęcie ${appConfig.selectedFiles[uuid].name}`}
        width="600"
        height="480"
      />
      <Button
        onclick={(_e) => {
          const file = appConfig.selectedFiles[uuid];

          const link = document.createElement("a");
          link.download = `znak_${file.name}`;
          link.href = image.src;
          link.click();
          link.remove();
        }}
      >
        Pobierz
      </Button>
    </Card>
  {/each}
</Card>

<style>
  .example {
    font-family: "Architects Daughter", handwriting;
  }
</style>
