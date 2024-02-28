import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Category } from 'utils/api';
import { FormInputField } from 'components/Form/FormInputField';
import { capitalizeString } from 'utils/helpers';

interface InputFields {
  type: Category;
  search: string;
}

interface SearchFormProps {
  initialType?: Category;
  initialSearch?: string;
  onSearch: (pathname: string, searchQuery?: string) => Promise<void>;
}

export const SearchForm = ({
  initialType,
  initialSearch,
  onSearch,
}: SearchFormProps): JSX.Element => {
  const { register, watch, handleSubmit, setValue, setFocus } = useForm<InputFields>({
    mode: 'onTouched',
    defaultValues: {
      type: initialType ?? Category.ALL,
      search: initialSearch ?? '',
    },
  });

  const watchType = watch('type');
  const watchSearch = watch('search');

  useEffect(() => {
    setFocus('search');
  }, [setFocus, watchType]);

  const handleFormSubmit: SubmitHandler<InputFields> = ({ type, search }): void => {
    onSearch(`/${type}`, search);
  };

  const handleClearSearch = (): void => {
    setValue('search', '');
    setFocus('search');
  };

  return (
    <form className='swapi-search-form' onSubmit={handleSubmit(handleFormSubmit)}>
      <div className='swapi-search-form__container'>
        <div className='swapi-search-form__input-field-text-container'>
          <FormInputField
            {...register('search')}
            type='text'
            placeholder='Type or press Enter...'
            id='search'
            onClearText={watchSearch ? handleClearSearch : undefined}
          />
        </div>

        <ul className='swapi-search-form__input-fields-radio-container'>
          {Object.values(Category).map((category) => (
            <li key={category}>
              <FormInputField
                {...register('type')}
                type='radio'
                value={category}
                id={`type-${category}`}
                label={capitalizeString(category)}
                isSelected={watchType === category}
              />
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};
