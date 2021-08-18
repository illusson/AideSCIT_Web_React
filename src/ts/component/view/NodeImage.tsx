import {ComposeComponent} from "../../core/ComposeComponent";

export interface NodeImageProp {
    src: string
}

class NodeImage extends ComposeComponent<NodeImageProp> {
    render() {
        return (<img src={this.props.src} alt={this.props.src} />);
    }
}

export default NodeImage