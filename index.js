import puppeteer from "puppeteer";
import fs from 'fs';
import { setupDebugger, getDebugInfo } from "./zero-debugger.js";
import {Sequelize, DataTypes} from 'sequelize';
import os from 'os'

async function utils__getCookies(page) {
  const cookies = await page.cookies();

  fs.writeFile("./cookies.json", JSON.stringify(cookies, null, 4), (err) => {
    if (err) console.log(err);
  });
}

async function utils__setCookies(page) {
  let cookiesString = fs.readFileSync("./cookies.json", "utf8");

  let cookies = JSON.parse(cookiesString);

  await page.setCookie.apply(page, cookies);
}

async function utils__delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

async function scenarios__startupRun() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  let [page] = await browser.pages();
  await page.setRequestInterception(true);

  page.on("request", async (req) => {
    if (req.url().includes("https://tilda.cc/projects/")) {
      await utils__getCookies(page);
    } else if (req.url().includes("https://tilda.cc/login/")) {
      await utils__setCookies(page);
    }

    req.continue();
  });


  await page.goto("https://tilda.cc/login/");
  await page.goto("https://tilda.cc/zero/?recordid=608469916&pageid=37662548");
}

async function scenarios__login(page) {
  await page.goto("https://tilda.cc/login/");
  await utils__setCookies(page);
}

async function scenarios__performanceRun(page) {
  await page.goto("https://tilda.cc/zero/?recordid=608469916&pageid=37662548");

  await setupDebugger(page);

  try {
    const helloBtn = await page.waitForSelector('.tn-hello__btn', {timeout: 1000});
    await helloBtn.click();  
  } catch (error) {
    //
  }

  // add elements
  const addBtn = await page.waitForSelector('.tn-add-btn');

  const selectors = [
    '.tn-add-text',
    '.tn-add-image',
    '.tn-add-shape',
    '.tn-add-button',
    '.tn-add-video',
    '.tn-add-tooltip',
    '.tn-add-html',
    '.tn-add-form',
    '.tn-add-gallery',
    '.tn-add-vector',
    '.tn-add-text',
    '.tn-add-image',
    '.tn-add-shape',
    '.tn-add-button',
    '.tn-add-video',
    '.tn-add-tooltip',
    '.tn-add-html',
    '.tn-add-form',
    '.tn-add-gallery',
    '.tn-add-vector',
    '.tn-add-text',
    '.tn-add-image',
    '.tn-add-shape',
    '.tn-add-button',
    '.tn-add-video',
    '.tn-add-tooltip',
    '.tn-add-html',
    '.tn-add-form',
    '.tn-add-gallery',
    '.tn-add-vector',
    '.tn-add-text',
    '.tn-add-image',
    '.tn-add-shape',
    '.tn-add-button',
    '.tn-add-video',
    '.tn-add-tooltip',
    '.tn-add-html',
    '.tn-add-form',
    '.tn-add-gallery',
    '.tn-add-vector',
  ];

  const addedElements = [];
  let largestY = 0;

  for (let selector of selectors) {
    await addBtn.click();
    
    await page.$eval(selector, (element) => {
      element.click();
    });

    await utils__delay(50);

    if (addedElements.length) {
      const prevElement = await page.$(`[data-elem-type=${addedElements.at(-1).type}]`);
      const currElement = await page.$(`[data-elem-type=${selector.split('-').at(-1)}]`);

      const prevBox = await prevElement.boundingBox();
      const currBox = await currElement.boundingBox();
      
      await page.mouse.move(currBox.x + currBox.width / 2, currBox.y + currBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(20 + currBox.width / 2, prevBox.y + prevBox.height + 20 + currBox.height / 2);
      await page.mouse.up();
      
      largestY = prevBox.y + prevBox.height + 20 + currBox.height / 2 + currBox.height;

      await page.evaluate(() => {
        const element = document.querySelector('.tn-canvas-max');
        const y = element.getBoundingClientRect().top + window.pageYOffset - 200;
        window.scrollTo({top: y});        
      });
    }

    const elemData = await page.$eval(`[data-elem-type=${selector.split('-').at(-1)}]`, (element) => {
      return {
        type: element.getAttribute('data-elem-type'),
        id: element.getAttribute('data-elem-id'),
        left: element.getAttribute('data-field-left-value'),
        top: element.getAttribute('data-field-top-value'),
        width: element.getAttribute('data-field-width-value'),
        height: element.getAttribute('data-field-height-value'),
      }
    })

    addedElements.push(elemData);
  }

  await page.evaluate(() => {
    floor__mousedown()
  });

  const input = await page.$('input[name="height"]');

  await input.focus();
  await input.press('Backspace');
  await input.type(Math.round(largestY).toString());
  await input.press('Enter');

  await page.evaluate(() => {
    floor__mousedown()
  });


  for (let i = 0; i < 10; i++) {
    await utils__delay(100);

    await page.keyboard.down('Meta')
    await page.keyboard.press('KeyA')
    await page.keyboard.up('Meta')
    await page.keyboard.press('Backspace')

    await utils__delay(100);

    await page.keyboard.down('Meta')
    await page.keyboard.press('KeyZ')
    await page.keyboard.up('Meta')
  }
  
  for (let i = 0; i < 10; i++) {
    await page.keyboard.down('Meta')
    await page.keyboard.press('KeyA')
    await page.keyboard.up('Meta')
    await page.keyboard.press('Backspace')

    await page.evaluate(() => {
      floor__mousedown()
    });
  }

  let debugInfo = await getDebugInfo(page);
  debugInfo = debugInfo.filter((info) => info.time !== 0).sort((a, b) => b.time - a.time);
  return debugInfo;
}

async function db__init() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  })

  await sequelize.authenticate()

  return sequelize;
}

