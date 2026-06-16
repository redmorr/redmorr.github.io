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
    slug: 'navmesh-agent-simulation',
    title: 'NavMesh Agent Simulation',
    description: 'A Unity simulation of autonomous agents navigating an arena, colliding with each other, taking damage, and despawning — with real-time selection and health tracking.',
    longDescription: 'Agents spawn continuously into an arena, pathfind to random positions via NavMeshAgent, and collide with each other — dealing knockback and damage. Click any agent to track its name and health live. Built with Unity\'s Object Pool (up to 200 agents), event-driven health system, IDamagable interface, and ScriptableObject-based config for collision tuning.',
    type: 'unity',
    url: 'https://redmorr.github.io/navmesh-agent-simulation/',
    embedUrl: 'https://redmorr.github.io/navmesh-agent-simulation/',
    note: 'TODO: fix selection shader · add interactions',
  },
  {
    slug: 'chinese-empire',
    title: 'Chinese Empire',
    description: 'An economic city-building strategy set in historical China. Grow a small village into a vast empire through building placement, agriculture, and resource management.',
    longDescription: 'A city-builder / economic strategy game set in historical China — the player starts as emperor of a small village and expands it into an empire through careful building placement, crop management, road networks, and cultural development. The project was handed down to me; I fixed outstanding issues and shipped the final release on Steam in March 2024. Published by Yeyuna.',
    type: 'unity',
    url: 'https://store.steampowered.com/app/1449550/Chinese_Empire/',
  },
  {
    slug: 'pawnshop-90s',
    title: 'Pawnshop 90s',
    description: 'Manage a pawnshop in 1990s Poland — haggle, buy and sell merchandise, expand your business, and meet colourful characters.',
    longDescription: 'A pawnshop management simulation set in 1990s Poland, published by RockGame S.A. Players run a shop during a period of high unemployment and economic transformation, haggling with customers, organising inventory, disassembling items for parts, and gradually expanding the business. I served as lead programmer. Development is currently on hold.',
    type: 'unity',
    url: 'https://store.steampowered.com/app/3126490/Pawnshop_90s/',
    note: 'Development on hold.',
  },
  {
    slug: 'placeholder-2',
    title: 'Coming Soon',
    description: 'Another project is on the way.',
    longDescription: 'This project is currently in development.',
    type: 'placeholder',
  },
];
