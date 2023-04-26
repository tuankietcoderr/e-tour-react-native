import * as React from 'react'
import { ViewProps } from 'react-native'
import { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'

const HomeIconOutline = (props: SvgProps) => {
    return (
        <SvgWraper {...props}>
            <G clipPath="url(#a)">
                <Path
                    d="M12.06 5.034 8.268 1.241a2.504 2.504 0 0 0-3.536 0L.94 5.034a1.49 1.49 0 0 0-.44 1.06v4.91a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-4.91a1.489 1.489 0 0 0-.44-1.06ZM8 11.504H5V9.535a1.5 1.5 0 1 1 3 0v1.967Zm3.5-.5a.5.5 0 0 1-.5.5H9V9.535a2.5 2.5 0 1 0-5 0v1.967H2a.5.5 0 0 1-.5-.5V6.095a.5.5 0 0 1 .147-.354L5.439 1.95a1.504 1.504 0 0 1 2.122 0l3.793 3.793c.093.094.145.22.146.352v4.908Z"
                    fill={props.color || '#959595'}
                />
            </G>
            <Defs>
                <ClipPath id="a">
                    <Path fill="#fff" d="M.5.5h12v12H.5z" />
                </ClipPath>
            </Defs>
        </SvgWraper>
    )
}
export default HomeIconOutline
