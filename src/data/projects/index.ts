import { Project } from '@/data/projects/project'
import { BubbleBobbleProject } from './BubbleBobble/data';

const SpaceInvadersProject : Project = {
  slug: 'spaceinvaders',
  title: 'Space Invaders',
  thumbnailImage: '/projects/SpaceInvaders/thumbnail.webp',
  heroImage: '/projects/SpaceInvaders/hero.png',
  technologies: ['react', 'tailwind', 'node'],
  shortDescription: 'A faithful remake of the classic Space Invaders game, built with React and Node.',
  longDescription: `
    Space Invaders is a classic arcade shooter implemented with React and Node.
    This project demonstrates real-time game mechanics, collision detection,
    and responsive design.
  `,
};

const PersonalBlogProject : Project = {
  slug: 'personalblog',
  title: 'Personal Blog',
  thumbnailImage: '/projects/PersonalBlog/thumbnail.webp',
  heroImage: '/projects/PersonalBlog/hero.png',
  technologies: ['next', 'tailwind', 'node'], 
  shortDescription: 'A sleek and modern personal blog built with Next.js and Tailwind CSS.',
  longDescription: `
    This personal blog showcases a clean, responsive design and seamless navigation.
    It features Markdown support, syntax highlighting, and a focus on performance
    and accessibility, making it ideal for sharing articles and insights.
  `,
};

const WeatherAppProject : Project = {
  slug: 'weatherapp',
  title: 'Weather App',
  thumbnailImage: '/projects/WeatherApp/thumbnail.webp',
  heroImage: '/projects/WeatherApp/hero.png',
  technologies: ['react', 'tailwind', 'node', 'api'],
  shortDescription: 'A sleek weather app that displays current conditions and forecasts for any location.',
  longDescription: `
    The Weather App delivers real-time weather information and forecasts using a public API. 
    It showcases responsive design, state management, and asynchronous data fetching 
    for a seamless user experience.
  `,
};

const EcommerceStoreProject : Project = {
  slug: 'ecommerce',
  title: 'E‑commerce Store',
  thumbnailImage: '/projects/EcommerceStore/thumbnail.webp',
  heroImage: '/projects/EcommerceStore/hero.png',
  technologies: ['next', 'react', 'tailwind', 'node', 'stripe'],
  shortDescription: 'A modern online shop with seamless navigation and Stripe payments integration.',
  longDescription: `
    The E‑commerce Store project showcases a fully featured online shop with
    Next.js, Tailwind CSS, and Stripe for payments. Includes product listing,
    cart and checkout flow, and mobile-friendly design.
  `,
};

const SaaSDashboardProject : Project = {
  slug: 'saasdashboard',
  title: 'SaaS Dashboard',
  thumbnailImage: '/projects/SaaSDashboard/thumbnail.webp',
  heroImage: '/projects/SaaSDashboard/hero.png',
  technologies: ['react', 'tailwind', 'node', 'graphql'],
  shortDescription: 'A feature-rich SaaS analytics and reporting dashboard.',
  longDescription: `
    The SaaS Dashboard project showcases a customizable analytics platform built
    with React and Tailwind, featuring role-based access, interactive charts, and
    a highly performant GraphQL data layer.
  `,
};

const PuzzleGameProject : Project = {
  slug: 'puzzlegame',
  title: 'Puzzle Game',
  thumbnailImage: '/projects/PuzzleGame/thumbnail.webp',
  heroImage: '/projects/PuzzleGame/hero.png',
  technologies: ['react', 'tailwind', 'node', 'websockets'],
  shortDescription: 'A fun and challenging online puzzle game with multiplayer support.',
  longDescription: `
    This Puzzle Game project is an interactive, real-time online game developed 
    with React and Tailwind for the front-end, and Node.js + WebSockets 
    for multiplayer gameplay. Includes chat and lobby support.
  `,
};

const MusicAppProject : Project = {
  slug: 'musicapp',
  title: 'Music App',
  thumbnailImage: '/projects/MusicApp/thumbnail.webp',
  heroImage: '/projects/MusicApp/hero.png',
  technologies: ['next', 'tailwind', 'node', 'spotify-api'],
  shortDescription: 'A sleek music streaming app built with Next.js and the Spotify API.',
  longDescription: `
    The Music App project is a feature-rich music streaming service built 
    with Next.js and Tailwind, integrating the Spotify API for playback and user playlists. 
    It highlights seamless authentication, media controls, and responsive design.
  `,
};


export const projects = [
  BubbleBobbleProject,
  SpaceInvadersProject,
  PersonalBlogProject,
  WeatherAppProject,
  EcommerceStoreProject,
  SaaSDashboardProject,
  PuzzleGameProject,
  MusicAppProject
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
