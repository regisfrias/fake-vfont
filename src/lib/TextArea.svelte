<script lang="ts">
  import { afterUpdate } from 'svelte';
  import type { TextBoxType } from '../types';
  export let textBox: TextBoxType;

  let text = 'This is not a variable font.';
  let reference: HTMLTextAreaElement;

  function onChangeText(target: HTMLTextAreaElement) {
    target.style.height = '0';
    textBox = {
      text: text,
      width: target.offsetWidth,
      height: target.scrollHeight,
      fontSize: parseInt(window.getComputedStyle(target, null).fontSize)
    }

    target.style.height = `${textBox.height}px`;
  }

  const onKeyUp = (evt: KeyboardEvent) => onChangeText(evt.target as HTMLTextAreaElement)
  afterUpdate(() => onChangeText(reference))
</script>

<div class="column">
  <div>
    <h2>Source text</h2>
    <p>Type your own:</p>
  </div>

  <div class="textarea row_body">
    <textarea on:keyup={onKeyUp} bind:value={text} bind:this={reference}></textarea>
  </div>
</div>

<style>
  textarea {
    font-size: 3rem;
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

  @media screen and (min-width: 500px) {
    textarea {
      font-size: 4rem;
    }
  }

  @media screen and (min-width: 780px) {
    textarea {
      font-size: 8vw;
    }
  }
</style>
