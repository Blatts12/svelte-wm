<script lang="ts">
  import IconFountain from "$lib/IconFountain.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<div class="app text-black-app bg-white-app overflow-x-hidden">
  <div class="topbar shadow-nb-md ml-[-5%] h-12 w-[105%] pl-[5%]">
    <div class="flex h-full w-full items-center gap-2 px-2">
      <IconFountain size={36} />
      <h1 class="text-2xl font-bold">Znaki Wodne</h1>
    </div>
  </div>
  <div class="app-content bg-dots h-[calc(100vh-3rem)] p-4">
    {@render children()}
  </div>
</div>

<style>
  .app {
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .topbar {
    grid-area: "topbar";
  }

  .app-content {
    grid-area: "app-content";
  }
</style>
