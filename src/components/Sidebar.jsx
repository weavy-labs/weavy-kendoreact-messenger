import { React } from 'react';
import { NavLink } from "react-router-dom";
import { ListView } from '@progress/kendo-react-listview';
import { Avatar } from "@progress/kendo-react-layout";

const Sidebar = (props) => {

    const conversations = [
        {
            "id": 1,
            "title": "Dev ops",
            "image": "Jenson-Delaney",
        },
        {
            "id": 2,
            "title": "Markering",
            "image": "Amaya-Coffey",
        },
        {
            "id": 3,
            "title": "Linus B",
            "image": "Habib-Joyce",
        },
        {
            "id": 4,
            "title": "Johan J",
            "image": "Lilly-Ann-Roche",
        },
    ]

    const MyItemRender = (props) => {
        let item = props.dataItem;

        return (
            <div className="row p-2 border-bottom align-middle" style={{ margin: 0 }}>
                <div className="col-2">
                    <Avatar shape="circle" type="image">
                        <img
                            src={`https://gist.github.com/simonssspirit/0db46d4292ea8e335eb18544718e2624/raw/2a595679acdb061105c80bd5eeeef58bb90aa5af/${item.image}-round-40x40.png`}
                        />
                    </Avatar>
                </div>
                <div className="col-10">
                    <NavLink to={"/conversation/" + item.id} activeClassName="selected">{item.title}</NavLink>
                </div>
            </div>
        );

    }

    return (
        <div>

            <ListView
                data={conversations}
                item={MyItemRender}
                style={{
                    width: "300px"
                }}
            />


        </div>
    )
}

export default Sidebar;