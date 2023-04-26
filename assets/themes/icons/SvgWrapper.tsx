import * as React from 'react'
import Svg, { SvgProps, NumberProp } from 'react-native-svg'
const SvgWraper: React.FC<SvgProps> = (props) => {
    const width: NumberProp = props?.width || 12
    const height: NumberProp = props?.height || 12
    const viewBox: string = props?.viewBox || '0 0 13 13'
    return (
        <Svg
            width={width}
            height={height}
            viewBox={viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {props.children}
        </Svg>
    )
}
export default SvgWraper
