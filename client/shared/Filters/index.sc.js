import styled from '@emotion/styled';
import s from '../../shared/variables.sc';


const AppliedFilters = styled.div`
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  border-top-left-radius: 0.25em;
  border-top-right-radius: 0.25em;
  
  @media ${s.lgDown}{
    box-shadow: none;
  }
`;


const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;

  &:nth-of-type(2){
    padding-top: 0;
  }

  @media ${s.mdDown}{
    padding-left: 0;
    flex-direction: column;
    align-items: flex-start;
  }
  
`;

const FiltersContainer = styled.div`
  display: ${props => props.type === 'all' ? 'block' : 'none'};

  @media ${s.mdDown}{
    display: ${props => props.type === 'options' ? 'block' : 'none'};
  }
`;

const FilterTitle = styled.div`
  font-family: 'Fakt Pro Normal';
  color: #666;
  font-size: 14px;
  margin-right: 1em;
  white-space: nowrap;
`;



export { AppliedFilters, FilterContainer, FiltersContainer, FilterTitle };