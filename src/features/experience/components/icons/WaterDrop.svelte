<script lang="ts">
	let { width = 264, height = 264, ratio = 0.5 } = $props();

	// offset should help the bar "fill" from the bottom
	const offsetY = height - height * ratio;
</script>

<svg xmlns="http://www.w3.org/2000/svg" {width} {height} class="relative" viewBox="0 0 264 264">
	<!-- the droplet mask for the bar -->
	<clipPath id="mask_shape">
		<path
			d="M132.281 264.564c51.24 0 92.931-41.681 92.931-92.918 0-50.18-87.094-164.069-90.803-168.891L132.281 0l-2.128 2.773c-3.704 4.813-90.802 118.71-90.802 168.882.001 51.228 41.691 92.909 92.93 92.909z"
			fill="#000000"
		/>
	</clipPath>

	<!-- droplet shape that can be colored -->
	<path
		d="M132.281 264.564c51.24 0 92.931-41.681 92.931-92.918 0-50.18-87.094-164.069-90.803-168.891L132.281 0l-2.128 2.773c-3.704 4.813-90.802 118.71-90.802 168.882.001 51.228 41.691 92.909 92.93 92.909z"
		fill="#555"
	/>

	<g clip-path="url(#mask_shape)">
		<!-- bar that should be the same color as the ripple -->
		<rect {width} {height} style={`transform: translate(0, ${offsetY}px)`} fill="#ff9900" />

		<!-- position the ripple at the top of the bar -->
		<g
			class="water-container"
			style={`transform: translate(0, ${ratio === 0 ? offsetY : offsetY - 19}px);`}
		>
			<path
				class="water"
				d="M420 20.0047C441.5 19.6047 458.8 17.5047 471.1 15.5047C484.5 13.3047 497.6 10.3047 498.4 10.1047C514 6.50474 518 4.70474 528.5 2.70474C535.6 1.40474 546.4 -0.0952561 560 0.00474393V20.0047H420ZM420 20.0047C398.5 19.6047 381.2 17.5047 368.9 15.5047C355.5 13.3047 342.4 10.3047 341.6 10.1047C326 6.50474 322 4.70474 311.5 2.70474C304.3 1.40474 293.6 -0.0952561 280 0.00474393V20.0047H420ZM140 20.0047C118.5 19.6047 101.2 17.5047 88.9 15.5047C75.5 13.3047 62.4 10.3047 61.6 10.1047C46 6.50474 42 4.70474 31.5 2.70474C24.3 1.40474 13.6 -0.0952561 0 0.00474393V20.0047H140ZM140 20.0047C161.5 19.6047 178.8 17.5047 191.1 15.5047C204.5 13.3047 217.6 10.3047 218.4 10.1047C234 6.50474 238 4.70474 248.5 2.70474C255.6 1.40474 266.4 -0.0952561 280 0.00474393V20.0047H140Z"
			/>
		</g>
	</g>
</svg>

<style>
	clipPath path {
		fill: black;
	}
	rect,
	.water-container {
		transition: transform 500ms;
	}

	.water {
		animation: ripple 1.4s infinite linear;
		fill: #ff9900;
	}

	@keyframes ripple {
		100% {
			transform: translate3d(-105%, 0, 0);
		}
	}
</style>
