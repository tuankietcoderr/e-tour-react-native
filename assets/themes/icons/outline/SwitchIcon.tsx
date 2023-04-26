import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const SwitchIcon = (props: SvgProps) => (
    <SvgWraper {...props}>
        <G clipPath="url(#a)" fill={props.color || '#959595'}>
            <Path d="M12.5 3.207a.85.85 0 0 0 .524.772 7.5 7.5 0 0 1 4.476 7.097 7.501 7.501 0 0 1-15-.243A7.5 7.5 0 0 1 6.976 3.98a.853.853 0 0 0 .524-.774.833.833 0 0 0-1.145-.774 9.167 9.167 0 1 0 7.292 0 .833.833 0 0 0-1.147.775Z" />
            <Path d="M10.834.833a.833.833 0 0 0-1.667 0v5a.833.833 0 1 0 1.667 0v-5Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h20v20H0z" />
            </ClipPath>
        </Defs>
    </SvgWraper>
)
export default SwitchIcon
