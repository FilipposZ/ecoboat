<script>
	import Container from './Container.svelte';
    import BookPages from './BookPages.svelte';
</script>

<Container>
    <BookPages />
    
    <div class="mx-auto max-w-2xl px-6 lg:px-8">
        <div class="mt-10">A demo video</div>
        <iframe
            width="560"
            height="315"
            class="rounded-xl w-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=4e-7TwyrKYEQXD4O"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
    </div>
</Container>
