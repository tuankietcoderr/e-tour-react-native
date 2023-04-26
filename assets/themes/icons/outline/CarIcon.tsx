import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const CarIcon = (props: SvgProps) => (
  <SvgWraper {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M20.9 4.291a5.01 5.01 0 0 0-4.7-3.29H7.8a5.01 5.01 0 0 0-4.7 3.29L.4 11.718A6.664 6.664 0 0 0 0 14v1a4.98 4.98 0 0 0 2 3.978V21a3 3 0 0 0 6 0v-1h8v1a3 3 0 0 0 6 0v-2.022A4.98 4.98 0 0 0 24 15v-1a6.655 6.655 0 0 0-.4-2.28l-2.7-7.43Zm-15.918.684A3.009 3.009 0 0 1 7.8 3h8.4a3.01 3.01 0 0 1 2.82 1.975L21.208 11H2.79l2.19-6.025ZM6 21a1 1 0 0 1-2 0v-1.1c.329.067.664.1 1 .1h1v1Zm14 0a1 1 0 0 1-2 0v-1h1c.336 0 .67-.033 1-.1V21Zm2-6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-1c.004-.337.045-.672.12-1H4v1a1 1 0 0 0 2 0v-1h12v1a1 1 0 0 0 2 0v-1h1.879c.076.328.117.663.12 1v1Z"
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
export default CarIcon
