import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const SearchIcon = (props: SvgProps) => (
    <SvgWraper {...props}>
        <G clipPath="url(#a)">
            <Path
                d="M11.853 11.647 8.87 8.662a5.008 5.008 0 1 0-.707.707l2.984 2.985a.5.5 0 0 0 .707-.707ZM5 9.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
                fill={props.color || '#959595'}
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 .5h12v12H0z" />
            </ClipPath>
        </Defs>
    </SvgWraper>
)
export default SearchIcon
