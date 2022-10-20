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

<textarea on:keyup={onKeyUp} bind:value={text} bind:this={reference}></textarea>

<style>
  textarea {
    width: 100%;
    font-size: 3rem;
    line-height: 1;
    font-weight: 900;
  }

  @media screen and (min-width: 500px) {
    textarea {
      font-size: 4rem;
    }
  }

  @media screen and (min-width: 780px) {
    textarea {
      font-size: 6rem;
    }
  }
</style>
