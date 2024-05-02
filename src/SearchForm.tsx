import * as React from 'react';
// import CheckIcon from './check.svg?react';
// import GlassIcon from './simple_glass.svg?react';
import { CiSearch } from "react-icons/ci";
import { InputWithLabel } from './InputWithLabel';
import { StyledSearchForm, StyledButtonSmall } from './styles';

type SearchFormProps = {
    searchTerm: string;
    onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const SearchForm: React.FC<SearchFormProps> = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit,
}) => (
    <StyledSearchForm onSubmit={onSearchSubmit}>
        <InputWithLabel
            id="search"
            value={searchTerm}
            isFocused
            onInputChange={onSearchInput}
        >
            <strong>Search:</strong>
        </InputWithLabel>

        <StyledButtonSmall type="submit" disabled={!searchTerm}>
            <CiSearch />
        </StyledButtonSmall>
    </StyledSearchForm>
);
