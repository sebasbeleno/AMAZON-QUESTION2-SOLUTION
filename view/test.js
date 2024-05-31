import {fireEvent, getByTestId} from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import jsdom, {JSDOM} from "jsdom"
import path from "path"

const BASE = path.resolve(__dirname, "../src")

let virtualConsole
let dom, body

describe("accordion test", function () {
    beforeEach(async () => {
        virtualConsole = new jsdom.VirtualConsole()
        virtualConsole.on("error", console.error)
        dom = await JSDOM.fromFile(`${BASE}/index.html`, {
            runScripts: "dangerously",
            resources: "usable",
            pretendToBeVisual: true,
            virtualConsole
        })
        await loadDom(dom)
        body = dom.window.document.body
    })

    it('shows the 1st item description expanded by default', async function () {
        const accordion1 = getByTestId(body, '1')
        const description1 = accordion1.querySelector('.description')
        expect(description1).toBeVisible()

        const ids = ['2', '3', '4', '5']
        for (const id of ids) {
            const accordion = getByTestId(body, id)
            const description = accordion.querySelector('.description')
            expect(description).not.toBeVisible()
        }
    })
})

function loadDom(dom) {
    return new Promise((resolve, _) => {
        virtualConsole.on("log", log => {
            if (log === "DOM Loaded") resolve(dom)
        })
    })
}