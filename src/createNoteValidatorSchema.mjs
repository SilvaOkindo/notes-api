export const createNoteValidatorSchema = {
    title: {
        isLength: {
            options: {min: 5, max: 50},
            errorMessage: "Title must be between at least 5 with a maximum of 50 characters"
        },
        notEmpty: {
            errorMessage: "Title cannot be empty"
        },
        isString: {
            errorMessage: "Title must be a string"
        }
    },

    content: {
        isLength: {
            options: {min: 5},
            errorMessage: "content must be between at least 5"
        },
        notEmpty: {
            errorMessage: "content cannot be empty"
        },
        isString: {
            errorMessage: "content must be a string"
        }
    },

}