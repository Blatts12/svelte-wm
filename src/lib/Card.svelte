<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  type Props = {
    header?: string;
    children: Snippet;
    class?: string;
  };

  let { children, header, class: className }: Props = $props();
</script>

<section
  class={twMerge(
    "bg-white-app border-black-app shadow-nb-md mb-4 flex flex-col gap-2 rounded-lg border-2 p-2",
    className
  )}
>
  {#if header}
    <h2 class="text-xl font-bold">{header}</h2>
  {/if}

  {@render children()}
</section>
