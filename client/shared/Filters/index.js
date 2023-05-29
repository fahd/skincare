import React, { useContext } from 'react';
import { ProductTags } from '../index';

import {
  AppliedFilters,
  FilterContainer,
  FiltersContainer,
  FilterTitle
} from './index.sc';

import { OptionsContext } from '../../context/optionsContext';

const Filters = ({type}) => {
  const { selectedBrands, selectedActions, updateSelectBrands, updateSelectActions, onRemove } = useContext(OptionsContext);
  const hasBrandFilter = Object.keys(selectedBrands).length > 0;
  const hasActionsFilter = Object.keys(selectedActions).length > 0;

  return (
    <FiltersContainer type={type}>
      <AppliedFilters>
        {hasBrandFilter && (
          <FilterContainer>
            <FilterTitle>Filtering By Brand:</FilterTitle>
            <ProductTags
              type='options_brands'
              onRemove={onRemove}
              tags={selectedBrands}
            />
          </FilterContainer>)
        }

        {hasActionsFilter && (
          <FilterContainer>
            <FilterTitle>Filtering By Usage:</FilterTitle>
            <ProductTags
              type='options_actions'
              onRemove={onRemove}
              tags={selectedActions}
            />
          </FilterContainer>)
        }
        </AppliedFilters>
    </FiltersContainer>
  )
}

export { Filters }
