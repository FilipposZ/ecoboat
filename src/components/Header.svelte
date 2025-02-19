<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import type { Link } from '$lib/types';
	import { LogOut, Menu, Ship } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import Container from '$components/Container.svelte';
	import ThemeSelector from '$components/icons/ThemeSelector.svelte';

	import { PUBLIC_PROJECT_NAME } from '$env/static/public';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import Logo from '$components/icons/Logo.svelte';

	const links: Array<Link> = [
		{ name: 'Experience', href: '/experience' },
		{ name: 'About', href: '/#about' },
		{ name: 'Pricing', href: '/#pricing' },
		{ name: 'FAQ', href: '/#faq' }
	];

	// Show/hide navbar on scroll
	onMount(() => {
		const showAnim = gsap
			.from('.main-navbar', {
				yPercent: -100,
				paused: true,
				duration: 0.2
			})
			.progress(1);

		ScrollTrigger.create({
			start: 'top top',
			end: 'max',
			onUpdate: (self) => {
				self.direction === -1 ? showAnim.play() : showAnim.reverse();
			}
		});
	});
</script>

<Container class="main-navbar sticky top-0 bg-base-100 z-50 rounded-b-md">
	<header class="navbar px-0">
		<a class="navbar-start justify-start" href="/">
			<Logo />
			<span class="text-2xl sm:text-3xl font-bold mx-0 px-0">{PUBLIC_PROJECT_NAME}</span>
		</a>

		<Container class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal px-1">
				{#each links as link}
					<li>
						<a href={link.href}>{link.name}</a>
					</li>
				{/each}
			</ul>
		</Container>

		<Container class="navbar-end hidden lg:flex space-x-6">
			<ThemeSelector />

			{#if page.data.user}
				<form method="post" action="/login?/signout" use:enhance>
					<button type="submit" class="btn">
						<Container class="flex items-center text-red-500">
							<LogOut class="mr-2 h-4 w-4" />
							<span>Log out</span>
						</Container>
					</button>
				</form>
			{:else}
				<a href="/login" class="btn"> <Ship />Login</a>
			{/if}
		</Container>

		<Container class="navbar-end lg:hidden space-x-6">
			<ThemeSelector />

			{#if page.data.user}
				<form method="post" class="hidden sm:block" action="/login?/signout" use:enhance>
					<button type="submit" class="btn mr-2">
						<Container class="flex items-center text-red-500">
							<LogOut class="mr-2 h-4 w-4" />
							<span>Log out</span>
						</Container>
					</button>
				</form>
			{:else}
				<a href="/login" class="hidden sm:flex btn mr-2"> <Ship />Login</a>
			{/if}

			<Container class="dropdown dropdown-end">
				<Container tabindex={0} role="button" class="btn btn-ghost m-1"><Menu /></Container>
				<ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
					{#each links as link}
						<li>
							<a href={link.href}>{link.name}</a>
						</li>
					{/each}
					{#if page.data.user}
						<form
							method="post"
							class="sm:hidden btn mt-5 mb-2 mx-2"
							action="/login?/signout"
							use:enhance
						>
							<button type="submit">
								<Container class="flex items-center text-red-500">
									<LogOut class="mr-2 h-4 w-4" />
									<span>Log out</span>
								</Container>
							</button>
						</form>
					{:else}
						<a href="/login" class="sm:hidden btn mt-5 mb-2 mx-2"> <Ship />Login</a>
					{/if}
				</ul>
			</Container>
		</Container>
	</header>
</Container>
