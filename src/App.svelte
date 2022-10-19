<script lang="ts">
  import Controls from "./lib/Controls.svelte";
  import TextArea from "./lib/TextArea.svelte";
  import type { TextBoxType, ControlsType } from './types';

  let textBox: TextBoxType;
  let controls: ControlsType;
</script>

<header>
  <h1>Fake Variable Font</h1>

  <p>A proof of concept for a text with continuous font thickness. This allows two separate font files (thin and a bold) to behave as if they were a single file with continous thickness — similar to OpenType font variations.</p>

  <p><a href="https://masters-thesis.regisfrias.com/">Context / background →</a></p>

</header>

<main>
  <h2>Source text</h2>
  <p>Type your own:</p>

  <TextArea bind:textBox={textBox} />

  <Controls bind:controls={controls} bind:textBox={textBox} />
</main>

<footer>
  <p>&copy; <a href="https://regisfrias.com/">Régis Frias</a> 2022</p>
  <a href="https://github.com/regisfrias/fake-vfont">Source code</a>
</footer>

<style>
  footer {
    margin-top: 8rem;
  }
</style>
