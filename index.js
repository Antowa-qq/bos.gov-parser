const chalk = require("chalk");
const puppeteer = require("puppeteer");
const fs = require("fs");
const { LAUNCH_PUPPETEER_OPTS, USER_AGENT, PAGE_PUPPETEER_OPTS, SELECTORS } = require("./constans");

const parser = async (positionStart, positionEnd) => {
  const result = [];

  try {
    const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
    const page = await browser.newPage();
    await page.setUserAgent(USER_AGENT);

    const numbers = [...Array(positionEnd - positionStart).keys()].map((el) => el + positionStart);

    for (let key of numbers) {
      console.log(chalk.yellow("---------------------------------------------------------"));
      console.log(chalk.blue(`URL : https://bus.gov.ru/agency/${key}`));

      let name,
        site,
        email = "";

      await page.goto(`https://bus.gov.ru/agency/${key}`, PAGE_PUPPETEER_OPTS);

      try {
        name = await page.$eval(SELECTORS.institution_name, (element) => element.textContent);
      } catch (error) {
        console.log(`${chalk.red("Not found : Name")}`);
        name = "";
      }
      try {
        site = await page.$eval(SELECTORS.site, (element) => element.href);
        if (site === "http:") {
          throw Error;
        }
      } catch (error) {
        console.log(`${chalk.red("Not found : Site")}`);
        site = "";
      }
      try {
        email = await page.$eval(SELECTORS.email, (element) => element.textContent);
      } catch (error) {
        console.log(`${chalk.red("Not found : Email")}`);
        email = "";
      }
      if (site) {
        result.push([name, site, email]);
        console.log(chalk.green(`https://bus.gov.ru/agency/${key} -- success`));
      } else {
        console.log(chalk.red(`https://bus.gov.ru/agency/${key} -- failure`));
      }

      fs.appendFile(
        "./logger.txt",
        `
      ---------------------------------------------------------
      URL : https://bus.gov.ru/agency/${key}
      Name : ${name}
      Site : ${site}
      Email : ${email}
      Status : ${site ? "success" : "failure"}
      `,
        (err) => {
          return err;
        }
      );
    }
    fs.writeFileSync(`./data/data_${positionStart}_${positionEnd}.json`, JSON.stringify(result));
  } catch (error) {
    console.log(chalk.red(error));
    fs.writeFileSync(`./data/data_${positionStart}_${positionEnd}.json`, JSON.stringify(result));
  }
};

parser(100, 400);
