import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const PhoneRingOutline = (props: SvgProps) => (
  <SvgWraper {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M6.5.5A.5.5 0 0 1 7 0a5.006 5.006 0 0 1 5 5 .5.5 0 1 1-1 0 4.004 4.004 0 0 0-4-4 .5.5 0 0 1-.5-.5ZM7 3a2 2 0 0 1 2 2 .5.5 0 0 0 1 0 3.003 3.003 0 0 0-3-3 .5.5 0 0 0 0 1Zm4.546 5.37a1.55 1.55 0 0 1 0 2.188l-.455.525C6.996 15.003-2.969 5.04.891.933l.575-.5a1.54 1.54 0 0 1 2.164.02c.015.015.942 1.219.942 1.219a1.55 1.55 0 0 1-.004 2.14l-.579.729a6.39 6.39 0 0 0 3.466 3.472l.732-.582a1.55 1.55 0 0 1 2.14-.003s1.204.926 1.22.941Zm-.688.726s-1.196-.92-1.212-.936a.55.55 0 0 0-.774 0c-.014.014-1.022.818-1.022.818a.5.5 0 0 1-.49.076A7.504 7.504 0 0 1 2.95 4.65a.5.5 0 0 1 .072-.5s.804-1.01.817-1.022a.55.55 0 0 0 0-.775c-.015-.015-.936-1.212-.936-1.212a.55.55 0 0 0-.755.02l-.575.5c-2.82 3.391 5.815 11.548 8.787 8.739l.456-.525a.56.56 0 0 0 .042-.779Z"
        fill={props.color || '#959595'}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h12v12H0z" />
      </ClipPath>
    </Defs>
  </SvgWraper>
)
export default PhoneRingOutline
