import { Box, Typography } from "@mui/material";

interface SubtitleProps {
    children: string;
    mt?: number;
    mb?: number;
    align?: "left" | "center" | "right";
}

export default function Subtitle({ children, mt = 4, mb = 2, align = "left" }: SubtitleProps) {
    return (
        <Box mt={mt} mb={mb}>
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    letterSpacing: 0.4,
                    textAlign: align,
                    display: "inline-block",
                    position: "relative",
                    paddingBottom: "4px",
                }}
            >
                {children}
                <Box
                    component="span"
                    sx={{
                        content: '""',
                        display: "block",
                        height: "3px",
                        width: "100%",
                        backgroundColor: "primary.main",
                        borderRadius: "3px",
                        mt: "6px",
                    }}
                />
            </Typography>
        </Box>
    );
}