<script lang="ts">
  import { afterUpdate } from 'svelte';
  import type { TextBoxType } from '../types';
  export let textBox: TextBoxType;
  
  let text = 'Non consectetur libero tenetur molestiae qui. Et sint sunt excepturi odit.';
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
  }
</style>