export const formattedDate = date => {
    const dateFormat: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        year: "numeric",
        month: "long",
    };

    return new Intl.DateTimeFormat("es", dateFormat).format(new Date(date));
};
