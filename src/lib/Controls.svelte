<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';
  import type { ControlsType } from '../types';
  export let controls: ControlsType;
  const fontSizeVw = () => window && window.innerWidth && window.innerWidth > 600 ? window.innerWidth / 100 * 8 : 60;

  let thickness = 1
  let bulgeX = true
  let bulgeY = true
  let radiusX = 300
  let radiusY = 300
  let debug = false
  let compensateWidth = true
  let fontSize = fontSizeVw();

  onMount(() => fontSize = fontSizeVw())

  afterUpdate(() => {
    controls = {
      thickness,
      bulge: {
        x: bulgeX,
        y: bulgeY,
      },
      radius: {
        x: radiusX,
        y: radiusY
      },
      debug,
      compensateWidth,
      fontSize
    }
  })

  const onResize = () => fontSize = fontSizeVw()
</script>

<svelte:window on:resize={onResize} />

<div class="bulge">
  <label for="bulge-x"><input id="bulge-x" type="checkbox" bind:checked={bulgeX}>Bulge horizontal</label>
  <label for="bulge-y"><input id="bulge-y" type="checkbox" bind:checked={bulgeY}>Bulge vertical</label>
  <label for="debug"><input id="debug" type="checkbox" bind:checked={debug}>Show distortion circle</label>
  <label for="compensateWidth"><input id="compensateWidth" type="checkbox" bind:checked={compensateWidth}>Compensate width</label>
</div>

<div>
  <p>
    <span class="control">
      <label for="thickness-control">Thickness:</label>
      <span class="thickness">
        <span class="label">Thin</span>
        <input class="thickness-control" type="range" name="thickness-control" id="thickness-control" min="0" max="1" step="0.001" bind:value={thickness}>
        <span class="label">Bold</span>
      </span>
    </span>
    <span class="control size">
      <label for="size-control">Font size:</label>
      <input class="size-control" type="range" name="size-control" id="size-control" min="20" max="200" step="1" bind:value={fontSize}>
    </span>
  </p>
</div>

<div>
  <p>
    <span class="control radius">
      <label for="radius-control-x">Radius horizontal:</label>
      <input class="radius-control-x" type="range" name="radius-control-x" id="radius-control-x" min="50" max="1000" step="1" bind:value={radiusX}>
    </span>
    <span class="control radius">
      <label for="radius-control-y">Radius vertical:</label>
      <input class="radius-control-y" type="range" name="radius-control-y" id="radius-control-y" min="50" max="1000" step="1" bind:value={radiusY}>
    </span>
  </p>
</div>

<style>
  .control {
    display: block;
    width: 100%;
  }

  input {
    margin-bottom: 2rem;
  }

  .control label {
    display: block;
  }

  .bulge {
    grid-column-start: 1;
    grid-column-end: 3;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.5rem;
  }

  input[type=range] {
    display: block;
    width: 100%;
  }

  label {
    cursor: pointer;
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

  @media screen and (min-width: 720px) {
    .bulge {
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 0.5rem;
    }
  }
</style>
