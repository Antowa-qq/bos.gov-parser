const LAUNCH_PUPPETEER_OPTS = {
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-accelerated-2d-canvas",
    "--no-first-run",
    "--no-zygote",
    "--disable-gpu",
  ],
  headless: true,
};

const PAGE_PUPPETEER_OPTS = {
  networkIdle2Timeout: 5000,
  waitUntil: ["networkidle2", "domcontentloaded"],
  timeout: 3000000,
};

const USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36";

const SELECTORS = {
  institution_name: 'span[ng-bind="ctrl.data.publicInfo.fullClientName"]',
  site: 'div[ng-if="publicInfo.website"] .info-section-row__content a',
  email: 'div[ng-if="publicInfo.email"] .info-section-row__content a',
};

module.exports = {
  LAUNCH_PUPPETEER_OPTS,
  USER_AGENT,
  PAGE_PUPPETEER_OPTS,
  SELECTORS,
};
