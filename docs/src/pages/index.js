import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";
import { FaGithub, FaBook, FaExternalLinkAlt } from "react-icons/fa";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg margin-right--md"
            to="/docs/getting-started"
          >
            <FaBook className="margin-right--sm" /> Get Started
          </Link>
          <Link
            className="button button--outline button--lg button--secondary margin-right--md"
            href="https://github.com/suchithh/CryptoPrice"
          >
            <FaGithub className="margin-right--sm" /> GitHub
          </Link>
          <Link
            className="button button--outline button--lg button--secondary"
            href="https://crypto-price-lyart.vercel.app/"
          >
            <FaExternalLinkAlt className="margin-right--sm" /> Live Demo
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageContent() {
  return (
    <div className={clsx("container", styles.homeContent)}>
      <div className="row padding-top--xl padding-bottom--xl">
        <div className="col col--6">
          <h2>Track Cryptocurrency Prices in Real-Time</h2>
          <p className={styles.homeDescription}>
            CryptoPrice provides and intuitive dashboard monitor and analyze
            cryptocurrency markets. Get instant access to real-time price data,
            historical charts, and market trends to make informed investment
            decisions.
          </p>
          <Link
            className="button button--primary button--lg margin-top--md"
            to="docs/getting-started"
          >
            Read Documentation
          </Link>
        </div>
        <div className="col col--6">
          <div className={styles.imageContainer}>
            <img
              src="/CryptoPrice/img/dashboard.png"
              alt="CryptoPrice Dashboard"
              className={styles.featureImage}
            />
          </div>
        </div>
      </div>
      <div className={clsx("text--center", styles.screenshotsSection)}>
        <h2 className="margin-top--xl margin-bottom--lg">Screenshots</h2>
        <div className={styles.screenshotGrid}>
          <div className={styles.screenshotCard}>
            <div className={styles.screenshotContainer}>
              <img
                src="/CryptoPrice/img/modal.png"
                alt="Detailed Crypto Information"
                className={styles.screenshot}
              />
            </div>
            <p>Detailed Cryptocurrency Information</p>
          </div>
          <div className={styles.screenshotCard}>
            <div
              className={
                styles.screenshotContainer + " " + styles.phoneContainer
              }
            >
              <img
                src="/CryptoPrice/img/phone.png"
                alt="Mobile View"
                className={styles.phoneScreenshot}
              />
            </div>
            <p>Responsive Mobile Design</p>
          </div>
          <div className={styles.screenshotCard}>
            <div className={styles.screenshotContainer}>
              <img
                src="/CryptoPrice/img/search.png"
                alt="Search Functionality"
                className={styles.screenshot}
              />
            </div>
            <p>Fast Search Capabilities</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageContent />
      </main>
    </Layout>
  );
}
