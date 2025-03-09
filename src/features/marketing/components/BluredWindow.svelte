<script lang="ts">
	const { children } = $props();
</script>

<div class="p-6 md:p-14 rounded-2xl bg-base-100/10 backdrop-blur-xs w-fit h-fit">
	{@render children()}
</div>
