import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const CalendarOutline = (props: SvgProps) => (
  <SvgWraper {...props}>
    <G clipPath="url(#a)" fill={props.color || '#959595'}>
      <Path d="M9.5 1H9V.5a.5.5 0 0 0-1 0V1H4V.5a.5.5 0 0 0-1 0V1h-.5A2.503 2.503 0 0 0 0 3.5v6A2.503 2.503 0 0 0 2.5 12h7A2.503 2.503 0 0 0 12 9.5v-6A2.503 2.503 0 0 0 9.5 1ZM1 3.5A1.5 1.5 0 0 1 2.5 2h7A1.5 1.5 0 0 1 11 3.5V4H1v-.5ZM9.5 11h-7A1.5 1.5 0 0 1 1 9.5V5h10v4.5A1.5 1.5 0 0 1 9.5 11Z" />
      <Path d="M6 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-2.5 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm5 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h12v12H0z" />
      </ClipPath>
    </Defs>
  </SvgWraper>
)
export default CalendarOutline
