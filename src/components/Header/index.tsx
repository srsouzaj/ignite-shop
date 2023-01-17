import Link from "next/link"
import { useRouter } from "next/router"
import Logo from "../../assets/Logo"
import { Cart } from "../Cart"
import { HeaderContainer } from "./styled"

export const Header = () => {
    const { pathname } = useRouter()

    return (
        <HeaderContainer>
            <Link href="/" >
                <Logo />
            </Link>
            {pathname !== "/sucess" && <Cart />}
        </HeaderContainer>
    )
}