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
  submissionUrl?: string;
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
    title: 'Lucifer',
    description: 'A 72-hour jam entry. Top-down western shooter where everything — enemies, ground, HUD, ammo — can be destroyed.',
    longDescription: 'Submitted to Mini Jam 119: Heaven (72h, 98 entries) with the limitation "Everything Can Die". The approach: implement as little as possible while keeping the game playable — health and ammo are destructible in-world objects, no menus. Ranked #53 overall and #19 for use of limitation. Team: programming by me, art by Marvin Holzinger, music by Hidde \'Zephyde\'.',
    type: 'unity',
    url: 'https://redmorr.github.io/minijam-119-heaven-submission/',
    embedUrl: 'https://redmorr.github.io/minijam-119-heaven-submission/',
    jamUrl: 'https://itch.io/jam/mini-jam-119-heaven',
    submissionUrl: 'https://itch.io/jam/mini-jam-119-heaven/rate/1789853',
    note: 'TODO: fix audio — FMOD removed, AudioClip fields need reassigning in Inspector.',
  },
  {
    slug: 'colt63',
    title: 'Colt63',
    description: 'A roguelike FPS set in the Old West. Traverse a procedurally generated map, scavenge supplies, and fight your way to the final boss.',
    longDescription: 'Submitted to Reload Magazine Game Jam #3 (3 entries). You are John OldWest Marine — navigate a node-based Old West map, managing hunger and ammo across combat, boss, and supply nodes. Four weapons (Colt, shotgun, rifle, light gun), three enemy types, and dynamically generated levels built from modular chunks. Windows download via itch.io. Team: programming by Przemek "Nukemu" Szurek, Maksymilian "Tromstone" Dziadoń, and Michał "Steiger" Jaworski; level design by Grzegorz "Bethrezen" Banasik and Michał "Steiger" Jaworski; music by Brunon Lubas; art and animation by Michał "Steiger" Jaworski.',
    type: 'unity',
    url: 'https://neofuturism.itch.io/colt',
    jamUrl: 'https://itch.io/jam/reload-magazine-game-jam-3',
    submissionUrl: 'https://itch.io/jam/reload-magazine-game-jam-3/rate/2448868',
  },
  {
    slug: 'placeholder-2',
    title: 'Coming Soon',
    description: 'Another project is on the way.',
    longDescription: 'This project is currently in development.',
    type: 'placeholder',
  },
];
