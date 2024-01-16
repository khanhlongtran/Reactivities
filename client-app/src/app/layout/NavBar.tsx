import React from "react"
import { Button, Container, Menu } from "semantic-ui-react"

interface Props {
    openForm: () => void;
    // Create so no need id
}

export default function NavBar({ openForm }: Props) {
    return (
        <Menu inverted fixed="top" style={{ backgroundImage: "linear-gradient(135deg, rgb(24, 42, 115) 0%, rgb(33, 138, 174) 69%, rgb(32, 167, 172) 89%)" }}>
            <Container >
                <Menu.Item header>
                    <img src="https://brademar.com/wp-content/uploads/2022/09/FPT-Logo-PNG.png" alt="logo"
                        style={{ marginRight: '10px' }}></img>
                    Reactivities
                </Menu.Item>

                <Menu.Item name="Activities">
                </Menu.Item>

                <Menu.Item>
                    <Button onClick={openForm} positive content='Create activity'>
                    </Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}