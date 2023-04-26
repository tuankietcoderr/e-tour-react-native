import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const BellIcon = (props: SvgProps) => (
    <SvgWraper {...props}>
        <G clipPath="url(#a)">
            <Path
                d="m18.796 11.885-1.584-5.697a7.768 7.768 0 0 0-15.066.395L.921 12.096a4.167 4.167 0 0 0 4.067 5.07h.928a4.167 4.167 0 0 0 8.167 0h.698a4.166 4.166 0 0 0 4.015-5.281ZM10 18.833a2.5 2.5 0 0 1-2.347-1.666h4.693A2.5 2.5 0 0 1 10 18.833Zm6.771-4.32a2.48 2.48 0 0 1-1.99.987H4.988a2.499 2.499 0 0 1-2.44-3.043l1.225-5.513a6.1 6.1 0 0 1 11.833-.31l1.584 5.697a2.48 2.48 0 0 1-.419 2.181Z"
                fill={props.color || '#959595'}
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 .5h20v20H0z" />
            </ClipPath>
        </Defs>
    </SvgWraper>
)
export default BellIcon
