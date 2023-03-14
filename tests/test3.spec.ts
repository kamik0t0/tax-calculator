import { test, expect, Page, Locator } from "@playwright/test";

test("Test 3", async ({ page }) => {
    // 1. Перейти на страницу  http://89.189.152.235:1337/?path=/story/eos-twincolumn--default
    // Шаги:
    await page.goto(
        "http://89.189.152.235:1337/?path=/story/eos-twincolumn--default"
    );
    const sourceList = page
        .frameLocator("iframe")
        .locator(".eos-transfer-list")
        .nth(0);

    const headerItemInSource = sourceList.getByTitle("{5} Заголовок");

    // 2. Нажать на элемент "{5} Заголовок" ==>
    await headerItemInSource.click();
    const subLocatorWithRequiredClass = headerItemInSource.locator(
        ".eos-checkbox-wrapper-checked"
    );

    // "{5} Заголовок" содержит "eos-checkbox-wrapper-checked"
    await expect(subLocatorWithRequiredClass).toHaveClass(
        /eos-checkbox-wrapper-checked/
    );

    const arrow = page.frameLocator("iframe").locator(".anticon-right");

    // 3. Нажать кнопку "class="anticon anticon-right"
    await arrow.click();

    // Ожидаемый результат:
    const resultList = page
        .frameLocator("iframe")
        .locator(".eos-transfer-list")
        .nth(1);

    // 1. Элемент "{5} Заголовок" перенесен в "ИТОГОВЫЙ СПИСОК"
    await resultList.getByTitle("{5} Заголовок").click();

    // 2. Кнопка "class="anticon anticon-right" содержит disabled
    await expect(arrow).toBeDisabled();
});
