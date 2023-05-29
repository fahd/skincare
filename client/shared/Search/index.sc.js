import styled from '@emotion/styled';
import s from '../../shared/variables.sc';

const SearchBar = styled.input`
  width: ${props => props.fullWidth ? '100%' : '400px'};
  border-radius: 0.25em;
  font-size: 14px;
  border: 1px solid e8e8e8;
  padding: 0.75em;
  outline: none;
  border: 1px solid #d6d6d6;
  box-sizing: border-box;
  -webkit-appearance: none;

  &::placeholder {
    font-size: 14px;
    font-family: 'Fakt Pro Normal';
  }

  @media ${s.smDown}{
    max-width: 100%;
    width: initial;
  }
`;


const SearchBarContainer = styled.div`
  position: relative;
  width: ${props => props.fullWidth && '100%'};
`;

const SearchResultsContainer = styled.ul`
  position: absolute;
  top: 2em;
  width: 100%;
  background: white;
  border-radius: 0.25em;
  box-shadow:0 1px 5px 1px rgba(0,0,0,.1);
  list-style-type: none;
  padding: 0px;
  z-index: 1000;
  max-height: 400px;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */

  ${props => props.type === 'brands' && (`
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `
  )}
  
`

const SearchResult = styled.li`
  display: flex;
  cursor:pointer;
  align-items: center;
  padding: 0.5em 1em;
  background: ${props => props.selected ? 'red' : 'initial'};
  &:hover {
    background:#f5f5f5;
    transition: all 0.2s ease;
  }
`;

const SearchResultImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`

const SearchResultBrandImage = styled(SearchResultImage)`
  width: 50px;
  height: 50px;
  object-fit: contain;
`

const SearchResultText = styled.span`
  font-family: 'Fakt Pro Normal';
  font-size: 13px;
  color: #333;
  padding-left: 0.5em;
`

const ShowBrand = styled.span`
  font-family: 'Fakt Pro Semibold';
`;

const SearchResultInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const SearchResultBrand = styled(SearchResultText)`
  font-size: 10px;
  color: #666;
`

export {
  SearchBarContainer,
  SearchResultsContainer,
  SearchResult,
  SearchResultImage,
  SearchResultBrandImage,
  SearchResultText,
  SearchBar,
  ShowBrand,
  SearchResultInfo,
  SearchResultBrand
}