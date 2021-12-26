import { Icon, Card, Button, Image } from "semantic-ui-react";

export default function PhotosPane(){
    return (
        <Card.Group itemsPerRow={4}>
            <Card>
                <Image src='/assets/logo.png' />
                <Button.Group  widths={2} >
                    <Button basic color='green' disabled={true}>
                        Main
                    </Button>
                    <Button basic color='red'>
                        <Icon name='trash' />
                    </Button>
                </Button.Group>
            </Card>
        </Card.Group>
    );
}