import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const AngleRightIcon = (props: SvgProps) => (
    <SvgWraper {...props}>
        <Path
            d="M12.833 8.233 9.008 4.408a.833.833 0 1 0-1.175 1.184l3.834 3.816a.834.834 0 0 1 0 1.184l-3.834 3.816a.834.834 0 0 0 1.175 1.184l3.825-3.825a2.5 2.5 0 0 0 0-3.534Z"
            fill={props.color || '#959595'}
        />
    </SvgWraper>
)
export default AngleRightIcon
