<script lang="ts">
  import Controls from "./lib/Controls.svelte";
  import Canvas from "./lib/Canvas.svelte";
  import TextArea from "./lib/TextArea.svelte";
  import type { TextBoxType, ControlsType } from './types';

  let textBox: TextBoxType;
  let controls: ControlsType;
</script>

<header>
  <h1>Fake Variable Font</h1>

  <p>A proof of concept for a text with continuous font thickness. This allows two separate font files (thin and a bold) to behave as if they were a single file with continous thickness — similar to OpenType font variations.</p>

  <a href="https://github.com/regisfrias/interpolate-font-file-glyphs">Source code</a>
</header>

<main>
  <h2>Source text</h2>
  <!-- <textarea bind:value={sourceText}></textarea> -->

  <TextArea bind:textBox={textBox} />

  <h2>Rendered text</h2>

  <Canvas bind:textBox={textBox} bind:controls={controls} />

  <Controls bind:controls={controls} />
</main>
