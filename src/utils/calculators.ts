export function calculateNextDateToPay(date: Date): Date {
	const result = new Date(date);
	result.setDate(result.getDate() - 5);
	return result;
}
