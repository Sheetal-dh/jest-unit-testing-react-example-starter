import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from "./App";

describe('App Counter', ()=>{
    test('Counter Elements should be present', ()=>{
        render(<App/>);
        const incrementButton = screen.getByText(/Increment/i);
        const decrementButton = screen.getByText(/Decrement/i);
        const counterLabel = screen.getByText(/Counter:/i);
        const counterText = screen.getByTestId("counter-value");

        expect(incrementButton).toBeInTheDocument();
        expect(incrementButton).toBeEnabled();

        expect(decrementButton).toBeInTheDocument();
        expect(decrementButton).toBeDisabled();

        expect(counterLabel).toBeInTheDocument();
        expect(counterText).toHaveTextContent(0);
    })
    test('Increment increses value by 1', ()=>{
        render(<App/>);
        const incrementButton = screen.getByText(/Increment/i);
        const decrementButton = screen.getByText(/Decrement/i);
        const counterText = screen.getByTestId("counter-value");
        expect(counterText).toHaveTextContent(0);
        userEvent.click(incrementButton);
        expect(counterText).toHaveTextContent(1);
        expect(decrementButton).not.toBeDisabled();
    })
    test('Decrement decreses value by 1', ()=>{
        render(<App/>);
        const incrementButton = screen.getByText(/Increment/i);
        const decrementButton = screen.getByText(/Decrement/i);
        userEvent.click(incrementButton);
        const counterText = screen.getByTestId("counter-value");
        expect(counterText).toHaveTextContent(1);
        userEvent.click(decrementButton);
        expect(counterText).toHaveTextContent(0);
        expect(incrementButton).toBeEnabled();
        
    })
})

describe('App Todo List', ()=>{
    test('List From Component Render:', ()=>{
        render(<App/>);
        const ListItemInput = screen.getByLabelText(/Create List Item/i);
        const addItemButton = screen.getByTestId("add-item");

        expect(ListItemInput).toBeInTheDocument();
        expect(addItemButton).toBeInTheDocument();
        
    })

    test('User can add item to the page', ()=>{
            render(<App/>);
            const ListItemInput = screen.getByLabelText(/Create List Item/i);
            const addItemButton = screen.getByTestId("add-item");
    
            expect(ListItemInput).toHaveValue("");
            userEvent.type(ListItemInput,"hello");
            expect(ListItemInput).toHaveValue("hello");
            
            userEvent.click(addItemButton);
            expect(screen.getByText("hello")).toBeInTheDocument();
            expect(ListItemInput).toHaveValue("");
        })
    
})