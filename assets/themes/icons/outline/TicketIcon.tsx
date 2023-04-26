import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const TiketIcon = (props: SvgProps) => (
    <SvgWraper {...props}>
        <G clipPath="url(#a)" fill={props.color || '#959595'}>
            <Path d="M13.333 0h-.108a1.683 1.683 0 0 0-1.617 1.277 1.667 1.667 0 0 1-3.216 0A1.683 1.683 0 0 0 6.776 0h-.108A4.172 4.172 0 0 0 2.5 4.167V17.5A2.5 2.5 0 0 0 5 20h1.775a1.683 1.683 0 0 0 1.617-1.277 1.667 1.667 0 0 1 3.216 0A1.683 1.683 0 0 0 13.224 20H15a2.5 2.5 0 0 0 2.5-2.5V4.167A4.172 4.172 0 0 0 13.333 0ZM15 18.333l-1.786-.052a3.334 3.334 0 0 0-6.439.052H5a.834.834 0 0 1-.833-.833v-3.333h1.666a.833.833 0 1 0 0-1.667H4.167V4.167a2.5 2.5 0 0 1 2.5-2.5l.119.052A3.342 3.342 0 0 0 10 4.167a3.392 3.392 0 0 0 3.244-2.5h.09a2.5 2.5 0 0 1 2.5 2.5V12.5h-1.667a.833.833 0 0 0 0 1.667h1.666V17.5a.834.834 0 0 1-.833.833Z" />
            <Path d="M10.834 12.5H9.167a.833.833 0 1 0 0 1.667h1.667a.833.833 0 1 0 0-1.667Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h20v20H0z" />
            </ClipPath>
        </Defs>
    </SvgWraper>
)
export default TiketIcon
