// import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";//, fireEvent 
import '@testing-library/jest-dom'
import Form from "../Form";


describe(Form, () => {
  it("to check rendering input and button ", () => {
    render(<Form />);

    expect(screen.getByTestId(/firstname/i)).toBeInTheDocument()
    expect(screen.getByTestId(/lastname/i)).toBeInTheDocument()
    expect(screen.getByTestId(/sex/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/วันเกิด/i)).toBeInTheDocument()
    expect(screen.getByTestId(/address/i)).toBeInTheDocument()
    expect(screen.getByTestId(/subdistrict/i)).toBeInTheDocument()
    expect(screen.getByTestId(/districts/i)).toBeInTheDocument()
    expect(screen.getByTestId(/province/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/บัตรประชาชนหมดอายุ/i)).toBeInTheDocument()
    expect(screen.getByTestId(/btn/i)).toBeInTheDocument()


  });



  it("to check all inputs are function", async () => {

    render(<Form />);

    const inputfirstname = screen.getByTestId(/firstname/i) as HTMLInputElement;
    const inputlastname = screen.getByTestId(/lastname/i) as HTMLInputElement;
    const inputsex = screen.getByTestId(/sex/i) as HTMLInputElement;
    const inputAddress = screen.getByTestId(/address/i) as HTMLInputElement;
    const inputSubDistrict = screen.getByTestId(/subdistrict/i) as HTMLInputElement;
    const inputDistrict = screen.getByTestId(/districts/i) as HTMLInputElement;
    const inputProvince = screen.getByTestId(/province/i) as HTMLInputElement;


    fireEvent.change(inputfirstname, { target: { value: 'ทวี' } });
    fireEvent.change(inputlastname, { target: { value: 'อาดัม' } });
    fireEvent.change(inputsex, { target: { value: 'male' } });
    fireEvent.change(inputAddress, { target: { value: '30/12' } });
    fireEvent.change(inputSubDistrict, { target: { value: 'วิชิต' } });
    fireEvent.change(inputDistrict, { target: { value: 'เมือง' } });
    fireEvent.change(inputProvince, { target: { value: 'ภูเก็ต' } });



    expect(inputfirstname.value).toBe('ทวี');
    expect(inputlastname.value).toBe('อาดัม');
    expect(inputsex.value).toBe('male');
    expect(inputAddress.value).toBe('30/12');
    expect(inputSubDistrict.value).toBe('วิชิต');
    expect(inputDistrict.value).toBe('เมือง');
    expect(inputProvince.value).toBe('ภูเก็ต');






  })
});
