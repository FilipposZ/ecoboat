<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...restProps} class={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ${restProps.class}`}>
	{@render children?.()}
</div>
