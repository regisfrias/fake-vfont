<script lang="ts">
  import { afterUpdate } from 'svelte';
  import type { ControlsType, TextBoxType } from '../types';
  import Canvas from './Canvas.svelte';
  export let controls: ControlsType;
  export let textBox: TextBoxType;

  let thickness = 1
  let bulgeCenterX = 0
  let bulgeCenterY = 1
  let bulgeX = true
  let bulgeY = false

  afterUpdate(() => {
    controls = {
      thickness,
      bulge: {
        x: {
          on: bulgeX,
          center: bulgeCenterX,
        },
        y: {
          on: bulgeY,
          center: bulgeCenterY,
        },
      }
    }
  })
</script>

<p>
</p>

<h2>Rendered text</h2>
<div class="canvas_wrapper">
  <Canvas bind:textBox={textBox} bind:controls={controls} />
  {#if textBox && textBox.height}
  <div class="control bulge-control-y-wrapper">
    <div class="rotate" style="width: {textBox.height}px; transform: translate(-{textBox.height / 2 - 40}px, {textBox.height / 2}px) rotate(-90deg);">
      <input name="bulge-y" class="bulge-control" type="range" min="0" max="1" step="0.001" bind:value={bulgeCenterY}>
      <input type="checkbox" bind:checked={bulgeY}><label for="bulge-y">Bulge vertical</label>
    </div>
  </div>
  {/if}
</div>


<p>
  <span class="control bulge-control-x-wrapper">
    <input class="bulge-control" type="range" min="0" max="1" step="0.001" bind:value={bulgeCenterX}>
  </span>
  <input type="checkbox" bind:checked={bulgeX}> Bulge horizontal
</p>

<p>
  Thickness
  <span class="control thickness">
    <span class="label">Thin</span>
    <input class="thickness-control" type="range" name="" id="" min="0" max="1" step="0.001" bind:value={thickness}>
    <span class="label">Bold</span>
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

  .canvas_wrapper {
    display: flex;
  }

  .bulge-control-x-wrapper {
    display: flex;
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