async function db__defineModels(db) {
  const Performance = db.define('Performance', {
    fn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.NUMBER,
    },
  })

  return {Performance}
}

function utils__logMemoryUsage() {
  const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`;

  const memoryData = process.memoryUsage();

  const memoryUsage = {
    rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
    heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
    heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
    external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
    osfree: formatMemoryUsage(os.freemem()),
    ostotal: formatMemoryUsage(os.totalmem()) 
  };

  console.log(memoryUsage);
}

async function db__calculateStats(model) {
  try {
    const performances = await model.findAll();
    
    // Group by 'fn'
    const grouped = performances.reduce((groups, performance) => {
      const key = performance.fn;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(performance.time);
      return groups;
    }, {});

    // Sort each group and calculate median
    const medians = Object.entries(grouped).map(([fn, times]) => {
      times.sort((a, b) => a - b);
      const mid = Math.floor(times.length / 2);
      const median = times.length % 2 !== 0 ? times[mid] : (times[mid - 1] + times[mid]) / 2;
      return { fn, median };
    });

    // Now 'medians' is an array of objects, each having 'fn' and its median 'time'
    fs.writeFileSync('./stats.json', JSON.stringify(medians, null, 2));
  } catch (error) {
    console.error('Error calculating medians:', error);
  }
}

(async () => {
  const db = await db__init();

  const {Performance} = await db__defineModels(db);
  await db__calculateStats(Performance);
})()

(async () => {
  const db = await db__init();

  const {Performance} = await db__defineModels(db);

  await db.drop();
  await db.sync({ force: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: null,
  });

  const [loginPage] = await browser.pages(); 
  await scenarios__login(loginPage);
  
  // Each is about 15s
  const totalRuns = 100;

  const startTimeAll = performance.now();
  console.log(`[START] Running performance test on ${totalRuns} iterations`);

  for (let i = 0; i < totalRuns; i++) {
    const startTime = performance.now();

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0); 
    const data = await scenarios__performanceRun(page);

    await Promise.all(data.map((performanceEntry) => {
      return Performance.create({
        fn: performanceEntry.name,
        time: performanceEntry.time,
      })
    }))

    await page.close();

    const endTime = performance.now();

    console.log(`[${i + 1}/${totalRuns}] Finished iteration | ${Math.round((endTime - startTime) / 1000)}s`);
  }

  const endTimeAll = performance.now();
  console.log(`[END] End of performance test of ${totalRuns} iterations, total time is ${Math.round((endTimeAll - startTimeAll) / 1000)}s`);

  await db.close();
  await browser.close();
})();
