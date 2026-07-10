// @ts-check

const repository = process.env.GITHUB_REPOSITORY || 'example/project';
const [organizationName, projectName] = repository.split('/');
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const isUserSite =
  projectName.toLowerCase() === `${organizationName.toLowerCase()}.github.io`;

const config = {
  title: 'Design Docs',
  url: isGitHubActions
    ? `https://${organizationName}.github.io`
    : 'http://localhost:3000',
  baseUrl: isGitHubActions && !isUserSite ? `/${projectName}/` : '/',
  organizationName,
  projectName,

  onBrokenLinks: 'warn',
  markdown: {
    format: 'detect',
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          path: '../docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Design Docs',
    },
  },
};

module.exports = config;
