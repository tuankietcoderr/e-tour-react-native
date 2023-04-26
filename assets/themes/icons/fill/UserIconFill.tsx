import * as React from 'react'
import { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const UserIcon = (props: SvgProps) => (
    <SvgWraper {...props}>
        <G clipPath="url(#a)" fill={props.color || '#959595'}>
            <Path d="M6.5 6.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 1A4.505 4.505 0 0 0 2 12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5 4.505 4.505 0 0 0-4.5-4.5Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M.5.5h12v12H.5z" />
            </ClipPath>
        </Defs>
    </SvgWraper>
)
export default UserIcon
