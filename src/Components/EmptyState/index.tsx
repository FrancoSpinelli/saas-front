import { Box, Typography, Button, Stack } from "@mui/material";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";

interface EmptyStateProps {
    message: string;
    buttonLabel?: string;
    buttonHref?: string;
    icon?: React.ReactNode;
}

export default function EmptyState({
    message,
    buttonLabel,
    buttonHref,
    icon,
}: EmptyStateProps) {
    return (
        <Box
            sx={{
                textAlign: "center",
                p: 4,
                borderRadius: 3,
                border: "1px dashed",
                borderColor: "divider",
            }}
        >
            <Stack spacing={2} alignItems="center">
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        backgroundColor: "background.paper",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {icon || <InboxRoundedIcon color="action" fontSize="large" />}
                </Box>

                <Typography color="text.secondary" variant="body1">
                    {message}
                </Typography>

                {buttonLabel && buttonHref && (
                    <Button
                        variant="contained"
                        sx={{ mt: 1, borderRadius: 2 }}
                        onClick={() => (window.location.href = buttonHref)}
                    >
                        {buttonLabel}
                    </Button>
                )}
            </Stack>
        </Box>
    );
}