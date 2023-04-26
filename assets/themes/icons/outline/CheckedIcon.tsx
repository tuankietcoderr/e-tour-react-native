import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const CheckedIcon = (props: SvgProps) => (
  <SvgWraper {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M22.319 4.431 8.499 18.25a1.001 1.001 0 0 1-1.416 0L1.739 12.9a1 1 0 0 0-1.635.325 1 1 0 0 0 .218 1.092l5.346 5.345a3.008 3.008 0 0 0 4.25 0L23.736 5.847a.999.999 0 0 0-.325-1.634 1 1 0 0 0-1.092.218Z"
        fill={props.color || '#959595'}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </SvgWraper>
)
export default CheckedIcon
