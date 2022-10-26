<script lang="ts">
  import { afterUpdate } from 'svelte';
  import type { ControlsType, TextBoxType } from '../types';
  import Canvas from './Canvas.svelte';
  export let controls: ControlsType;
  export let textBox: TextBoxType;

  let thickness = 1
  let bulgeX = true
  let bulgeY = true
  let radiusX = 300
  let radiusY = 300
  let debug = false
  let compensateWidth = true

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
      compensateWidth
    }
  })
</script>

<div class="column">
  <div>
    <h2>Rendered text</h2>
    <p>Click and drag on the text below to move the boldness around:</p>
  </div>

  <div>
    <Canvas bind:textBox={textBox} bind:controls={controls} />

    <p class="bulge">
      <label for="bulge-x"><input id="bulge-x" type="checkbox" bind:checked={bulgeX}>Bulge horizontal</label>
      <label for="bulge-y"><input id="bulge-y" type="checkbox" bind:checked={bulgeY}>Bulge vertical</label>
      <label for="debug"><input id="debug" type="checkbox" bind:checked={debug}>Show distortion circle</label>
      <label for="compensateWidth"><input id="compensateWidth" type="checkbox" bind:checked={compensateWidth}>Compensate width</label>
    </p>

    <p>
      <span class="control thickness">
        <label for="thickness-control">Thickness:</label>
        <span class="label">Thin</span>
        <input class="thickness-control" type="range" name="thickness-control" id="thickness-control" min="0" max="1" step="0.001" bind:value={thickness}>
        <span class="label">Bold</span>
      </span>
    </p>

    <p>
      <span class="control radius">
        <label for="radius-control">Radius horizontal:</label>
        <input class="radius-control" type="range" name="radius-control" id="radius-control" min="50" max="1000" step="1" bind:value={radiusX}>
      </span>
      <span class="control radius">
        <label for="radius-control">Radius vertical:</label>
        <input class="radius-control" type="range" name="radius-control" id="radius-control" min="50" max="1000" step="1" bind:value={radiusY}>
      </span>
    </p>
  </div>
</div>

<style>
  .control {
    display: block;
    width: 100%;
  }

  .bulge {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
  }

  .bulge label {
    display: block;
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

  .thickness label {
    margin-right: 1rem;
  }

  .thickness .label:first-child {
    padding-right: 1rem;
  }
  .thickness .label:last-child {
    padding-left: 1rem;
  }

  @media screen and (min-width: 420px) {
    .bulge {
      grid-template-columns: 1fr 1fr;
      grid-gap: 0.5rem;
    }
  }

  @media screen and (min-width: 980px) {
    /* .bulge label {
      min-width: none;
    } */
  }
</style>
