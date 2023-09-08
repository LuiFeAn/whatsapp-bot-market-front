

export default function convertToPhoneId(number){

    number = number.replace(/\D/g, '');

    return {
        withId: `55${number}@c.us`,
        normal: number
    }

}