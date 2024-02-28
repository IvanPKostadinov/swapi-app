import React, { InputHTMLAttributes, forwardRef } from 'react';

import { SearchButton } from 'components/SearchButton';
import { CloseIcon } from 'components/Icons/Close';
import { SearchIcon } from 'components/Icons/Search';

interface FormInputFieldBase extends InputHTMLAttributes<HTMLInputElement> {}

type InputFieldText = FormInputFieldBase & { onClearText?: () => void };
type InputFieldRadio = Omit<FormInputFieldBase, 'type'> & {
  type: 'radio';
  label?: string;
  isSelected: boolean;
};

type FormInputFieldProps = InputFieldText | InputFieldRadio;

export const FormInputField = forwardRef(
  (props: FormInputFieldProps, ref: React.ForwardedRef<HTMLInputElement>): JSX.Element => {
    switch (props.type) {
      case 'radio':
        const { label, type, isSelected, ...radioInputProps } = props as InputFieldRadio;

        return (
          <div className='swapi-form-input-field__input-radio-container'>
            <input
              className='swapi-form-input-field__input-radio'
              type='radio'
              ref={ref}
              {...radioInputProps}
            />
            {label && (
              <label
                className={
                  isSelected
                    ? 'swapi-form-input-field__input-radio-label selected'
                    : 'swapi-form-input-field__input-radio-label'
                }
                htmlFor={props.id}
              >
                {label}
              </label>
            )}
          </div>
        );
      default:
        const { onClearText, ...textInputProps } = props as InputFieldText;

        return (
          <div className='swapi-form-input-field__input-text-container'>
            <input className='swapi-form-input-field__input-text' ref={ref} {...textInputProps} />
            <div className='swapi-form-input-field__buttons-container'>
              {onClearText && (
                <button
                  className='swapi-form-input-field__input-text-button-clear'
                  type='button'
                  onClick={onClearText}
                >
                  <CloseIcon />
                </button>
              )}
              <SearchButton type='submit' icon={<SearchIcon />} />
            </div>
          </div>
        );
    }
  }
);
