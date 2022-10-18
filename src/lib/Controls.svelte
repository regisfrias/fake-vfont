<script lang="ts">
  import { afterUpdate } from 'svelte';
  import type { ControlsType } from '../types'
  export let controls: ControlsType;
  let thickness = 1
  let bulgeCenter = 0
  let bulge = true

  afterUpdate(() => {
    controls = {
      thickness,
      bulgeCenter,
      bulge,
    }
  })
</script>

<p>
  Thickness
  <span class="control thickness">
    <span class="label">Thin</span>
    <input class="thickness-control" type="range" name="" id="" min="0" max="1" step="0.001" bind:value={thickness}>
    <span class="label">Bold</span>
  </span>
</p>

<p>
  Bulge <input type="checkbox" checked={bulge}>
  <span class="control bulge-control-wrapper">
    <input class="bulge-control" type="range" min="0" max="1" step="0.001" bind:value={bulgeCenter}>
  </span>
</p>

<style>
  .control {
    display: block;
    width: 100%;
  }

  input[type=range] {
    display: block;
    width: 100%;
  }

  .thickness {
    display: flex;
  }

  .thickness .label:first-child {
    padding-right: 1rem;
  }
  .thickness .label:last-child {
    padding-left: 1rem;
  }
</style>