import * as yup from 'yup';

export const PaymentSchema = yup.object({
    cardNumber: yup.string().required('Card number is required').min(16, 'Card number must be 16 digits').test('is-valid-card-number', 'Card number must be 16 digits', (value: string) => {
        return /^[0-9]{16}$/.test(value);
    }),
    expiryDate: yup.string().required('Expiry date is required').min(5, 'Expiry date must be in the format MM/YY').max(5, 'Expiry date must be in the format MM/YY').test('is-valid-date', 'Expiry date outof range', (value: string) => {
        const [month, year] = value.split('/');
        const updatedYear = parseInt(year) + 2000;
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        return (parseInt(month) <=12 && updatedYear <= currentYear+2) && (updatedYear == currentYear ? parseInt(month) >= currentMonth : true);
    }),
    cvv: yup.string().required('CVV is required').min(3, 'CVV must be 3 digits').max(3, 'CVV must be 3 digits').test('is-valid-cvv', 'CVV must be 3 digits', (value: string) => {
        return /^[0-9]{3}$/.test(value);
    }),
});