import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link } from '@reach/router';
import _ from 'lodash';
import { Query } from 'react-apollo'
import { OptionsContext } from '../../context/optionsContext.js';
import { brands, products } from '../../queries'
import {
  Container,
  Title,
  Subtitle,
  SubtitleBrands,
  CheckBox,
  NestedCheckBox,
  NestedCheckBoxContainer,
  Choice,
  ChoiceTitle,
  ChoicesContainer,
  ShowAll,
  CheckBoxContainer,
  OptionsSearchContainer,
  TagContainer,
  NestedTagsContainer,
  FilterContainer
} from './index.sc.js';

import {
  Search,
  Filters
} from '../';

const Choices = ({ choices,showAll, updateSelectActions, selectedActions, onShowAllChoices, onUpdateFilter}) => {

  const onSelect = (choice) => {

    if (!showAll) {
      // see filtered products starting from the top
      const optionsElement = document.getElementById('home');
      optionsElement.scrollIntoView({ block: "start", behavior: 'smooth' });
    }
    
    onShowAllChoices('all');

    const updatedActions = Object.assign({}, selectedActions);
    if (updatedActions.hasOwnProperty(choice.tagid)) delete updatedActions[choice.tagid];
    else updatedActions[choice.tagid] = {
      nestedTags: {},
      tagInfo: {
        tagid: choice.tagid,
        name: choice.tagtype
      }
    }
    
    updateSelectActions(updatedActions);
    onUpdateFilter()
  }

  const onSelectNestedTag = (nestedTag, tagid) => {
    const updatedActions = Object.assign({}, selectedActions);
    const nestedTags = updatedActions[tagid].nestedTags;
    nestedTag.parent = tagid;

    if (nestedTags.hasOwnProperty(nestedTag.nestedtagid)) delete nestedTags[nestedTag.nestedtagid];
    else nestedTags[nestedTag.nestedtagid] = nestedTag;

    updateSelectActions(updatedActions);
    onUpdateFilter();
  }

  const renderNestedTags = (choice) => {
    return (
      <NestedTagsContainer>
        {_.map(choice.nestedTags, nestedTag => {
          let checked = selectedActions[choice.tagid].nestedTags.hasOwnProperty(nestedTag.nestedtagid);

          return (
            <Choice key={nestedTag.nestedtagid} onClick={onSelectNestedTag.bind(null,nestedTag, choice.tagid)} >
              <NestedCheckBoxContainer>
                <NestedCheckBox
                  readOnly
                  type='checkbox'
                  checked={checked}
                />
              </NestedCheckBoxContainer>
              <ChoiceTitle>{nestedTag.tagtype}</ChoiceTitle>
            </Choice>
          )
        })}
      </NestedTagsContainer>
    )
  }

  const renderChoices = (all) => {
    const allChoices = showAll ? choices : choices.slice(0, 10);
    return _.map(allChoices, choice => {
      const isChecked = selectedActions.hasOwnProperty(choice.tagid);
      
      return (
        <TagContainer key={choice.tagid}>
            <Choice onClick={onSelect.bind(null, choice)} >
              <CheckBoxContainer>
                <CheckBox
                  readOnly
                  type='checkbox'
                  checked={isChecked}
                />
              </CheckBoxContainer>
              <ChoiceTitle>{choice.tagtype}</ChoiceTitle>
            </Choice>
          {isChecked && renderNestedTags(choice)}
          </TagContainer>
        )
    })
  }
  
  return (
    <div>
      <ChoicesContainer>
        {renderChoices()}
      </ChoicesContainer>

      {showAll !== 'all' && (
        <ShowAll
          onClick={() => {
            // see filtered products starting from the top
            const optionsElement = document.getElementById('home');
            optionsElement.scrollIntoView({ block: "start", behavior: 'smooth' });
            onShowAllChoices(!showAll)
          }
          }>{!showAll ? 'See more filters' : 'See less'}
        </ShowAll>
      )}
      </div>
  )

}

const Options = () => {
  const { selectedBrands, selectedActions, updateSelectBrands, updateSelectActions, onUpdateFilter } = useContext(OptionsContext);
  const [showAll, onShowAll] = useState(false);

  const onShowAllChoices = (type) => {
    onShowAll(type);
  }
  
  return (
    <Container id='options' showAll={showAll}>
      <Filters type='options'/>
      <OptionsSearchContainer>
        <FilterContainer>
          <Title>Filter By Brand:</Title>
          <Search
            id='options-search'
            fullWidth
            type='brands'
            placeholder="Search Brands..."
            options={{
              onShowAllChoices,
              selectedBrands,
              selectedActions,
              updateSelectBrands,
              updateSelectActions,
              onUpdateFilter
            }}
            gqlQueries={{
              allBrands: brands.GET_ALL_BRANDS,
              searchBrands: brands.SEARCH_BRANDS,
            }}
          />
          
            <SubtitleBrands><Link to='/brands'>or <span>see all brands</span></Link></SubtitleBrands>
        </FilterContainer>

        <FilterContainer>
          <Title>Filter By Usage:</Title>
          {/* <Subtitle>(click checkbox for more options)</Subtitle> */}
          <Query
            query={products.GET_ALL_ACTIONS}
            fetchPolicy='cache-and-network'
          >
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return `Error! ${error}`;
              const choices = data.getAllActions;


              return (
                <Choices
                  choices={choices}
                  showAll={showAll}
                  onShowAllChoices={onShowAllChoices}
                  updateSelectActions={updateSelectActions}
                  onUpdateFilter={onUpdateFilter}
                  selectedActions={selectedActions}
                />
              );
          }}
          </Query>
        </FilterContainer>
      </OptionsSearchContainer>
    </Container>
  )
}

export { Options };