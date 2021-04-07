/******************************************************************************
 *
 * Copyright (c) 2020, the Regular Table Authors.
 *
 * This file is part of the Regular Table library, distributed under the terms
 * of the Apache License 2.0.  The full license can be found in the LICENSE
 * file.
 *
 */

describe.skip("row_mouse_selection.html", () => {
    const selectedRows = async () => {
        const selectedCells = await page.$$("regular-table tbody tr th.mouse-selected-row");
        const selectedValues = [];
        for (const td of selectedCells) {
            selectedValues.push(await page.evaluate((td) => td.innerHTML, td));
        }
        return selectedValues;
    };

    beforeAll(async () => {
        await page.setViewport({width: 2500, height: 2500});
        await page.goto("http://localhost:8081/dist/examples/row_mouse_selection.html");
        await page.waitFor("regular-table table tbody tr td");
    });

    describe("splitting a row range", () => {
        test("selects the rows' headers and cells", async () => {
            const rowHeader1 = await page.$("regular-table tbody tr:nth-of-type(2) th");
            await page.evaluate(async (th) => {
                const event = new MouseEvent("click", {bubbles: true});
                th.dispatchEvent(event);
            }, rowHeader1);

            const rowHeader3 = await page.$("regular-table tbody tr:nth-of-type(4) th");
            await page.evaluate(async (th) => {
                const event = new MouseEvent("click", {bubbles: true, shiftKey: true});
                th.dispatchEvent(event);
            }, rowHeader3);

            const rowHeader2 = await page.$("regular-table tbody tr:nth-of-type(3) th");
            await page.evaluate(async (th) => {
                const event = new MouseEvent("click", {bubbles: true, ctrlKey: true});
                th.dispatchEvent(event);
            }, rowHeader2);

            await page.waitFor("regular-table td.mouse-selected-row");
            expect(await selectedRows()).toEqual(["Row 1", "Row 3"]);
        });
    });
});
