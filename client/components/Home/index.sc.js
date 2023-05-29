import styled from '@emotion/styled';
import s from '../../shared/variables.sc';

const Container = styled.div`
  padding-bottom: 3em;
  flex: 1;
  /* a:first-of-type{
    div {
      border-top-left-radius: 0.25em;
      border-top-right-radius: 0.25em;
    }
  } */

  a:last-of-type{
    div {
      border-bottom-left-radius: 0.25em;
      border-bottom-right-radius: 0.25em;
    }
  }


  @media ${s.mdDown}{
    margin: 1em 1em 0em 1em;
  }
  
`;


const HomeContainer = styled.div`
  max-width: 1000px;
  margin: 1em auto 0;
  display: flex;
  justify-content: center;
  

  
  @media ${s.mdDown}{
    max-width: 100% !important;
    flex-direction: column;
    margin-top: 1em;
  }
`;

const Empty = styled(Container)`
  min-width: 700px;
  height: 100%;
  font-family: "Fakt Pro Normal";
  display: flex;
  justify-content: center;
  padding: 1em 0;
  color: #666;
  font-size: 18px;


  @media ${s.mdDown}{
    min-width: initial;
    max-width: 100% !important;
  }
`


export {
  Container,
  HomeContainer,
  Empty
}