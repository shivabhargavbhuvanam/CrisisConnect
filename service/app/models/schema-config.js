export default {
    // Disables the "__v" field that Mongoose uses to track document version.
    versionKey: false,
    // Ensures that each document has an 'id' virtual getter by default,
    id: true,
    // Options for when documents are converted to JSON
    toJSON: {
        // A function to transform the resulting document before it's returned as JSON.
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
}