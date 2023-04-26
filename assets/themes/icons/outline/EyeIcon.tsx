import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const EyeIcon = (props: SvgProps) => (
    <SvgWraper {...props}>
        <G clipPath="url(#a)" fill={props.color || '#959595'}>
            <Path d="M23.27 9.419C21.72 6.893 18.193 2.655 12 2.655c-6.192 0-9.72 4.238-11.271 6.764a4.908 4.908 0 0 0 0 5.162c1.55 2.526 5.079 6.764 11.27 6.764 6.193 0 9.72-4.238 11.272-6.764a4.908 4.908 0 0 0 0-5.162Zm-1.704 4.115c-1.332 2.166-4.347 5.81-9.566 5.81-5.22 0-8.234-3.644-9.566-5.81a2.918 2.918 0 0 1 0-3.068C3.766 8.3 6.78 4.655 12 4.655s8.234 3.64 9.566 5.81a2.918 2.918 0 0 1 0 3.069Z" />
            <Path d="M12 7a5 5 0 1 0 5 5 5.006 5.006 0 0 0-5-5Zm0 8a3 3 0 1 1 0-6.001 3 3 0 0 1 0 6Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z" />
            </ClipPath>
        </Defs>
    </SvgWraper>
)
export default EyeIcon
