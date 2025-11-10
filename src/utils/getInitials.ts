export const getInitials = (text: string, n: number): string => {
	if (!text) return "";

	return text
		.trim()
		.split(/\s+/)
		.slice(0, n)
		.map((word) => word[0].toUpperCase())
		.join("");
};
