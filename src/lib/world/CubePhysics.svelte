<script lang="ts">
	import { T } from '@threlte/core';
	import { Spring } from 'svelte/motion';
    import { RigidBody, AutoColliders } from '@threlte/rapier'

    const scale = new Spring(1);
</script>

<T.Group 
    scale={scale.current}
    on:pointerenter={() => scale.set(1.5)}
    on:pointerleave={() => scale.set(1)}
    position={[-5, 10, -10]}
>
    <RigidBody>
        <AutoColliders shape={'convexHull'}>
            <T.Mesh
                castShadow
                receiveShadow
                on:click={() => {
                    console.log('clicked')
                }}
            >
                <T.BoxGeometry args={[1, 2, 1]} />
                <T.MeshStandardMaterial color="hotpink" />
            </T.Mesh>
        </AutoColliders>
    </RigidBody>
</T.Group>