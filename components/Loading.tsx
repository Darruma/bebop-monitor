import styled from "styled-components"

const LoadingContainer = styled.div`
    filter: blur(5px);
`

function Loading() {
    return <LoadingContainer>
        Loading Data
    </LoadingContainer>
}
export default Loading