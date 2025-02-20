import React from 'react';
import { components } from 'react-select';


const CheckboxOption = (props) => {
    return (
        <components.Option {...props} className="checkbox-option">
            <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => null}
            />{' '}
            <label>{props.label}</label>
        </components.Option>
    );
};

const RadioOption = (props) => {
    return (
        <components.Option {...props} className="radio-option">
            <input
                type="radio"
                checked={props.isSelected}
                onChange={() => null}
            />{' '}
            <label>{props.label}</label>
        </components.Option>
    );
};

export { CheckboxOption, RadioOption };