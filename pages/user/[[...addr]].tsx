import { useRouter } from "next/router"
import styled from "styled-components"
import { usePolledQuery } from "../../apollo/hooks"
import { LOAD_USER_DATA } from "../../apollo/queries"
import { ItemsWrapper, ItemWrapper, DataWrapper, DataText, TitleText, Title } from "../../components/Events"
import { Orders } from "../../components/Orders"
import { ETHERSCAN_URL } from "../../constants"

export const SearchContainer = styled.div`
    box-sizing: border-box;
    margin: 0 auto;
    min-width: 0px;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
    background-color: rgb(0, 0, 0);
    padding: 10px 16px;
    width: 500px;
    height: 38px;
    border-radius: 20px;
    z-index: 9999;
`
export const SearchInput = styled.input`
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    white-space: nowrap;
    background: none;
    border: none;
    width: 100%;
    font-size: 16px;
    outline: none;
    color: rgb(255, 255, 255);
`
export const UserWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0
    color: white;
`
const UserOrdersWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 70%;
    margin: 0 auto;
`
const MakerOrdersWrapper = styled.div`
    margin: 1rem;
`

const TakerOrdersWrapper = styled.div`
    margin: 1rem;
`
const UserVolumesWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-content: space-around;
    width: 70%;
    margin: 0 auto;
    margin-top: 1rem;
`

const MakerVolumesWrapper = styled.div`
    margin: 1rem;
`
const TakerVolumesWrapper = styled.div`
    margin: 1rem;

`

function User() {
    const router = useRouter()
    const { addr } = router.query
    const userAddress = addr ? addr[0]: ""
    const { data, loading, error } = usePolledQuery(LOAD_USER_DATA, { addr: userAddress.toLowerCase() })
    console.log(data)
    return (<UserWrapper>
        <Title>
            User Analytics for {addr}
        </Title>
        <UserOrdersWrapper>
            <MakerOrdersWrapper>
                <Title>
                    Maker Orders
                </Title>
            </MakerOrdersWrapper>
            <TakerOrdersWrapper>
                 <Title>
                    Taker Orders
                </Title>
            </TakerOrdersWrapper>

        </UserOrdersWrapper>

        <UserVolumesWrapper>
            <MakerVolumesWrapper>
            <Title>
                    Maker Volumes
                </Title>
            </MakerVolumesWrapper>
            <TakerVolumesWrapper>
                <Title>
                    Taker Volumes
                </Title>


            </TakerVolumesWrapper>

        </UserVolumesWrapper>


    </UserWrapper>)
}
export default User