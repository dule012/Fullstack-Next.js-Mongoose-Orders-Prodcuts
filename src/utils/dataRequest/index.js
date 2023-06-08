import useSWR from "swr";

const useRequest = (path) => {
  const url = `${process.env.NEXT_PUBLIC_API_ROOT}:${process.env.NEXT_PUBLIC_PORT}${path}`;

  const { data, error } = useSWR(url);

  return { data: data?.data, error };
};

export default useRequest;
