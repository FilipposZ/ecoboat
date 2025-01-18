<script lang="ts">
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Container from './Container.svelte';

	interface MainSectionProps extends HTMLAttributes<HTMLDivElement> {
		alignment?: 'left' | 'center' | 'right';
	}

	let { children, alignment = 'left', ...restProps }: MainSectionProps = $props();

	let divContainer: HTMLDivElement;

	onMount(() => {
		gsap.from(divContainer, {
			scrollTrigger: {
				trigger: divContainer,
				start: 'top bottom',
				end: 'top top',
				scrub: 0.6
			},
			...((alignment === 'left' || alignment === 'center') && { borderTopRightRadius: '20rem' }),
			...((alignment === 'right' || alignment === 'center') && { borderTopLeftRadius: '20rem' }),
			ease: 'power2.in'
		});

		gsap.to(divContainer, {
			scrollTrigger: {
				trigger: divContainer,
				start: 'bottom bottom',
				end: 'bottom top',
				scrub: 0.6
			},
			...((alignment === 'left' || alignment === 'center') && { borderBottomRightRadius: '20rem' }),
			...((alignment === 'right' || alignment === 'center') && { borderBottomLeftRadius: '20rem' }),
			ease: 'power2.in'
		});
	});
</script>

<div
	bind:this={divContainer}
	{...restProps}
	class={`bg-base-100/50 h-screen relative lg:w-1/2 ${restProps.class}`}
	class:ml-auto={alignment === 'right' || alignment == 'center'}
	class:mr-auto={alignment === 'left' || alignment == 'center'}
>
	<Container class="prose h-full w-5/6 flex flex-col place-content-center">
		{@render children?.()}
	</Container>
</div>
