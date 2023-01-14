export const getPaymentRef=async(userId, eventId)=>{
    const completeData = userId + eventId;
    const encondedText = new TextEncoder().encode(completeData);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}