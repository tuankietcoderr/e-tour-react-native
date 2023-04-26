import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const CameraIcon = (props: SvgProps) => (
    <SvgWraper {...props}>
        <G clipPath="url(#a)" fill={props.color || '#959595'}>
            <Path d="M32.958 6.833h-.867l-3.732-4.838A5.164 5.164 0 0 0 24.3 0h-6.6a5.165 5.165 0 0 0-4.06 1.995L9.91 6.833h-.868A8.552 8.552 0 0 0 .5 15.375v17.083A8.552 8.552 0 0 0 9.042 41h23.916a8.552 8.552 0 0 0 8.542-8.542V15.375a8.552 8.552 0 0 0-8.542-8.542Zm-16.611-2.75a1.719 1.719 0 0 1 1.352-.666H24.3a1.722 1.722 0 0 1 1.354.666l2.121 2.75h-13.55l2.121-2.75Zm21.736 28.375a5.125 5.125 0 0 1-5.125 5.125H9.042a5.125 5.125 0 0 1-5.125-5.125V15.375a5.125 5.125 0 0 1 5.125-5.125h23.916a5.125 5.125 0 0 1 5.125 5.125v17.083Z" />
            <Path d="M21 13.666a10.25 10.25 0 1 0 10.25 10.25A10.26 10.26 0 0 0 21 13.666Zm0 17.084a6.833 6.833 0 1 1 0-13.666 6.833 6.833 0 0 1 0 13.666Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M.5 0h41v41H.5z" />
            </ClipPath>
        </Defs>
    </SvgWraper>
)
export default CameraIcon
