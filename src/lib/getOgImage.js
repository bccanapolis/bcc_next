import chrome from 'chrome-aws-lambda';
import { createHash } from 'crypto';
import fs from 'fs';

const isDev = process.env.NODE_ENV === 'development';
const exePath = process.env.CHROME_BIN || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function getOgImage(path) {
  const width = 1200;
  const height = 630;

  if (isDev) return { path: '/img/open_graph_full.png', width, height };

  const baseUrl = 'http://localhost:3000';

  const url = `${baseUrl}${path}`;
  const hash = createHash('md5').update(url).digest('hex');
  const ogImageDir = `./public/img/og`;
  const imagePath = `${ogImageDir}/${hash}.png`;
  const publicPath = `/img/og/${hash}.png`;

  const browser = await chrome.puppeteer.launch({
    args: chrome.args,
    executablePath: exePath,
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: width, height: height });
  await page.goto(url, { waitUntil: 'networkidle2' });
  const buffer = await page.screenshot({ type: 'png' });
  await browser.close();

  fs.mkdirSync(ogImageDir, { recursive: true });
  fs.writeFileSync(imagePath, buffer);

  return { path: publicPath, width, height };
}

export default getOgImage;
