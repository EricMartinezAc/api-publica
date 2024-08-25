const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

(async function example() {
  let driver = await new Builder().forBrowser("firefox").build();
  try {
    // Navega al sitio web
    await driver.get("http://localhost:2025");

    // Encuentra el formulario y los campos
    let inputField = await driver.findElement(By.name("userInput"));
    let submitButton = await driver.findElement(By.name("submit"));

    // Introduce datos en el campo de entrada
    await inputField.sendKeys("Test input");

    // Envía el formulario
    await submitButton.click();

    // Verifica la respuesta
    let response = await driver.wait(
      until.elementLocated(By.id("response")),
      10000
    );
    let responseText = await response.getText();

    // Aserción para verificar el texto de la respuesta
    assert.strictEqual(responseText, "Datos recibidos correctamente");

    console.log("Prueba de usabilidad completada con éxito");
  } finally {
    await driver.quit();
  }
})();
