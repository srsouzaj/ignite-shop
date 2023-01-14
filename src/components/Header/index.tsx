import Link from "next/link"
import Logo from "../../assets/Logo"
import { Cart } from "../Cart"
import { HeaderContainer } from "./styled"

export const Header = () => {
    return (
        <HeaderContainer>
            <Link href="/" >
                <Logo />
            </Link>
            <Cart />
        </HeaderContainer>
    )
}