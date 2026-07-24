export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  type: 'unity' | 'aws' | 'python';
  url: string;
  /** true → embed `url`; a string → embed that URL instead */
  embed?: true | string;
  /** override the default 16/9 embed box, e.g. '960 / 856' */
  embedAspect?: string;
  thumbnail?: string;
  jamUrl?: string;
  submissionUrl?: string;
  note?: string;
}

export const tagLabel: Record<Project['type'], string> = {
  unity: 'Unity',
  aws: 'AWS',
  python: 'Python',
};

export const projects: Project[] = [
  {
    slug: 'missile-command',
    title: 'Missile Command',
    description: 'A browser-playable remake of the Atari classic. Defend your cities from incoming missiles.',
    longDescription: 'A Unity WebGL remake of Atari\'s Missile Command. Intercept incoming ballistic missiles before they destroy your cities. Built in Unity with a focus on clean game feel and responsive controls.',
    type: 'unity',
    url: 'https://redmorr.github.io/missile-command/',
    embed: true,
  },
  {
    slug: 'minijam-119',
    title: 'Lucifer',
    description: 'A 72-hour jam entry. Top-down western shooter where everything — enemies, ground, HUD, ammo — can be destroyed.',
    longDescription: 'Submitted to Mini Jam 119: Heaven (72h, 98 entries) with the limitation "Everything Can Die". The approach: implement as little as possible while keeping the game playable — health and ammo are destructible in-world objects, no menus. Ranked #53 overall and #19 for use of limitation. Team: programming by me, art by Marvin Holzinger, music by Hidde \'Zephyde\'.',
    type: 'unity',
    url: 'https://redmorr.github.io/minijam-119-heaven-submission/',
    embed: true,
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
    embed: true,
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
    slug: 'prescription-app',
    title: 'Prescription App',
    description: 'A full-stack AWS demo: a million-row medication table with instant pagination, prefix search, and a live panel showing which cache served each request.',
    longDescription: 'A serverless full-stack app on AWS: Vue 3 frontend on S3 + CloudFront, a Lambda (Function URL) API, DynamoDB holding 1,000,000 medications, and a self-hosted Redis cache on Fargate Spot — all provisioned with AWS CDK. Browse or prefix-search the table, jump to any of 20,000 pages, and watch the request-flow panel report whether each response came from the Redis page cache, a cached cursor, or a cold DynamoDB skip-scan. Built to explore the hard parts DynamoDB leaves to you: offset pagination it does not support, single-partition write throttling, and CloudFront changing what "client IP" means. The whole stack has cost guardrails — no NAT gateway, no ALB, Fargate Spot at the smallest size, everything destroyable.',
    type: 'aws',
    url: 'https://d3qfjrpy3bi73x.cloudfront.net',
    embed: '/prescription-app/',
  },
  {
    slug: 'rbmk-sim',
    title: 'RBMK Reactor Simulation',
    description: 'An agent-based model of Chernobyl-type reactor physics — free-moving neutrons, steam voids, xenon poisoning, and the graphite-tipped control rod flaw. Run the reactor, or run it into the ground.',
    longDescription: 'A 2D agent-based simulation of RBMK (Chernobyl-type) reactor physics, written in Python/pygame and compiled to WebAssembly. Thousands of individual neutrons move over a 60x40 core lattice, thermalising in graphite, being absorbed by water and boron, and causing fission in U-235 — every reactor behaviour emerges from those local rules rather than being scripted. That includes the three that mattered on 26 April 1986: the positive void coefficient (steam displaces neutron-absorbing water while the graphite keeps moderating, so losing coolant ADDS reactivity), xenon-135 poisoning (a time-delayed neutron sink that traps a reactor after a power reduction), and the graphite displacer tips that make the first seconds of an emergency scram increase power instead of cutting it. A guided scenario walks through the accident sequence; a staged physics test suite verifies all five behaviours independently of the visuals.',
    type: 'python',
    url: '/rbmk-sim/',
    embed: true,
    embedAspect: '960 / 856',  // the sim window is taller than 16/9
    thumbnail: '/rbmk-sim-thumb.png',
  },
];
