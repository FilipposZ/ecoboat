<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import Container from './Container.svelte';

	interface MainSectionProps extends HTMLAttributes<HTMLDivElement> {
		alignment?: 'left' | 'center' | 'right';
	}

	let { children, alignment = 'left', ...restProps }: MainSectionProps = $props();
</script>

<div
	{...restProps}
	class={`bg-base-100/40 h-screen relative lg:w-1/2 lg:rounded-3xl ${restProps.class}`}
	class:ml-auto={alignment === 'right' || alignment == 'center'}
	class:mr-auto={alignment === 'left' || alignment == 'center'}
>
	<Container class="prose h-full w-5/6 flex flex-col place-content-center">
		{@render children?.()}
	</Container>
</div>
