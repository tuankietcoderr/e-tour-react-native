import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const HeadphoneIcon = (props: SvgProps) => (
    <SvgWraper {...props}>
        <Path
            d="M17.5 10.353V9.166a7.5 7.5 0 0 0-15 0v1.187a4.167 4.167 0 0 0 1.666 7.98 1.667 1.667 0 0 0 1.667-1.667v-5A1.667 1.667 0 0 0 4.166 10v-.834a5.833 5.833 0 1 1 11.667 0V10a1.666 1.666 0 0 0-1.667 1.666v5h-2.5a.833.833 0 1 0 0 1.667h4.167a4.167 4.167 0 0 0 1.667-7.98ZM4.166 16.666a2.5 2.5 0 0 1 0-5v5Zm11.667 0v-5a2.5 2.5 0 0 1 0 5Z"
            fill={props.color || '#959595'}
        />
    </SvgWraper>
)
export default HeadphoneIcon
