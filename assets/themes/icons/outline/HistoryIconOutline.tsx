import * as React from 'react'
import { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const HistoryIconOutline = (props: SvgProps) => (
    <SvgWraper {...props}>
        <G clipPath="url(#a)" fill={props.color || '#959595'}>
            <Path d="M11.833 6a.5.5 0 0 0-.5.5 5.017 5.017 0 1 1-1.45-3.51.43.43 0 0 1-.05.01h-1.5a.5.5 0 0 0 0 1h1.5a1.5 1.5 0 0 0 1.5-1.5V1a.5.5 0 0 0-1 0v1.033a5.997 5.997 0 1 0 2 4.467.5.5 0 0 0-.5-.5Z" />
            <Path d="M6.333 3.5a.5.5 0 0 0-.5.5v2.5a.5.5 0 0 0 .147.354l1.5 1.5a.5.5 0 0 0 .707-.707L6.834 6.292V4a.5.5 0 0 0-.5-.5Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M.333.5h12v12h-12z" />
            </ClipPath>
        </Defs>
    </SvgWraper>
)
export default HistoryIconOutline
