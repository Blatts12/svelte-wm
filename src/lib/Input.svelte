<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  type Props = {
    id: string;
    label: string;
    containerClass?: string;
    class?: string;
    children?: Snippet;
  } & HTMLInputAttributes;

  let { children, id, label, containerClass, class: clazz, ...rest }: Props = $props();
</script>

<div class={containerClass}>
  <label for={id} class="block leading-6 font-semibold">{label}</label>
  <input
    {id}
    class={[
      "mt-1 block w-full",
      "text-base sm:leading-6",
      "shadow-nb-md focus:shadow-nb-sm transition-all focus:ring-0",
      "border-black-app focus:border-accent-500 rounded-lg border-2 outline-none",
      "bg-white-app focus:bg-white-app/60",
      clazz,
    ]}
    {...rest}
  />

  {#if children}
    {@render children()}
  {/if}
</div>
