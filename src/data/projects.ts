export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  type: 'unity' | 'blazor' | 'placeholder';
  url?: string;
  embedUrl?: string;
  thumbnail?: string;
  jamUrl?: string;
  note?: string;
}

export const projects: Project[] = [
  {
    slug: 'missile-command',
    title: 'Missile Command',
    description: 'A browser-playable remake of the Atari classic. Defend your cities from incoming missiles.',
    longDescription: 'A Unity WebGL remake of Atari\'s Missile Command. Intercept incoming ballistic missiles before they destroy your cities. Built in Unity with a focus on clean game feel and responsive controls.',
    type: 'unity',
    url: 'https://redmorr.github.io/missile-command/',
    embedUrl: 'https://redmorr.github.io/missile-command/',
  },
  {
    slug: 'blazor',
    title: 'Blazor App',
    description: 'A hello world Blazor WebAssembly app running entirely in the browser via .NET WASM.',
    longDescription: 'A Blazor WebAssembly application running entirely client-side via .NET compiled to WebAssembly. No server required — the .NET runtime runs directly in the browser.',
    type: 'blazor',
    url: 'https://redmorr.github.io/blazor/',
    embedUrl: 'https://redmorr.github.io/blazor/',
  },
  {
    slug: 'minijam-119',
    title: 'Mini Jam 119: Heaven',
    description: 'A 72-hour game jam entry. Top-down shooter where everything — including the environment — can die.',
    longDescription: 'An entry for Mini Jam 119: Heaven, a 72-hour game jam with 98 submissions. The theme was Heaven and the limitation was "Everything Can Die" — the player, enemies, ground, HUD, and menus are all destructible. Built in Unity as a top-down western shooter.',
    type: 'unity',
    url: 'https://redmorr.github.io/minijam-119-heaven-submission/',
    embedUrl: 'https://redmorr.github.io/minijam-119-heaven-submission/',
    jamUrl: 'https://itch.io/jam/mini-jam-119-heaven',
    note: 'TODO: fix audio — FMOD removed, AudioClip fields need reassigning in Inspector.',
  },
  {
    slug: 'placeholder-2',
    title: 'Coming Soon',
    description: 'Another project is on the way.',
    longDescription: 'This project is currently in development.',
    type: 'placeholder',
  },
];
