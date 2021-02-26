module.exports = {
  title: 'Shopify Packer',
  tagline: 'Shopify development tool using themekit and webpack',
  url: 'https://hayes0724.github.io/shopify-packer',
  baseUrl: '/shopify-packer/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'hayes0724',
  projectName: 'shopify-packer',
  themeConfig: {
    navbar: {
      title: 'Shopify Packer',
      /*logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },*/
      items: [
        {
          to: '/docs',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/hayes0724/shopify-packer',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs',
            },
            {
              label: 'Configuration',
              to: '/docs/config',
            },
            {
              label: 'Features',
              to: '/docs/features',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Github',
              href: 'https://github.com/hayes0724/shopify-packer/',
            },
            {
              label: 'Issues',
              href: 'https://github.com/hayes0724/shopify-packer/issues',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/hayes0724/shopify-packer/discussions',
            },
          ],
        },
      ],
      /*copyright: `Copyright © ${new Date().getFullYear()} Shopify-packer`,*/
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
