<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@2.0.3 ./static/models/cloud.glb --shadows --suspense
-->

<script>
  import { Group } from 'three'
  import { T } from '@threlte/core'
  import { useGltf, useSuspense } from '@threlte/extras'

  export const ref = new Group()

  const suspend = useSuspense()

  const gltf = suspend(useGltf('/models/cloud.glb'))
</script>

<T is={ref} {...$$restProps}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cloud.geometry} material={gltf.materials['Cloud__0.002']} />
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
