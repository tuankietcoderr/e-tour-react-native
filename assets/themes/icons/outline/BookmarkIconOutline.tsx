import * as React from 'react'
import { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'

const BookmarkIconOutline = (props: SvgProps) => {
    return (
        <SvgWraper {...props}>
            <G clipPath="url(#a)">
                <Path
                    d="M10.735 12.5a1.401 1.401 0 0 1-.993-.418L6.667 9.025l-3.075 3.06a1.4 1.4 0 0 1-1.548.304 1.4 1.4 0 0 1-.877-1.312V3a2.5 2.5 0 0 1 2.5-2.5h6a2.5 2.5 0 0 1 2.5 2.5v8.077a1.4 1.4 0 0 1-.876 1.312 1.434 1.434 0 0 1-.556.111Zm-7.068-11a1.5 1.5 0 0 0-1.5 1.5v8.077a.421.421 0 0 0 .718.3l3.432-3.41a.5.5 0 0 1 .705 0l3.427 3.409a.422.422 0 0 0 .719-.3V3a1.5 1.5 0 0 0-1.5-1.5H3.667Z"
                    fill={props.color || '#959595'}
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
export default BookmarkIconOutline
