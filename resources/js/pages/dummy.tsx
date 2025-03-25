import { useEffect, useState } from 'react';

type FetchResponse = any;

type FetchMakruzzApiProps = {
    endpoint: string;
    params?: Record<string, any>;
};

const fetchMakruzzApi = async ({ endpoint, params }: FetchMakruzzApiProps): Promise<FetchResponse> => {
    const baseUrl = process.env.APP_MAKRUZZ_API_URL || 'https://uat.makruzz.com/booking_api';
    const token = process.env.APP_MAKRUZZ_API_TOKEN || 'token';
    const status = process.env.APP_MAKRUZZ_API_STATUS || 'true';

    if (status.toLowerCase() !== 'true') {
        throw new Error('API is disabled');
    }

    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const queryParams = params ? `?${new URLSearchParams(params).toString()}` : '';
    const url = `${baseUrl}/${endpoint}${queryParams}`;

    console.log('Fetching from:', url);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers,
            redirect: 'follow', // Allow safe redirects
        });

        console.log('Response Status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        return data;
    } catch (error) {
        console.error('Fetch Error:', error);
        return { error: error.message };
    }
};

const ApiComponent = () => {
    const [data, setData] = useState<FetchResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchMakruzzApi({ endpoint: 'some_endpoint', params: { param1: 'value1' } })
            .then((response) => {
                console.log('Fetched Data:', response);
                setData(response);
            })
            .catch((error) => console.error('API Fetch Error:', error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h2>Makruzz API Data</h2>
            {loading ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};

export default ApiComponent;
