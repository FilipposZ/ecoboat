<script lang="ts">
	import MainSection from '$lib/components/MainSection.svelte';
	import Scene from '$lib/world/Scene.svelte';
	import { Canvas } from '@threlte/core';
	import { Gizmo, Grid } from '@threlte/extras';
	import { World } from '@threlte/rapier';
</script>

<div class="h-screen w-screen fixed top-0 left-0 z-0">
	<Canvas>
		<World>
			<!-- <Debug /> -->
			<Grid />
			<Gizmo />

			<Scene />
		</World>
	</Canvas>
</div>

<div class="flex flex-col space-y-40">
    <MainSection class="first-move !bg-transparent relative">
        <h2 class="mb-20">Set sail towards a better world</h2>
        <p>
            Embark on a meaningful journey, where innovation meets nature, where you can leave a lasting,
            positive impact on our planet..
        </p>
        <a href="#call-to-action" role="button" class="btn btn-wide">Join the movement</a>
    </MainSection>

    <MainSection class="second-move" alignment="right">
        <h2 class="mb-20">What Makes the Ecoboat Unique?</h2>
        <ul>
            <li>
                <b>Self-Sustainable Systems</b>: Explore innovative technologies that power the Ecoboat while
                nurturing the environment.
            </li>
            <li>
                <b>Positive Impact</b>: Learn how our actions impact the environment and how we can leave a
                positive impact.
            </li>

            <li>
                <b>Living Museum</b>: Explore exhibits that bring technology and ecology together, from water
                filtration to renewable energy integration.
            </li>
            <li>
                <b>Immersive Tours</b>: Interactive tours for all ages, designed to inspire sustainable
                practices and showcasing humanity’s potential to coexist with nature.
            </li>
        </ul>
    </MainSection>

    <MainSection class="third-move" id="call-to-action">
        <h2 class="mb-20">Be Part of the Change</h2>
        <p>Stay updated on the Ecoboat’s journey and be the first to know when you can step aboard.</p>
        <div>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="Don't miss out!"
                class="input input-bordered input-primary"
            />
            <button>Submit</button>
        </div>
    </MainSection>
</div>