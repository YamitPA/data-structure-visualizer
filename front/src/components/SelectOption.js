import React from 'react';

const SelectOption = ({ label, options, value, onChange }) => {
    return (
        <section>
            <h2>{label}</h2>
            <select value={value} onChange={onChange}>
                <option value="">-- Select {label.toLowerCase()} --</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </section>
    );
};

export default SelectOption;
