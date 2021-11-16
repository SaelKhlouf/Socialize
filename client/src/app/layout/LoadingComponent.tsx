import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
    content: string;
    inverted: boolean;
    active: boolean;
}

export default function LoadingComponent({active, content, inverted}: Props) {
    return (
        <Dimmer inverted={inverted} active={active}>
            <Loader content={content}></Loader>
        </Dimmer>
    )
}