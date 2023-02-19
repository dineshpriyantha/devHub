import React from "react";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";

export default function NavBar(){
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" />
                    Dev Hub
                </Menu.Item>
                <MenuItem name="Blogs" />
                <MenuItem>
                    <Button positive content='Create Blog' />
                </MenuItem>
            </Container>
        </Menu>
    )
}