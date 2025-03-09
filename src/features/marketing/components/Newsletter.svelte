<script lang="ts">
	import { Mail } from 'lucide-svelte';
</script>

<div class="bg-base-300 py-24">
	<div class="prose flex flex-col items-center m-auto">
		<h3>Don't miss out on the trip !</h3>
		<p>You will be the first to know when the Ecoboat sets sail</p>
		<div class="join">
			<div>
				<label class="input validator join-item">
					<Mail />
					<input type="email" placeholder="your email" required />
				</label>
				<div class="validator-hint hidden">The email address does not seem right</div>
			</div>
			<button class="btn btn-primary join-item">Join the crew</button>
		</div>
	</div>
</div>
