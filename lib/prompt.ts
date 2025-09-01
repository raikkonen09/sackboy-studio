export interface PromptOptions {
  styleStrength: string;
  diorama: boolean;
}

/**
 * Builds an OpenAI prompt describing the knitted burlap plush aesthetic.
 * This helper appends additional phrases based on the style strength and
 * whether a miniature diorama background is requested. It also includes
 * safety instructions to avoid trademarks or copyrighted character
 * likenesses.
 */
export function buildPrompt({ styleStrength, diorama }: PromptOptions): string {
  let prompt =
    'Transform the entire scene into a whimsical knitted burlap plush aesthetic. ' +
    'Preserve subject identity and composition. Add soft stitched seams, yarn details, button‑like eyes where appropriate, felt textures, and a cozy miniature craft‑world look. ' +
    'Keep proportions toy‑like and charming. Maintain lighting from the original image. High detail, clean edges, photorealistic craft materials, no text.';

  // Apply style strength modifiers
  switch (styleStrength) {
    case 'low':
      prompt += ' Subtle stylisation.';
      break;
    case 'high':
      prompt += ' Strong stylisation with highly pronounced knit and stitch textures.';
      break;
    default:
      prompt += ' Moderate stylisation.';
      break;
  }

  if (diorama) {
    prompt +=
      ' Set within a handcrafted tabletop diorama of felt, cardboard, yarn and soft bokeh lights; coherent shadows; consistent perspective.';
  }

  // Prepend safety instruction
  prompt =
    'Do not include trademarks, logos or copyrighted character likenesses. ' +
    'Preserve identity and pose; translate facial features into toy‑like equivalents. ' +
    prompt;

  return prompt;
}