const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "CryptoPrice",
    tagline: "Track Cryptocurrency Prices in Real-Time",
    url: "https://suchithh.github.io",
    baseUrl: "/CryptoPrice/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "suchithh",
    projectName: "CryptoPrice",

    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            editUrl: "https://github.com/suchithh/CryptoPrice",
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: "CryptoPrice",
          logo: {
            alt: "CryptoPrice Logo",
            src: "img/logo.svg",
          },
          items: [
            {
              type: "doc",
              docId: "getting-started",
              position: "left",
              label: "Documentation",
            },
          ],
        },
        footer: {
          style: "dark",
          links: [
            {
              title: "Docs",
              items: [
                {
                  label: "Getting Started",
                  to: "/docs/getting-started",
                },
              ],
            },
            {
              title: "Links",
              items: [
                {
                  label: "GitHub",
                  href: "https://github.com/suchithh/CryptoPrice",
                },
                {
                  label: "Vercel",
                  href: "https://crypto-price-lyart.vercel.app/", // Added missing href
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} CryptoPrice Built with Docusaurus.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
      }),
  }
);
