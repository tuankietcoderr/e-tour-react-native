import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const ShieldIcon = (props: SvgProps) => (
  <SvgWraper {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M19.355 2.73 12.83.552a1.042 1.042 0 0 0-.658 0L5.644 2.73a5.2 5.2 0 0 0-3.56 4.941V13c0 7.878 9.583 12.23 9.993 12.41a1.043 1.043 0 0 0 .846 0c.41-.18 9.994-4.532 9.994-12.41V7.67a5.2 5.2 0 0 0-3.562-4.94ZM12.5 20.291a1.042 1.042 0 1 1 0-2.084 1.042 1.042 0 0 1 0 2.084Zm1.042-5.208a1.042 1.042 0 1 1-2.083 0V6.75a1.041 1.041 0 1 1 2.083 0v8.334Z"
        fill={props.color || '#FF3912'}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .5h25v25H0z" />
      </ClipPath>
    </Defs>
  </SvgWraper>
)
export default ShieldIcon
