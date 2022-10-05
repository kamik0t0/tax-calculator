import { Button, Container, Fab } from "@mui/material";
import React, { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
/* TODO: правильно типизировать пропсы-функции */
const LastRow: FC<{ createItem: () => void; deleteItem: () => void }> =
    React.memo(({ createItem, deleteItem }) => {
        return (
            <Container
                component="div"
                sx={{
                    "& > :not(style)": { m: 1 },
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Fab
                    onClick={createItem}
                    color="secondary"
                    aria-label="add"
                    size="small"
                >
                    <AddIcon />
                </Fab>
                <Button
                    onClick={deleteItem}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    id="lastRow"
                >
                    Удалить отмеченные
                </Button>
            </Container>
        );
    });

export default LastRow;
