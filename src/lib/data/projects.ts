import type { ListItem } from '@src/types'

const projects: ListItem[] = [
  {
    title: 'Faire Day',
    summary:
      'Faire Day is your source for up-to-date weather conditions at your favorite Renaissance faires.',
    heroImageUrl: '/images/projects/faire-day.jpg',
    featured: true,
    links: [
      {
        type: 'app store',
        link: 'https://apps.apple.com/us/app/faire-day/id1450462432',
      },
      { type: 'facebook', link: 'https://www.facebook.com/faireday' },
    ],
  },
  {
    title: 'Dragon Dice',
    summary:
      "A reference guide for the Dragon Dice game to track your armies' statistics and capabilities.",
    heroImageUrl: '/images/projects/dragon-dice.jpg',
    featured: true,
    links: [{ type: 'web', link: 'http://dragon-dice.surge.sh/' }],
  },
  {
    title: 'Active Syntax',
    summary:
      "A syntax theme for GitHub's Atom text editor based on colors from Apple's Activity apps.",
    heroImageUrl: '/images/projects/active-syntax.jpg',
    links: [
      { type: 'web', link: 'https://atom.io/themes/active-syntax' },
      { type: 'github', link: 'https://github.com/timgthomas/active-syntax' },
    ],
  },
  {
    title: 'Heart Points',
    summary:
      'An iOS app to track damage, healing, and overall hit points in your favorite tabletop RPGs.',
    heroImageUrl: '/images/projects/heart-points.jpg',
    links: [
      {
        type: 'app store',
        link: 'https://itunes.apple.com/us/app/heart-points/id1092311753',
      },
      { type: 'facebook', link: 'https://www.facebook.com/heartpointsapp/' },
    ],
  },
  {
    title: 'Personal Site',
    summary:
      'My personal web site, featuring personal projects and blog posts on a variety of topics.',
    heroImageUrl: '/images/projects/personal-site.jpg',
    links: [
      { type: 'web', link: 'http://timgthomas.com' },
      { type: 'github', link: 'https://github.com/timgthomas/timgthomas.com' },
    ],
  },
]

export default projects
