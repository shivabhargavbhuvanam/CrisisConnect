import serverUrl from ".";
import { Guide } from "../models/Guides";

const path = 'guides'

export const createGuide = async (guideData: Guide, image?: File) => {
    const formData = new FormData();
    formData.append('title', guideData.title);
    formData.append('content', guideData.content);

    // Optionally append an image if provided
    if (image) {
        formData.append('guide_files', image);
    }

    try {
        const response = await fetch(`${serverUrl}/${path}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Could not create guide');
        }

        return await response.json();
    } catch (error: any) {
        throw new Error('Failed to submit guide: ' + error.message);
    }
}