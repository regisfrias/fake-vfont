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
    }
  })
</script>

<h2>Rendered text</h2>

<p>Click and drag on the text below to move the boldness around:</p>

<Canvas bind:textBox={textBox} bind:controls={controls} />

<p>
  <label for="bulge-x"><input id="bulge-x" type="checkbox" bind:checked={bulgeX}>Bulge horizontal</label>
  <label for="bulge-y"><input id="bulge-y" type="checkbox" bind:checked={bulgeY}>Bulge vertical</label>
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

<style>
  .control {
    display: block;
    width: 100%;
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
</style>
