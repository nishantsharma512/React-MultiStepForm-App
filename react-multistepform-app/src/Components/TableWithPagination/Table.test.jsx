import React from 'react';
import Topbar from './Topbar';
const { render, fireEvent, screen } = require("@testing-library/react")

describe("Table with pagination",()=>{
    it("textbox renders correctly",()=>{
        const handleSearchChangeMock = jest.fn();
        render(<Topbar searchText="" handleSearchChange={handleSearchChangeMock}/>)
        const searchTextBox=  screen.getByPlaceholderText(/Search Country Name/);
        fireEvent.change(searchTextBox,{target:{value:'India'}})
        // expect(handleSearchChangeMock).toHaveBeenCalledWith('India')
        expect(searchTextBox).toBeInTheDocument()
    })

    it("Should call function on change",()=>{
        const handleSearchChangeMock = jest.fn();
        render(<Topbar searchText="" handleSearchChange={handleSearchChangeMock}/>)
        const searchTextBox=  screen.getByPlaceholderText(/Search Country Name/i);
        fireEvent.change(searchTextBox,{target:{value:'India'}})
        expect(handleSearchChangeMock).toHaveBeenCalledTimes(1)
        
    })
})