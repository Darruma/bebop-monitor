import { useRouter } from "next/router"
import styled from "styled-components"
import { usePolledQuery } from "../../apollo/hooks"
import { LOAD_USER_DATA } from "../../apollo/queries"
import { Title } from "../../components/Events"
import { Orders } from "../../components/Orders"
import { Volumes } from "../../components/Volumes"
import { usePrices } from "../../context/prices"
import { UserType, UserQueryData } from "../../apollo/types"

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
    flex-direction: row;
    @media(max-width: 1400px) {
        flex-direction: column;
    }
    justify-content: center;
    margin: 0
    color: white;
`
const UserOrdersWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
`
const MakerOrdersWrapper = styled.div`
    margin: 1rem;
`

const TakerOrdersWrapper = styled.div`
    margin: 1rem;
`
const UserVolumesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
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
    const userAddress = addr ? addr[0] : ""
    const prices = usePrices()
    const  query = usePolledQuery(LOAD_USER_DATA, { addr: userAddress.toLowerCase() })
    const { data, loading }: {data: UserQueryData, loading: boolean} = query

    if (data && !data.user) {
        return (
            <div>
                <Title>
                    No data available
                </Title>
            </div>
        )
    }
    const hasMakerOrders = data && data.user.makerOrders.length > 0
    const hasTakerOrders = data && data.user.takerOrders.length > 0
    const hasMakerVolumes = data && data.user.makerTokenVolumes.length > 0
    const hasTakerVolumes = data && data.user.takerTokenVolumes.length > 0

    return (<div>
        <Title>
            User Analytics for {addr}
        </Title>
        <UserWrapper>
            <UserOrdersWrapper>
                {hasMakerOrders && <MakerOrdersWrapper>
                    <Title>
                        Maker Orders
                    </Title>
                    {data && <Orders orders={data.user.makerOrders} />}
                </MakerOrdersWrapper>}
                {hasTakerOrders && <TakerOrdersWrapper>
                    <Title>
                        Taker Orders
                    </Title>
                    {data && <Orders orders={data.user.takerOrders} />}
                </TakerOrdersWrapper>}
            </UserOrdersWrapper>
            <UserVolumesWrapper>
                {hasMakerVolumes && <MakerVolumesWrapper>
                    <Title>
                        Maker Volumes
                    </Title>
                    {data && <Volumes volumes={data.user.makerTokenVolumes} prices={prices} />}
                </MakerVolumesWrapper>}
                {hasTakerVolumes && <TakerVolumesWrapper>
                    <Title>
                        Taker Volumes
                    </Title>
                    {data && <Volumes volumes={data.user.takerTokenVolumes} prices={prices} />}

                </TakerVolumesWrapper>}
            </UserVolumesWrapper>
        </UserWrapper>
    </div>)
}
export default User