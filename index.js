require("dotenv").config();
const { timeout } = require("puppeteer");
const puppeteer = require("puppeteer");

async function accessCadPrev(browser) {
  try {
    const page = await browser.newPage();

    await page.goto('https://cadprev.previdencia.gov.br/Cadprev/pages/index.xhtml', {
      timeout: 60000, waitUntil: 'networkidle2'
    });
    console.log('====================================');
    console.log("Navegou para tela de Login do CADPREv");
    console.log('====================================');

    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector('input[id*="form\\:cpf"]', {
      timeout: 10000
    });
    console.log('====================================');
    console.log("Encontrou o campo de inserir CPF no login");
    console.log('====================================');

    await page.$eval('input[id*="form\\:cpf"]', (el, value) => {
      el.value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }, process.env.CPF);
    console.log('====================================');
    console.log("Inseriu o cpf no campo de cpf");
    console.log('====================================');

    await page.waitForSelector('input[id*="form\\:senha"]', {
      timeout: 10000 
    });
    console.log('====================================');
    console.log("Encontrou o campo de inserir a senha");
    console.log('====================================');

    await page.$eval('input[id*="form\\:senha"]', (el, value) => {
      el.value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }, process.env.SENHA);
    console.log('====================================');
    console.log('Inseriu a senha no campo de senha');
    console.log('====================================');

    await page.waitForSelector('input[name*="form\\:botaoLogin"]', {
      timeout: 10000
    });
    console.log('====================================');
    console.log("Encontrou o campo de submit no login");
    console.log('====================================');

    await page.click('input[name*="form\\:botaoLogin"]', {
      timeout: 10000
    });
    console.log('====================================');
    console.log("Clicou no campo de submit no login");
    console.log('====================================');

    await page.goto("https://cadprev.previdencia.gov.br/Cadprev/pages/modulos/dair/restrito/consultarDemonstrativos.xhtml", {
      timeout: 60000, waitUntil: 'networkidle2'
    });
    console.log('====================================');
    console.log("Navegou para outra tela");
    console.log('====================================');

    await page.evaluate(() => {
      const seletor = document.querySelector("select#form\\:ente");
      seletor.value = 2;
      const event = new Event("change");
      seletor.dispatchEvent(event);
    });
    await page.waitForNavigation({ timeout: 60000 });
    console.log('====================================');
    console.log("selecionou ente");
    console.log('====================================');

    await page.waitForSelector('input[name*=form\\:botaoConsultar]', {
      timeout: 60000,
    });
    console.log('====================================');
    console.log("Encontrou o botão de Consultar");
    console.log('====================================');

    await page.click('input[name*=form\\:botaoConsultar]', {
      timeout: 60000,
    });
    console.log('====================================');
    console.log("Clicou no botão de Consultar");
    console.log('====================================');

    await page.waitForSelector('input[id*=formTabela\\:tabRascunhos\\:0\\:botaoAlterar]', {
      timeout: 60000,
    });
    console.log('====================================');
    console.log("Encontrou o campo de alterar do ente");
    console.log('====================================');

    await page.click('input[id*=formTabela\\:tabRascunhos\\:0\\:botaoAlterar]', {
      timeout: 60000,
    });
    console.log('====================================');
    console.log("Clicou no botão de alterar dados do Ente");
    console.log('====================================');

    await page.waitForNavigation({ timeout: 60000 });
    console.log('====================================');
    console.log("NAVEGOU PARA A OUTRA TELA ONDE TEM A CARTEIRA");
    console.log('====================================');

    const urlAtual = await page.url();
    console.log('====================================');
    console.log("LOGANDO A URL ATUAL", urlAtual);
    console.log('====================================');


    const extrairUltimoNumeroDaURL = (urlAtual) => {
      const urlObjeto = new URL(urlAtual);

      const parteDaURL = urlObjeto.pathname.split('/').filter(parte => parte);

      return parteDaURL[parteDaURL.length - 1];
    }

    const ultimoValor = extrairUltimoNumeroDaURL(urlAtual);
    console.log("ultimo valor:",ultimoValor);

  } catch (error) {
    console.log({ error });
    return false;
  }
}

(async () => {
  // Inicia o navegador e abre uma nova página em branco
  const browser = await puppeteer.launch({
    headless: false
  });

  const rotina1 = await accessCadPrev(browser);

  console.log({ rotina1 });

  if (rotina1) {
    console.log('Rotina 2');
  }

  // await browser.close();
})();
