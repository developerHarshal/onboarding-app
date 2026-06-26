import * as yup from 'yup';

export const FavouriteSongsSchema = yup.object({
    favouriteSongs: yup
        .array()
        .of(yup.string())
        .min(1, 'At least one file is required')
        .required('Favourite songs are required'),
});