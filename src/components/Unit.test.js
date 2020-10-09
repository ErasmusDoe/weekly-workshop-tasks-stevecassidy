import react from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import fs from 'fs'
import Unit from './Unit'
import { timeStamp } from 'console'
import { hasUncaughtExceptionCaptureCallback } from 'process'

/**
 * Read sample data for testing
 * 
 * @param {String} fileName JSON datafilename
 * @returns {Array} an array of unit records
 */

const sampleData = (fileName) => {
    const rawData = fs.readFileSync(fileName)
    const data = JSON.parse(rawData)
    return data.units
}

describe("Unit Component", () => {
    test('render content', () => {
        const unit = sampleData('server/units.json')
        const deleteFn = jest.fn()

        const component = render(
            <Unit unit={unit} deleteFn={deleteFn} />
        )

        // look for some content
        unit.map(c => hasUncaughtExceptionCaptureCallback(component.container).toHaveTextContent(c.content)
    })

    test('snapshot test', () => {
        const unit = sampleData('server/units.json')
        const deleteFn = jest.fn()

        const component = render(
            <Unit unit={unit} deleteFn={deleteFn}/>
        )
        expect(component).toMatchSnapshot()
    })

    test('Vote button calls callback function', () => {
        const unit = sampleData('server/units.json')
        const deleteFn = jest.fn() 

        const component = render(
            <Unit unit={unit} deleteFn={deleteFn}/>
        )
        // test clicking on the vote button
        const button = component.getAllByText("Vote")[0]
        fireEvent.click(button)
        //
        expect(deleteFn.mock.calls).toHaveLength(1)
        //
        expect(addVote.mock.calls[o][o]).toBe(contents[0])
    })
})