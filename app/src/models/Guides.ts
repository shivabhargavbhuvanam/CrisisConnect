export interface Guide {
    id?: string;
    title: string;
    content: string;
    image?: string;
    updatedAt?: Date;
    createdAt?: Date;
}

export interface GuideDetails extends Guide {
    relatedGuides?: string[]; // IDs of related guides
}