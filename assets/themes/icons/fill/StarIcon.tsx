import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const StarIconFill = (props: SvgProps) => (
  <SvgWraper {...props}>
    <G clipPath="url(#a)">
      <Path
        d="m1.659 15.5 4.45 3.25-1.69 5.235a3.972 3.972 0 0 0 1.48 4.516 3.971 3.971 0 0 0 4.75-.024l4.35-3.203 4.353 3.2a4.033 4.033 0 0 0 6.229-4.49l-1.69-5.233 4.45-3.25a4.034 4.034 0 0 0-2.375-7.29H20.5L18.84 3.04a4.033 4.033 0 0 0-7.683 0L9.5 8.21H4.038a4.034 4.034 0 0 0-2.375 7.29H1.66Z"
        fill={props.color || '#FFCD29'}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h30v30H0z" />
      </ClipPath>
    </Defs>
  </SvgWraper>
)
export default StarIconFill
