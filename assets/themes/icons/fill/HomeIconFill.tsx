import * as React from 'react'
import { ViewProps } from 'react-native'
import { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'

const HomeIcon = (props: SvgProps) => {
    return (
        <SvgWraper {...props}>
            <G clipPath="url(#a)" fill={props.color || '#959595'}>
                <Path d="M6.5 7.996a1.5 1.5 0 0 0-1.5 1.5v3h3v-3a1.5 1.5 0 0 0-1.5-1.5Z" />
                <Path d="M9 9.496v3h2a1.5 1.5 0 0 0 1.5-1.5v-4.56a1 1 0 0 0-.281-.696l-4.25-4.594a2 2 0 0 0-2.937 0L.791 5.738a1 1 0 0 0-.291.705v4.553a1.5 1.5 0 0 0 1.5 1.5h2v-3c.01-1.363 1.11-2.477 2.44-2.509 1.373-.033 2.55 1.1 2.56 2.51Z" />
                <Path d="M6.5 7.996a1.5 1.5 0 0 0-1.5 1.5v3h3v-3a1.5 1.5 0 0 0-1.5-1.5Z" />
            </G>
            <Defs>
                <ClipPath id="a">
                    <Path fill="#fff" d="M.5.5h12v12H.5z" />
                </ClipPath>
            </Defs>
        </SvgWraper>
    )
}
export default HomeIcon
