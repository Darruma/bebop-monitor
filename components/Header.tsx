import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Events = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: 1rem;
    margin-left: 1rem;
    width: 100%;
`
const HeaderWrapper = styled.div`
    height: 4rem;
    width: 100%;
    display: flex;
    font-size: 25px;
    flex-direction: row;
    margin: 0 auto;
    background-color: #202033;
    align-items: center;
    color: white;
`
const LinkWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`
const TitleWrapper = styled.div`
    margin: 20px
`

function Nav({ name, path }: { name: string, path: string }) {
    const router = useRouter()
    const currentRoute = router.pathname
    const linkStyle = {
        textDecoration: currentRoute == path ? 'underline' : 'none',
        padding: "20px"
    }
    return (
        <Link href={path} passHref>
            <a style={linkStyle}>
                {name}
            </a>
        </Link>
    )
}

function Header({ children }) {
    return (
        <>
            <HeaderWrapper>
                <TitleWrapper>
                    <h3>
                        Bebop
                    </h3>
                </TitleWrapper>
                <LinkWrapper>
                    <Events>
                        <Nav name="Orders" path="/orders" />
                        <Nav name="Users" path="/users" />
                    </Events>
                </LinkWrapper>

            </HeaderWrapper>
            {children}
        </>
    )

}
export default Header