import { ArrowRight } from "@mui/icons-material";
import {
    Box,
    Link,
    List,
    ListItem,
    ListItemIcon,
    Typography,
    useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import { Container } from "@mui/material";
import React from "react";

const Contacts: React.FC = (props) => {
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
        </Container>
    );
};

export default Contacts;
