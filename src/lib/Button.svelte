<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  type ButtonSize = "xs" | "sm" | "md" | "lg";
  type ButtonVariant = "neutral" | "error" | "success" | "info";

  type Props = {
    children?: Snippet;
    size?: ButtonSize;
    variant?: ButtonVariant;
    class?: string;
  } & HTMLButtonAttributes;

  let {
    children,
    type = "button",
    size = "md",
    variant = "neutral",
    class: className,
    ...rest
  }: Props = $props();
</script>

<button
  {type}
  class={twMerge(
    "cursor-pointer transition-all",
    "border-black-app rounded-lg border-2",
    "text-black-app font-bold",
    "disabled:cursor-not-allowed disabled:bg-zinc-400 disabled:opacity-80",
    size == "xs" && "shadow-nb-xs hover:shadow-nb-xxs min-h-6 px-2 text-sm leading-4",
    size == "sm" && "shadow-nb-sm hover:shadow-nb-xs min-h-8 px-2 leading-5",
    size == "md" && "shadow-nb-md hover:shadow-nb-sm min-h-10 px-3 leading-6",
    size == "lg" && "shadow-nb-md hover:shadow-nb-sm min-h-12 px-4 text-lg leading-7",
    variant == "neutral" && "bg-white-app hover:bg-black-app/5 active:bg-black-app/10",
    variant == "error" && "bg-error-400 hover:bg-error-500 active:bg-error-600/90",
    variant == "success" && "bg-success-400 hover:bg-success-500 active:bg-success-600/90",
    variant == "info" && "bg-info-400 hover:bg-info-500 active:bg-info-600/90",
    className
  )}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</button>
