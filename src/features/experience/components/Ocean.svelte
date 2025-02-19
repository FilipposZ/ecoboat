<script lang="ts">
    import type * as THREE from 'three'
    import { Group } from 'three'
    import { T } from '@threlte/core'
    import { RigidBody, AutoColliders } from '@threlte/rapier'
    
    import { useGltf, useGltfAnimations, useSuspense } from '@threlte/extras'

    export const ref = new Group()

    const suspend = useSuspense()

    const actionName = 'Key.001Action.003'
    type GLTFResult = {
        nodes: {
            OceanPlane: THREE.Mesh
        }
        materials: {
            OceanMaterial: THREE.MeshStandardMaterial
        }
    }

    const gltf = suspend(useGltf<GLTFResult>('/models/ocean.glb'))
    export const { actions, mixer } = useGltfAnimations<typeof actionName>(gltf, ref)

    $: $actions[actionName]?.play()
</script>

<T is={ref} {...$$restProps} >
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}

    <T.Group name="Ocean">
        <RigidBody>
            <AutoColliders shape={'trimesh'}>
                <T.Mesh
                    name="OceanPlane"
                    castShadow
                    receiveShadow
                    geometry={gltf.nodes.OceanPlane.geometry}
                    material={gltf.materials.OceanMaterial}
                    morphTargetDictionary={gltf.nodes.OceanPlane.morphTargetDictionary}
                    morphTargetInfluences={gltf.nodes.OceanPlane.morphTargetInfluences}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={[1, 1, 0.3]}
                />
            </AutoColliders>
        </RigidBody>
    </T.Group>
    
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
