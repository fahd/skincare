import styled from '@emotion/styled';
import s from '../../shared/variables.sc';


const Container = styled.div`
  background: white;
  padding: 20px;
  margin-right: 1em;
  /* min-width: 250px; */
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  border-radius: 0.25em;
  /* flex: 1; */
  min-width: 250px;
  align-self: flex-start;
  ${props => !props.showAll && (`
    position: sticky;
    top: 5.5em;
    position: -webkit-sticky;
  `)}

  @media ${s.lgDown}{
    max-width: 250px;
  }

  @media ${s.mdDown}{
    max-width: 100%;
    margin: 0 1em;
    position: relative;
    top: 0;
  }
  -webkit-animation: fadein 0.5s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 0.5s; /* Firefox < 16 */
  -ms-animation: fadein 0.5s; /* Internet Explorer */
  -o-animation: fadein 0.5s; /* Opera < 12.1 */
  animation: fadein 0.5s;
`;

const Title = styled.div`
  font-family: 'Fakt Pro Normal';
  color: #665;
  margin: 0.5em 0;

`

const Choice = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
 
`;


const CheckBox = styled.input`
    height: 25px;
    width: 25px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    border: 1px solid #d6d6d6;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    background-color: #fff;
`

const NestedCheckBox = styled(CheckBox)`
  height: 20px;
  width: 20px;
`;

const CheckBoxContainer = styled.span`
  
  input[type="checkbox"]:checked {   
    
    &:after {
        display: flex;
        align-items: center;
        justify-content: center;
        content: "✔";
        position: absolute;
        width: 25px;
        height: 25px;
        color:#5f50e9;
    }
  }
`

const NestedCheckBoxContainer = styled(CheckBoxContainer)`
  input[type="checkbox"]:checked {   
    &:after {
        width: 20px;
        height: 20px;
    }
  }
`

const ChoicesContainer = styled.div`
  @media ${s.lgDown}{
    display: flex;
    flex-wrap: wrap;
  }
`

const ChoiceTitle = styled.label`
  margin-left: 0.5em;
  font-family: 'Fakt Pro Normal';
  color: #666;
  cursor: pointer;


  @media ${s.smDown}{
    font-size: 14px;
  }
`;

const ShowAll = styled.div`
  margin-top: 0.5em;
  font-family: 'Fakt Pro Semibold';
  text-decoration: underline;
  cursor: pointer;
  color: #5f50e9;
`

const OptionsSearchContainer = styled.div`
  @media ${s.smDown}{
    #options-search {
      width: 100%;
    }
  }
`;

const NestedTagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1em;
`

const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;

  @media ${s.mdDown}{
    flex-basis: 30%;
  }

  @media ${s.smDown}{
    flex-basis: 40%;
  }
`;

const Subtitle = styled.div`
  font-family: 'Fakt Pro Normal';
  font-size: 14px;
  color: #969696;
  margin-top: -0.25em;
`

const SubtitleBrands = styled(Subtitle)`
  margin-top: 0.25em;
  cursor: pointer;

  a {
    color: #665 !important;
  }

  span {
    font-family: 'Fakt Pro Semibold';
    color: #5f50e9;
    text-decoration: underline;
  }
`;


const FilterContainer = styled.div`
  padding-bottom: 0.5em;
`
export {
  OptionsSearchContainer,
  Container,
  Title,
  Choice,
  ChoicesContainer,
  CheckBox,
  NestedCheckBox,
  NestedCheckBoxContainer,
  ChoiceTitle,
  ShowAll,
  CheckBoxContainer,
  NestedTagsContainer,
  TagContainer,
  Subtitle,
  SubtitleBrands,
  FilterContainer
}