<script lang="ts">
  import Controls from "./lib/Controls.svelte";
  import TextArea from "./lib/TextArea.svelte";
  import type { TextBoxType, ControlsType } from './types';
  import Canvas from './lib/Canvas.svelte';

  let textBox: TextBoxType;
  let controls: ControlsType;
</script>

<header class="wrapper">
  <h1>Fake Variable Font</h1>

  <p>A proof of concept for a text with continuous font thickness. This allows two separate font files (thin and a bold) to behave as if they were a single file with continous thickness — similar to OpenType font variations.</p>

  <p><a href="https://masters-thesis.regisfrias.com/">Context / background →</a></p>

</header>

<main>
  <TextArea bind:controls={controls} bind:textBox={textBox} />
  <Canvas bind:textBox={textBox} bind:controls={controls} />

  <Controls bind:controls={controls} />
</main>

<aside class="wrapper">
  <h2>How does this work?</h2>
  <ol>
    <li>Two font files (<span class="thing">thin</span> and <strong>black</strong>) are loaded.</li>
    <li>The vector data of each glyph is read and mapped between the two font weights.</li>
    <li>The glyph vector data is interpolated linearly.</li>
  </ol>
  <p>See the full explanation <a href="https://masters-thesis.regisfrias.com/motley-2020-identity.html#typography">here</a>. Or check <a href="https://github.com/regisfrias/fake-vfont/blob/main/src/lib/Canvas.svelte">this file</a>.</p>
</aside>

<footer class="wrapper">
  <p>&copy; <a href="https://regisfrias.com/">Régis Frias</a> 2022</p>
  <a href="https://github.com/regisfrias/fake-vfont">Source code</a>
</footer>

<style>
  main {
    max-width: calc(100% - 80px);
    margin: 0 auto;
  }

  @media screen and (min-width: 780px) {
    main {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-row-gap: 10px;
      grid-column-gap: 40px;
      max-width: calc(100% - 80px);
      margin: auto;
    }

    footer {
      margin-top: 8rem;
    }
  }
</style>
