export async function handleDownload(scriptName: string): Promise<number> {
    try {
        const response = await fetch('/api/incrementDownload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ scriptName })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.newCount;
    } catch (error) {
        console.error('Error incrementing download count:', error);
        throw error;
    }
}