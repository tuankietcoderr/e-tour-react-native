import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const FavoriteIconOutline = (props: SvgProps) => (
  <SvgWraper {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M10.208 1.118A3.733 3.733 0 0 0 7 3.043a3.733 3.733 0 0 0-3.208-1.925A3.967 3.967 0 0 0 0 5.23c0 2.653 2.792 5.55 5.133 7.514a2.901 2.901 0 0 0 3.734 0C11.208 10.78 14 7.883 14 5.23a3.966 3.966 0 0 0-3.792-4.112ZM8.117 11.85a1.734 1.734 0 0 1-2.234 0C2.886 9.335 1.167 6.923 1.167 5.23a2.8 2.8 0 0 1 2.625-2.946A2.8 2.8 0 0 1 6.417 5.23a.583.583 0 0 0 1.166 0 2.8 2.8 0 0 1 2.625-2.945 2.8 2.8 0 0 1 2.625 2.945c0 1.694-1.719 4.106-4.716 6.619v.002Z"
        fill={props.color || '#FF5656'}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h14v14H0z" />
      </ClipPath>
    </Defs>
  </SvgWraper>
)
export default FavoriteIconOutline
