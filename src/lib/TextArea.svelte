<script lang="ts">
  import { afterUpdate, beforeUpdate, onMount } from 'svelte';
  import type { ControlsType } from '../types';

  let text = 'This is not a variable font.';
  export let controls: ControlsType;
  export let textBox = {
    text: text,
    width: 0,
    height: 0,
  }

  let reference: HTMLTextAreaElement;

  function updateTextarea(target: HTMLTextAreaElement) {
    if (target) {
      target.style.height = '0';

      textBox = {
        text: text,
        width: target.offsetWidth,
        height: target.scrollHeight,
      }

      target.style.height = `${textBox.height}px`;
    }
  }

  const onKeyUp = (evt: KeyboardEvent) => updateTextarea(evt.target as HTMLTextAreaElement)

  // Wait a little to get the actual height.
  onMount(() => setTimeout(() => updateTextarea(reference), 50))
  afterUpdate(() => updateTextarea(reference))
</script>

<svelte:window on:resize={() => updateTextarea(reference)} />

<div class="column">
  <div>
    <h2>Source text</h2>
    <p>Type your own:</p>
  </div>

  <div class="textarea row_body">
    <textarea
      on:keyup={onKeyUp}
      bind:value={text}
      bind:this={reference}
      style="font-size: {controls && controls.fontSize ? controls.fontSize : 74}px;"
    ></textarea>
  </div>
</div>

<style>
  textarea {
    font-size: 8vw;
    line-height: 1;
    font-weight: 900;
    padding: 0;
    border: 0;
    margin: 0;
    margin: -10px;
    border: 10px solid transparent;
    width: calc(100% - 20px);
  }

  textarea:focus {
    background-color: rgb(235, 235, 235);
    border: 10px solid rgb(235, 235, 235);
    outline: 0;
  }
</style>
