import Link from "next/link"
import Logo from "../../assets/Logo"
import { HeaderContainer } from "./styled"

export const Header = () => {
    return (
        <HeaderContainer>
            <Link href="/" >
                <Logo />
            </Link>
        </HeaderContainer>
    )
}