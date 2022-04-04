import React from 'react'
import styled from 'styled-components'
import { Card } from '@pancakeswap-libs/uikit'

export const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 500px;
  width: 100%;
  background-color: RGBA(255,255,255,1);
  border-radius: 4px;
  box-shadow: 4px 4px 24px RGBA(0,0,0,0.12);
  padding: 16px;
  backdrop-filter: blur(30px);
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
