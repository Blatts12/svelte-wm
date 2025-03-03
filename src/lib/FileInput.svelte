<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import Button from "./Button.svelte";

  type Props = {
    id: string;
    containerClass?: string;
    class?: string;
    children?: Snippet;
  } & HTMLInputAttributes;

  let { children, id, containerClass, class: className, ...rest }: Props = $props();
</script>

<div class={containerClass}>
  <Button class="relative w-full">
    <input
      {id}
      type="file"
      hidden
      class={[
        "mt-1 h-full w-full",
        "text-base sm:leading-6",
        "transition-all focus:ring-0",
        "outline-none",
        "bg-white-app focus:bg-white-app/60",
        className,
      ]}
      {...rest}
    />
    <label for={id} class="absolute inset-0 z-10 flex cursor-pointer items-center justify-center">
      Wybierz pliki
    </label>
  </Button>

  {#if children}
    {@render children()}
  {/if}
</div>
