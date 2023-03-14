import {
    List,
    ListItem,
    ListItemIcon,
    Typography,
    useTheme,
    Link,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Container } from "@mui/material";
import React from "react";

export const Contacts: React.FC = (props) => {
    const theme = useTheme();
    const headersTextColor =
        theme.palette.mode === "dark" ? { color: "snow" } : { color: "black" };
    return (
        <Container sx={{ overflowY: "auto", height: "85vh" }}>
            <Typography variant="h5" sx={headersTextColor}>
                Контакты
            </Typography>
            <br />
            <List>
                <ListItem>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <Typography>Данила</Typography>
                </ListItem>
            </List>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <CakeIcon />
                    </ListItemIcon>
                    <Typography>13.05.1986</Typography>
                </ListItem>
            </List>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <EmailIcon />
                    </ListItemIcon>
                    <Typography>Cap_NEMOx86@inbox.ru</Typography>
                </ListItem>
            </List>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <Typography>Россия, город Уфа</Typography>
                </ListItem>
            </List>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <FacebookIcon />
                    </ListItemIcon>

                    <Link
                        href="https://vk.com/id2858083"
                        color="primary"
                        target="_blank"
                    >
                        <Typography>Вконтакте</Typography>
                    </Link>
                </ListItem>
            </List>
        </Container>
    );
};
