import { test, expect, Page, Locator } from "@playwright/test";

test("Test 2", async ({ page }) => {
    // Шаги:

    // 1. Перейти на страницу  http://89.189.152.235:1337/?path=/story/eos-timepicker--in-form
    await page.goto(
        "http://89.189.152.235:1337/?path=/story/eos-timepicker--in-form"
    );

    // 2. Раскрыть список
    await page.frameLocator("iframe").locator(".eos-field-suffix-icon").click();

    // 3. Нажать кнопку "Сейчас"
    await page.frameLocator("iframe").locator(".eos-picker-now-btn").click();

    // 4. Нажать кнопку "Submit"
    await page.frameLocator("iframe").getByText("SUBMIT").click();

    // ----------------------------------Работа с датой----------------------------------
    const date = new Date();
    const hours =
        date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
    const minutes =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    const prepareString = new RegExp(
        "Значение поля: " + date.toString().slice(0, 21)
    );
    // ----------------------------------------------------------------------------------

    // Ожидаемый результат:
    const alertContent = page.frameLocator("iframe").getByText(prepareString);
    // 1. Отобразилось сообщение с текущим временем
    await expect(alertContent).toHaveText(prepareString);

    const selectContent = page
        .frameLocator("iframe")
        .locator(".eos-picker-input")
        .getByPlaceholder("Введите время");

    // 2. Поле class="eos-picker-input" содержит текущее время
    await expect(selectContent).toHaveValue(`${hours}:${minutes}`);
});
