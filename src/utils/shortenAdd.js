
export default function shortenAdd(address){
    if(address.length===0)
        return "-";
    return address.slice(0,5)+"..."+address.slice(-5);
}