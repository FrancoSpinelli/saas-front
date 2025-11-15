import { useEffect, useState } from "react";
import { ResponseData } from "../api/http";

export const useFetch = <T>(callback: () => Promise<ResponseData<T>>) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		let mounted = true;

		callback()
			.then((res) => mounted && setData(res.data))
			.catch((err) => mounted && setError(err))
			.finally(() => mounted && setLoading(false));

		return () => {
			mounted = false;
		};
	}, []);

	return { data, loading, error };
};
