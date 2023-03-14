import { test, expect, Page, Locator } from "@playwright/test";

test("Test 1.", async ({ page }) => {
    // Шаги:

    // 1. Перейти на страницу  http://89.189.152.235:1337/?path=/story/eos-tabs--default
    await page.goto(
        "http://89.189.152.235:1337/?path=/story/eos-tabs--default"
    );

    // 2. Перейти на "Вкладка 4"
    const tab: Locator = page.frameLocator("iframe").getByText("Вкладка 4");
    await tab.click();

    // Ожидаемый результат:
    const content: Locator = page.frameLocator("iframe").getByText("Текст 4");
    // 1. Проверить наличие "Текст 4"
    await expect(content).toHaveText("Текст 4");
});
