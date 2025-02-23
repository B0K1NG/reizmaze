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

const StatusSingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
        Status filter
    </components.SingleValue>
);

const GenresControl = ({ children, ...props }) => (
    <components.Control {...props}>
        <span className='genres'>
        Genres filter ({props.getValue().length})
        </span>
        {children}
    </components.Control>
) 

const GenresMultiValue = () => null;
const NoIndicator = () => null;
const NoSeparator = () => null;
const NoClear = () => null;

export { CheckboxOption, RadioOption, StatusSingleValue, GenresControl, GenresMultiValue, NoIndicator, NoSeparator, NoClear };