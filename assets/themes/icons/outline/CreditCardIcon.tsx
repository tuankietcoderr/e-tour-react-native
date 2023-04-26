import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
import SvgWraper from '../SvgWrapper'
const CreditCard = (props: SvgProps) => (
    <SvgWraper {...props}>
        <Path d="M4.583 14.167a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" fill="#A0A0A0" />
        <Path
            d="M15.833 2.5H4.167A4.172 4.172 0 0 0 0 6.667v6.666A4.172 4.172 0 0 0 4.167 17.5h11.666A4.172 4.172 0 0 0 20 13.333V6.667A4.172 4.172 0 0 0 15.833 2.5ZM4.167 4.167h11.666a2.5 2.5 0 0 1 2.5 2.5H1.667a2.5 2.5 0 0 1 2.5-2.5Zm11.666 11.666H4.167a2.5 2.5 0 0 1-2.5-2.5v-5h16.666v5a2.5 2.5 0 0 1-2.5 2.5Z"
            fill={props.color || '#959595'}
        />
    </SvgWraper>
)
export default CreditCard
