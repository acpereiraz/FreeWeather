export const FormatHour = (dateString = null) => {
    const now = dateString ? new Date(dateString) : new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return (hours + ':' + minutes);
}