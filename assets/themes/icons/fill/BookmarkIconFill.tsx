import * as React from 'react'
import { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'

const BookmarkIconFill = (props: SvgProps) => {
  return (
    <SvgWraper {...props}>
      <G clipPath="url(#a)" fill={props.color || '#959595'}>
        <Path
          d="M2.091 12.275a1.476 1.476 0 0 0 1.633-.322l2.943-2.926 2.942 2.926a1.478 1.478 0 0 0 1.635.322 1.477 1.477 0 0 0 .923-1.386V3a2.503 2.503 0 0 0-2.5-2.5h-6a2.503 2.503 0 0 0-2.5 2.5v7.89a1.477 1.477 0 0 0 .924 1.385Z"
          fill={props.color || '#00A3FF'}
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M.667.5h12v12h-12z" />
        </ClipPath>
      </Defs>
    </SvgWraper>
  )
}
export default BookmarkIconFill
