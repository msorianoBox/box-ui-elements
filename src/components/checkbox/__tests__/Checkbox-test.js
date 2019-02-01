import React from 'react';
import sinon from 'sinon';

import Checkbox from '..';

describe('components/checkbox/Checkbox', () => {
    let wrapper;
    let onChange;

    beforeEach(() => {
        onChange = sinon.spy();
        wrapper = shallow(<Checkbox id="1" label="Check things" name="name" onChange={onChange} />);
    });

    test('should correctly render default component', () => {
        expect(wrapper.find('.checkbox-container').length).toBeTruthy();
        expect(wrapper.find('input').prop('id')).toEqual('1');
        expect(wrapper.find('input').prop('name')).toEqual('name');
        expect(wrapper.find('input').prop('type')).toEqual('checkbox');
        expect(
            wrapper
                .find('span')
                .at(0)
                .prop('className'),
        ).toEqual('checkbox-pointer-target');
        expect(wrapper.find('label').text()).toEqual('Check things');
        expect(wrapper.find('input').prop('checked')).toBeFalsy();
        expect(wrapper.find('.label').length).toBe(0);
    });

    test('should pass rest of props to input', () => {
        wrapper.setProps({
            'data-resin-target': 'checkthis',
        });

        expect(wrapper.find('input').prop('data-resin-target')).toEqual('checkthis');
    });

    test('should render tooltip when specified', () => {
        const tooltip = 'Help me';
        wrapper.setProps({ tooltip });

        const tooltipIcon = wrapper.find('CheckboxTooltip');
        expect(tooltipIcon.length).toBeTruthy();
        expect(tooltipIcon.prop('label').type).toEqual('label');
        expect(tooltipIcon.prop('tooltip')).toEqual(tooltip);
    });

    test('should render subsection when passed through props', () => {
        const subsection = <div className="123" />;
        wrapper.setProps({ subsection });

        expect(wrapper.find('.checkbox-subsection').length).toBe(1);
    });

    test('should be checked on when isChecked is true', () => {
        wrapper.setProps({ isChecked: true });
        expect(wrapper.find('input').prop('checked')).toBeTruthy();
    });

    test('should call onChange callback when onchange triggers', () => {
        const event = {
            target: {
                checked: true,
            },
        };
        wrapper.find('input').simulate('change', event);
        sinon.assert.calledWithMatch(onChange, event);
    });

    test('should render a hidden label when hideLabel is specified', () => {
        wrapper.setProps({ hideLabel: true });
        const label = wrapper.find('.accessibility-hidden');
        expect(label.length).toBeTruthy();
        expect(label.text()).toEqual('Check things');
    });

    test('should render field label when specified', () => {
        const fieldLabel = 'Label';
        wrapper.setProps({ fieldLabel });

        const label = wrapper.find('.label');
        expect(label.length).toBe(1);
        expect(label.contains(fieldLabel)).toBe(true);
    });
});