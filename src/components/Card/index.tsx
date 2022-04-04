import styled from 'styled-components'

const Card = styled.div<any>`
  width: 100%;
  border-radius: 16px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`
export default Card

export const LightCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.invertedContrast};
  background-color: ${({ theme }) => theme.colors.invertedContrast};

  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`

export const GreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.tertiary};
`
