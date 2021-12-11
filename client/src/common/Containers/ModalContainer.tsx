import { useDispatch, useSelector } from "react-redux";
import { Header, Modal } from "semantic-ui-react";
import { RootState } from "../../app/redux/rootReducer";
import { AppDispatch } from "../../app/redux/store";
import { setModalInfoReducer } from "../reducer";

interface Props {
    content: JSX.Element;
    title?: string;
}

export default function ModalContainer({content, title}: Props) {
    const dispatch = useDispatch<AppDispatch>();
    let {showModal} = useSelector((state: RootState) => state.common.modalInfo);

    return (
        <Modal open={showModal} onClose={() => dispatch(setModalInfoReducer({
            showModal: false
        }))} 
        dimmer='blurring' 
        size='mini'>
            {
                title &&
                (<Modal.Header>
                        <Header as='h2' color='teal' style={{textAlign: 'center', color: 'teal'}}>
                            {title}
                        </Header>
                </Modal.Header>)
            }

            <Modal.Content>
                {content}
            </Modal.Content>
        </Modal>
    );
}