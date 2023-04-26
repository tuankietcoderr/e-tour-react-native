import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const MoneyIcon = (props: SvgProps) => (
  <SvgWraper {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M7.917 8.334H2.083A2.086 2.086 0 0 1 0 6.25v-2.5a2.086 2.086 0 0 1 2.083-2.083h5.834A2.086 2.086 0 0 1 10 3.75v2.5a2.086 2.086 0 0 1-2.083 2.084ZM2.083 2.5a1.25 1.25 0 0 0-1.25 1.25v2.5a1.25 1.25 0 0 0 1.25 1.25h5.834a1.25 1.25 0 0 0 1.25-1.25v-2.5a1.25 1.25 0 0 0-1.25-1.25H2.083ZM5 6.667a1.667 1.667 0 1 1 0-3.333 1.667 1.667 0 0 1 0 3.333Zm0-2.5a.833.833 0 1 0 0 1.667.833.833 0 0 0 0-1.667Zm-2.917-.833a.417.417 0 1 0 0 .833.417.417 0 0 0 0-.833ZM7.5 3.75a.417.417 0 1 0 .833 0 .417.417 0 0 0-.833 0ZM2.083 5.834a.417.417 0 1 0 0 .833.417.417 0 0 0 0-.833ZM7.5 6.25a.417.417 0 1 0 .833 0 .417.417 0 0 0-.833 0Z"
        fill={props.color || '#959595'}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h10v10H0z" />
      </ClipPath>
    </Defs>
  </SvgWraper>
)
export default MoneyIcon
