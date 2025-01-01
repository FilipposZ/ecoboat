<script lang="ts">
	import { T } from '@threlte/core';
	import { Spring } from 'svelte/motion';

    const scale = new Spring(1);
</script>

<T.Mesh
    castShadow
    receiveShadow
    onclick={() => {
        console.log('clicked')
    }}
    scale={scale.current}
    onpointerenter={() => scale.set(1.5)}
    onpointerleave={() => scale.set(1)}
    position={[5, 10, -10]}
>
    <T.BoxGeometry args={[1, 2, 1]} />
    <T.MeshStandardMaterial color="green" />
</T.Mesh>