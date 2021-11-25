import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from "@testing-library/react"
import InputForm from "./InputForm"

describe("<InputForm /> test suite", () => {
    // setting appropriate props and rendering component
    let component, setErrorMessage, setOutputStr, input, form
    beforeEach(() => {
        setErrorMessage = jest.fn()
        setOutputStr = jest.fn()

        component = render(
            <InputForm setErrorMessage={setErrorMessage} setOutputStr={setOutputStr}/>
        )

        input = component.container.querySelector('input')
        form = component.container.querySelector('form')
    })
    
    test('<InputForm /> calls appropriate setter function and updates with correct value for valid input', () => {

        fireEvent.change(input, {
            target: {
                value: '12.34' // valid input
            }
        })
        fireEvent.submit(form)
    
        expect(setOutputStr.mock.calls).toHaveLength(1) // called exactly once for valid input
        expect(setOutputStr.mock.calls[0][0]).toBe("Twelve Dollars and Thirty Four Cents")
    
        expect(setErrorMessage.mock.calls).toHaveLength(0) // set error msg function not called
    })

    test('<InputForm /> calls appropriate setter function and updates with correct value for invalid input', () => {

        fireEvent.change(input, {
            target: {
                value: '12.3421' // valid input
            }
        })
        fireEvent.submit(form)
    
        expect(setOutputStr.mock.calls).toHaveLength(1) // called for the correct input (the string truncated to 2 dp)
        expect(setOutputStr.mock.calls[0][0]).toBe("Twelve Dollars and Thirty Four Cents")
    
        expect(setErrorMessage.mock.calls).toHaveLength(1) // called exactly once
    })

    test("if user enters non-numeric value, the set output str handler ISN'T CALLED, and error message should be displayed (meaning this function is called once)", () => {
        fireEvent.change(input, {
            target: {
                value: 'random' // valid input
            }
        })
        fireEvent.submit(form)
    
        expect(setOutputStr.mock.calls).toHaveLength(0)
    
        expect(setErrorMessage.mock.calls).toHaveLength(1) // called exactly once to display error msg
    })

    test("whitespaces are trimmed from both sides of the input", () => {
        fireEvent.change(input, {
            target: {
                value: '    1.2 ' // valid input
            }
        })
        fireEvent.submit(form)
    
        expect(setOutputStr.mock.calls).toHaveLength(1) // called to set output str to empty string
        expect(setOutputStr.mock.calls[0][0]).toBe("One Dollar and Twenty Cents")
    })
    describe("numeric edge cases", () => {
        test("0.0 or the likes (0.00, 0.000), receives empty string as output", () => {
            fireEvent.change(input, {
                target: {
                    value: '0.0'
                }
            })
            fireEvent.submit(form)
        
            expect(setOutputStr.mock.calls).toHaveLength(1) // called to set output str to empty string
            expect(setOutputStr.mock.calls[0][0]).toBe("")

            // there should be no error message
            expect(setErrorMessage.mock.calls).toHaveLength(0)
        })

        test("negative input (illegal) doesn't call the handler", () => {
            fireEvent.change(input, {
                target: {
                    value: '-9.0'
                }
            })
            fireEvent.submit(form)
        
            expect(setOutputStr.mock.calls).toHaveLength(0)

            // there should be an error message warning user of the invalid input
            expect(setErrorMessage.mock.calls).toHaveLength(1)
        })

        test("Whole dollars (such as 6.0) does not return 0 cents", () => {
            fireEvent.change(input, {
                target: {
                    value: '6.0'
                }
            })
            fireEvent.submit(form)
        
            expect(setOutputStr.mock.calls).toHaveLength(1) // called to set output str to empty string
            expect(setOutputStr.mock.calls[0][0]).toBe("Six Dollars")

            expect(setErrorMessage.mock.calls).toHaveLength(0)
        })

        test("Whole dollars (such as 6) does not return 0 cents", () => {
            fireEvent.change(input, {
                target: {
                    value: '6'
                }
            })
            fireEvent.submit(form)
        
            expect(setOutputStr.mock.calls).toHaveLength(1) // called to set output str to empty string
            expect(setOutputStr.mock.calls[0][0]).toBe("Six Dollars")

            expect(setErrorMessage.mock.calls).toHaveLength(0)
        })

        test("Something like .5 returns no dollars", () => {
            fireEvent.change(input, {
                target: {
                    value: '.3'
                }
            })
            fireEvent.submit(form)
        
            expect(setOutputStr.mock.calls).toHaveLength(1) // called to set output str to empty string
            expect(setOutputStr.mock.calls[0][0]).toBe("Thirty Cents")

            expect(setErrorMessage.mock.calls).toHaveLength(0)
        })

        test("all commas are replaced by empty string, stripped from string", () => {
            fireEvent.change(input, {
                target: {
                    value: '17,22,3'
                }
            })
            fireEvent.submit(form)
        
            expect(setOutputStr.mock.calls).toHaveLength(1) // called to set output str to empty string
            expect(setOutputStr.mock.calls[0][0]).toBe("Seventeen thousand Two hundred Twenty Three Dollars")

            expect(setErrorMessage.mock.calls).toHaveLength(0)
        })

        test("if there are multiple dots, the error handler is called", () => {
            fireEvent.change(input, {
                target: {
                    value: '17.22.3'
                }
            })
            fireEvent.submit(form)
        
            expect(setOutputStr.mock.calls).toHaveLength(0) // this handler is not called on this invalid input

            expect(setErrorMessage.mock.calls).toHaveLength(1)
            expect(setErrorMessage.mock.calls[0][0]).toBe('Input has to have valid dollars and cents format')
        })
    })
})


