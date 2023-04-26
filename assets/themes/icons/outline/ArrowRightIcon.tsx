import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const ArrowRightIcon = (props: SvgProps) => (
    <Svg
        width={25}
        height={24}
        viewBox={props.viewBox || '0 0 25 24'}
        fill={props.fill || 'none'}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M18.5 12a2 2 0 0 0-.59-1.4l-4.29-4.3a1 1 0 1 0-1.41 1.42L15.5 11h-10a1 1 0 0 0 0 2h10l-3.29 3.29a1 1 0 0 0 1.41 1.42l4.29-4.3A2 2 0 0 0 18.5 12Z"
            fill={props.color || '#959595'}
        />
    </Svg>
)
export default ArrowRightIcon
