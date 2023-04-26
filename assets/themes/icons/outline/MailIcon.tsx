import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const MailIcon = (props: SvgProps) => (
  <SvgWraper {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M7.917.417H2.083A2.086 2.086 0 0 0 0 2.5v5a2.086 2.086 0 0 0 2.083 2.083h5.834A2.086 2.086 0 0 0 10 7.5v-5A2.086 2.086 0 0 0 7.917.417Zm-5.834.833h5.834a1.25 1.25 0 0 1 1.158.786l-3.19 3.191a1.253 1.253 0 0 1-1.77 0l-3.19-3.19a1.25 1.25 0 0 1 1.158-.787Zm5.834 7.5H2.083A1.25 1.25 0 0 1 .833 7.5V3.125l2.694 2.691a2.086 2.086 0 0 0 2.946 0l2.694-2.691V7.5a1.25 1.25 0 0 1-1.25 1.25Z"
        fill="#959595"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h10v10H0z" />
      </ClipPath>
    </Defs>
  </SvgWraper>
)
export default MailIcon
