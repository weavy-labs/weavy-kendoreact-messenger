import { Avatar } from "@progress/kendo-react-layout";

const Home = ({ user }) => {
    console.log(user)
    return (
        <div style={{padding:'2rem'}}>
            <div className="text-center">
                <Avatar shape="circle" type="image" size="large">
                    <img alt="" src={user.avatarUrl} />
                </Avatar>
                <h1>Welcome! </h1>
                <h2 style={{fontWeight:100}}>{user.name}... </h2>
                <h5>This is the Weavy Telerik Messenger</h5>

                <p style={{marginTop:'2rem'}}>Select a conversation in the left hand sidebar or create a new one to start communicating!</p>

            </div>
        </div>

    )
}

export default Home;