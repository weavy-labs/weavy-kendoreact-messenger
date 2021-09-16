import { Icon } from "@progress/kendo-react-common";


const mapIcon = (icon, size) => {
    switch (icon) {
        case "file-pdf":
            return <Icon name="pdf" size={size} themeColor={"error"} />;
        case "file-excel":
            return <Icon name="excel" size={size} themeColor={"success"} />;
        case "file-word":
            return <Icon name="word" size={size} themeColor={"primary"} />;
        case "file-powerpoint":
            return <Icon name="ppt" size={size} themeColor={"warning"} />;
        case "file-document":
            return <Icon name="file-txt" size={size} themeColor={"dark"} />;
        default:
            return <Icon name="file" size={size} themeColor={"dark"} />;
    }
}

export { mapIcon };