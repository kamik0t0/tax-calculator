import {
    Box,
    Link,
    List,
    ListItem,
    ListItemIcon,
    Typography,
    useTheme,
} from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";
import ArrowRight from "@mui/icons-material/ArrowRight";

const About: React.FC = () => {
    const theme = useTheme();
    const headersTextColor =
        theme.palette.mode === "dark" ? { color: "snow" } : { color: "black" };
    return (
        <Container sx={{ overflowY: "auto", height: "85vh" }}>
            <Typography variant="h5" sx={headersTextColor}>
                О проекте
            </Typography>
            <br />
            <Typography>
                Калькулятор налогов - это проект со следующими ключевыми целями:
                <Box>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <ArrowRight />
                            </ListItemIcon>
                            <Typography>
                                Создать стабильно работающий FrontEnd проект
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <ArrowRight />
                            </ListItemIcon>
                            <Typography>
                                Получить бесценный опыт разработки
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <ArrowRight />
                            </ListItemIcon>
                            <Typography>
                                Привлечь потенциального работодателя
                            </Typography>
                        </ListItem>
                    </List>
                </Box>
            </Typography>
            <Typography variant="h5" sx={headersTextColor}>
                Перечень технологий
            </Typography>
            <br />
            <Typography>
                <Box>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <ArrowRight />
                            </ListItemIcon>
                            <Typography>
                                Язык программирования TypeScript
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <ArrowRight />
                            </ListItemIcon>
                            <Typography>Библиотека React</Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <ArrowRight />
                            </ListItemIcon>
                            <Typography>
                                Менеджер состояний ReduxToolKit
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <ArrowRight />
                            </ListItemIcon>
                            <Typography>
                                Стилизованные компоненты библиотеки MaterialUI
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <ArrowRight />
                            </ListItemIcon>
                            <Typography>
                                Сборка и разработка на Webpack
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <ArrowRight />
                            </ListItemIcon>
                            <Typography>
                                Компилятор Babel для React TypeScript
                            </Typography>
                        </ListItem>
                    </List>
                </Box>
            </Typography>
            <br />
            <br />
            <Typography variant="h6" sx={headersTextColor}>
                <Link
                    href="https://www.youtube.com/watch?v=8fJiqIPaXyg&list=PLyYM246ZVUFtFdmyKmAsqMZ7HktzRSj8A"
                    color="primary"
                    target="_blank"
                >
                    YouTube-плейлист
                </Link>{" "}
                о разработке проекта
            </Typography>
        </Container>
    );
};

export default About;
