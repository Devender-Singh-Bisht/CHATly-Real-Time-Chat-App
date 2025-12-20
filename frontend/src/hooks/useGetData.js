import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast"


export default function useGetData(url, options = {}, wantToast = false, dependencies = []) {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const controllerRef = useRef(null);
    
    const fetchData = async () => {
        if (!url) return;

        controllerRef.current?.abort();
        controllerRef.current = new AbortController();

        try {
            let toastId;
            if (wantToast) {
                toastId = toast.loading("Fetching data...")
            }

            setLoading(true);
            setError(null);

            const res = await fetch(url, { ...options, credentials: "include", signal: controllerRef.current.signal});
            const data = await res.json();

            if (!res.ok) throw new Error(data.message);
            setData(data);

            if (wantToast) {
                toast.success("Fetched Succesfully.", {id: toastId})
            }
        } catch (error) {
            if (error.name === "AbortError") {
                if (wantToast) {
                    toast.dismiss(toastId);
                }
                return;
            };
            setError(error.message || "Something went wrong!");
            if (wantToast) {
                toast.error(error.message || "Request Failed");
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData();

        return () => controllerRef.current.abort();
    }, dependencies);

    return {data, error, isLoading}
}