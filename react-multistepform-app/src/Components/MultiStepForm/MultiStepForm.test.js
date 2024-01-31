const { render } = require("@testing-library/react")
const { default: MultiStepForm } = require(".")

describe("Multi step form",()=>{
    it("renders multistepform without errors",()=>{
        render(<MultiStepForm />)
    })
})